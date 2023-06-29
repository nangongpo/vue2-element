/**
 * 检验数据类型
 * @param {*} data
 * @param {String} type
 * @returns {String|Boolean}
 */
export function checkType(data, type) {
  const _type = Object.prototype.toString.call(data).slice(1, -1).split(' ')[1].toLowerCase()
  if (type) {
    return _type === type.toLowerCase()
  }
  return _type
}

/**
 * 是外部链接?
 * @param {String} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 是JSON字符串?
 * @param {String} str
 * @returns {Boolean}
 */
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
}

/**
 * 首字母大写
 * @param {String} str
 * @returns {String}
 */
export function upperFirst(str) {
  if (!str) return ''
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/**
 * 中横线命名改驼峰命名
 * @param {String} str
 * @returns {String}
 */
export function camelCase(str) {
  if (!str) return ''
  const s = str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

/**
 * 根据 precision（精度） 向下舍入 number
 * @param {Number} number
 * @param {Number} [precision=0]
 * @returns {Number}
 */
export function floor(number, precision) {
  const func = Math.floor
  precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
  if (precision) {
    // Shift with exponential notation to avoid floating-point issues.
    // See [MDN](https://mdn.io/round#Examples) for more details.
    let pair = `${Number}e`.split('e')
    const value = func(`${pair[0]}e${+pair[1] + precision}`)

    pair = `${value}e`.split('e')
    return +`${pair[0]}e${+pair[1] - precision}`
  }
  return func(number)
}

// *.jsx使用
export function renderError(h, err) {
  return h('pre', { style: { color: 'red' }}, err.stack)
}

/**
 * 是否是有效值， 排除 null、undefined、[]、[undefined] 的情况
 * @param {*} value
 * @returns {Boolean}
 */
export function isValidValue(value) {
  if (['number', 'boolean'].includes(typeof (value))) {
    return true
  }
  if (Array.isArray(value)) {
    value = value.filter(v => isValidValue(v))
    return value.length > 0
  }
  return !!value
}

/**
 * 数字转px
 * @param {Number} num
 * @returns {String}
 */
export function numberToPx(num = 0) {
  if (typeof (num) !== 'number') return num
  let n
  switch (num) {
    case 0:
      n = undefined
      break
    case 1:
      n = '100%'
      break
    default:
      if (num > 0 && num < 1) {
        n = `${num * 100}%`
      } else {
        n = `${num}px`
      }
  }
  return n
}
/**
 * 通用转义方法
 * @param {*} value 转义值
 * @param {Array} options 转义列表
 * @param {String|Boolean} separator 拼接符, 为true时, 默认拼接逗号， 为false不拼接
 * @returns {String|Array}
 */
export function getLabelByOptions(value, options, separator = ',') {
  if (!isValidValue(value)) return
  if (!Array.isArray(options)) return value

  const values = Array.isArray(value) ? value : [value]
  const getLabel = (arr, value) => {
    return arr.reduce((t, v) => {
      if (values.includes(v.value)) {
        return [...t, v.label]
      }
      if (Array.isArray(v.children) && !!v.children.length) {
        return getLabel(v.children, value)
      }
      return t
    }, [])
  }
  const newValue = getLabel(options, values)
  if (separator) {
    return isValidValue(newValue) ? newValue.join(separator || ',') : values.join(separator || ',')
  }
  return isValidValue(newValue) ? newValue : values
}

/**
 * setTimeout倒计时, 时间间隔稳定，不会出现丢帧的现象
 * @param {Functuon} cb
 * @param {Number} second // 倒计时秒数 或 毫秒数(需要设置isMilliSecond = true), 后端返回10位的时间戳(其实就是秒数，直接传參就行)
 * @param {Object} options { immediate： 立即执行cb,  isMilliSecond: 是毫秒 }
 */
export function countDown(cb, second = 0, options = {}) {
  const { immediate = true, isMilliSecond = false } = options
  let s = isMilliSecond ? Math.floor(second / 1000) : second
  if (immediate) {
    cb && cb(s)
  }
  let timer = setTimeout(() => {
    if (s > 0) {
      s--
      cb && cb(s)
      countDown(cb, s, { immediate: false, isMilliSecond: false })
      return
    }
    clearTimeout(timer)
    timer = null
  }, 1000)
}

/**
 * @param {String} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {String} input value
 * @returns {Number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  if (!str) return 0
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 获取虚拟节点中的文本
 * @param {VNode} vNode
 * @returns {String}
 */
export function getTextNode(vNode = {}) {
  const hasText = (arr) => arr.find(v => Boolean(v.text))
  const { text, children } = vNode
  if (text) return text
  const newText = hasText(children)
  if (newText) {
    return getTextNode(newText)
  }
}

/**
 * 文本添加换行符
 * @param {string} value
 * @param {number} length
 */
export function textWrap(value, length) {
  let str = ''
  const valueLength = value.length
  var rowN = Math.ceil(valueLength / length) // 需要换行的行数
  if (rowN > 1) {
    for (let i = 0; i < rowN; i++) {
      let temp = ''
      const start = i * length
      const end = start + length
      temp = value.substring(start, end) + '\n'
      str += temp
    }
    return str
  } else {
    return value
  }
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @param {HTMLElement} element
 * @param {String} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.slice(0, nameIndex) +
      classString.slice(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {String} cls
 * @returns {Boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {String} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {String} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 旋转图片
 * @param {string} src
 * @param {number} edg 角度
 * @param {function} callback
 * @returns url
 */
export function rotateBase64Img(src, edg, callback) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  let imgW// 图片宽度
  let imgH// 图片高度
  let size// canvas初始大小

  if (edg % 90 !== 0) {
    console.error('旋转角度必须是90的倍数!')
    return
  }
  (edg < 0) && (edg = (edg % 360) + 360)
  const quadrant = (edg / 90) % 4 // 旋转象限
  const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 } // 裁剪坐标

  var image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = src

  image.onload = function() {
    imgW = image.width
    imgH = image.height
    size = imgW > imgH ? imgW : imgH

    canvas.width = size * 2
    canvas.height = size * 2
    switch (quadrant) {
      case 0:
        cutCoor.sx = size
        cutCoor.sy = size
        cutCoor.ex = size + imgW
        cutCoor.ey = size + imgH
        break
      case 1:
        cutCoor.sx = size - imgH
        cutCoor.sy = size
        cutCoor.ex = size
        cutCoor.ey = size + imgW
        break
      case 2:
        cutCoor.sx = size - imgW
        cutCoor.sy = size - imgH
        cutCoor.ex = size
        cutCoor.ey = size
        break
      case 3:
        cutCoor.sx = size
        cutCoor.sy = size - imgW
        cutCoor.ex = size + imgH
        cutCoor.ey = size + imgW
        break
    }

    ctx.translate(size, size)
    ctx.rotate(edg * Math.PI / 180)
    ctx.drawImage(image, 0, 0)

    var imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey)
    if (quadrant % 2 === 0) {
      canvas.width = imgW
      canvas.height = imgH
    } else {
      canvas.width = imgH
      canvas.height = imgW
    }
    ctx.putImageData(imgData, 0, 0)
    callback(canvas.toDataURL())
  }
}
