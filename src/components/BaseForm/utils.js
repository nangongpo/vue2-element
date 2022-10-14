import { isValidValue, deepClone } from '@/utils'

export function getLabelByOptions(prop, value, options = []) {
  const defaultValue = '-'
  if (!prop) return
  // 转义列表
  if (!Array.isArray(options)) return value || defaultValue

  const getLabel = (arr, value) => {
    return arr.reduce((t, v) => {
      const hasValue = v.value === value
      if (hasValue) {
        return v.label
      }
      if (Array.isArray(v.children) && !!v.children.length) {
        return getLabel(v.children, value) || t
      }
      return t
    }, '')
  }

  return getLabel(options, value) || value || defaultValue
}

// 获取组件基础属性
export function getComponentAttrs(obj) {
  // 排除下划线命名的字段
  const isIgnoreAttrs = (key) => {
    return key.indexOf('_') > -1 || ['label', 'render', 'formatValue', 'formatOptions'].includes(key)
  }
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    const isValidAttr = value !== null && !isIgnoreAttrs(key, value)
    return isValidAttr ? { ...acc, [key]: value } : acc
  }, {})
}

export function filterObjectNullValue(obj) {
  return Object.keys(obj).reduce((t, v) => {
    return obj[v] !== null ? { ...t, [v]: obj[v] } : t
  }, {})
}

// 数字转px
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

// prop_width = 0 不设置宽度、prop_width = 1 独占一行
export function getFormItemWidth(item, model) {
  const { render, prop, prop_width = 0, disabled } = item
  let itemWidth

  switch (prop_width) {
    case 0:
      if (render === 'image') {
        const value = model[prop]
        let imageNum = Array.isArray(value) ? value.length : value && value.indexOf(',') > -1 ? value.split(',').length : 1
        imageNum = disabled ? imageNum : imageNum + 1
        const imageWidth = 148
        itemWidth = `${(imageNum * imageWidth) + (imageNum - 1) * 10}px`
      }
      break
    case 1:
      itemWidth = '100%'
      break
    default:
      if (prop_width > 0 && prop_width < 1) {
        itemWidth = `${prop_width * 100}%`
      } else {
        itemWidth = `${prop_width}px`
      }
  }
  return itemWidth
}

// 初始化el-form的model
export function getDefaultModel(fields = [], model = {}) {
  const defaultModel = deepClone(model)
  const mapPropType = {
    string: '',
    array: []
  }
  const getDefaultValue = (item, model) => {
    const value = model[item.prop]
    if (isValidValue(value)) {
      return item.formatValue ? item.formatValue(item, model) : value
    }
    return mapPropType[item.prop_type]
  }
  fields.map(item => {
    if (Object.prototype.hasOwnProperty.call(item, 'prop_type')) {
      defaultModel[item.prop] = getDefaultValue(item, model)
    }
  })
  return defaultModel
}

// 单独构造表单el-form的rules
export function getDefaultRules(fields, rules = {}) {
  const defaultRules = {}
  fields.map(v => {
    const { prop, label, display, prop_type, required, placeholder } = v
    if (display && required) {
      const requiredRule = {
        type: prop_type,
        required,
        message: placeholder || `请填写${label}`
      }
      defaultRules[prop] = rules[prop] ? [requiredRule, rules[prop]] : [requiredRule]
    }
  })
  return defaultRules
}

/**
 * 格式化提交的参数, 通过读取配置项中的is_submit字段和检查有效值，过滤表单
 * @param {*} fields 表单字段
 * @param {*} model 表单对象
 * @param {*} otherModel 扩充表单对象
 * @returns
 */
export function getSubmitFields(fields = [], model = {}, otherModel = {}) {
  const submitForm = deepClone(model)
  const getSubmitValue = (item, model) => {
    const value = model[item.prop]
    if (isValidValue(value)) {
      return item.formatValue ? item.formatValue(item, model) : value
    }
  }
  fields.map(item => {
    if (item.prop) {
      if (Object.prototype.hasOwnProperty.call(item, 'is_submit')) {
        submitForm[item.prop] = item.is_submit ? getSubmitValue(item, model) : undefined
      } else {
        submitForm[item.prop] = getSubmitValue(item, model)
      }
    }
  })

  return { ...submitForm, ...otherModel }
}
