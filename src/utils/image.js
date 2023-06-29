import Compressor from 'compressorjs'

// https://www.npmjs.com/package/compressorjs
/**
 * 图片压缩
 * @param {File} file
 * @param {String} type image/jpeg, image/png
 * @return {File}
 */
export function imageCompress(file, type) {
  return new Promise((resolve, reject) => {
    // 文件大小超过10M, 无法压缩
    if (file.size > 10 * 1024 * 1024) {
      return reject(new Error('file size greater than 10M, compress fail'))
    }

    new Compressor(file, {
      strict: true,
      checkOrientation: true,
      quality: 0.8,
      maxWidth: 1080,
      maxHeight: 1920,
      mimeType: type || file.type || 'image/jpeg',
      success: (newFile) => {
        // blob转file
        if (newFile instanceof Blob) {
          return resolve(new File([newFile], file.name, { type: newFile.type }))
        }
        resolve(newFile)
      },
      error: reject
    })
  })
}

/**
 * 文件转base64
 * @param {File} file
 * @param {Boolean} hasHeader 是否去除base64头, 默认true
 * @return {String}
 */
export function fileToBase64(file, hasHeader = true) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = reader.onerror = reject
    reader.onloadend = (e) => {
      let result = e.target.result
      if (!hasHeader) {
        result = result.split(',')[1]
      }
      resolve(result)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * base64转文件
 * @param {File} base64
 * @return {File}
 */
export function base64ToFile(base64, filename) {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

/**
 * base64Str to Blob
 * @param {string} dataURI
 * @param {string} filename
 * @returns {Blob}
 */
export function dataURItoBlob(dataURI, filename = 'file') {
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0] // mime类型
  var byteString = atob(dataURI.split(',')[1]) // base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer) // 创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }
  return new Blob([intArray], { type: mimeString })
}

/**
 * 文件链接转File
 * @param {string} url
 * @returns {File}
 */
export function getFileFromUrl(url, filename) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      const { type } = xhr.response
      const file = new File([xhr.response], filename, { type })
      resolve(file)
    }
    xhr.onerror = reject
    // 发送
    xhr.send()
  })
}

// 图片完整地址拼接
export const getImageUrl = (str) => {
  if (process.env.NODE_ENV === 'production') {
    return str ? document.location.protocol + '//' + document.location.host + process.env.VUE_APP_BASE_API + str : ''
  } else {
    return str ? document.location.protocol + '//' + document.location.host + process.env.VUE_APP_BASE_API + str : ''
  }
}
