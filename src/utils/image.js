/**
 * 图片压缩
 * @param {*} img
 * @param {*} opts { quality: '图片质量0-1', format: 'base64、file、blob' }
 */

import Compressor from 'compressorjs'
export function imageCompress(file, opts = {}) {
  /**
   * 将图片进行压缩
   */
  // const file = formatBase64(img, opts.format)
  const compress = new Compressor(file, { quality: 0.6, ...opts })
  return compress.result
  // return formatBase64(ndata, opts.format)
}

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

// 图片完整地址拼接
export const getImageUrl = (str) => {
  if (process.env.NODE_ENV === 'production') {
    return str ? document.location.protocol + '//' + document.location.host + process.env.VUE_APP_BASE_API + str : ''
  } else {
    return str ? document.location.protocol + '//' + document.location.host + process.env.VUE_APP_BASE_API + str : ''
  }
}
