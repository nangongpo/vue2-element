import { isValidValue } from '@/utils'

export function getLabelByOptions(prop, value, options) {
  // 转义列表
  const defaultValue = '-'
  if (!prop) return
  if (!Array.isArray(options)) return isValidValue(value) ? value : defaultValue
  const getLabel = (arr, value) => {
    if (!Array.isArray(value)) {
      return arr.reduce((t, v) => {
        const hasValue = v.value === value
        if (hasValue) {
          return v.label
        }
        if (Array.isArray(v.children) && !!v.children.length) {
          return getLabel(v.children, value) || t
        }
        return t
      }, value)
    } else {
      return value.reduce((t, v) => {
        const val = arr.find(item => item.value === v)
        return val ? [...t, val.label] : t
      }, []).join(',')
    }
  }
  const newValue = getLabel(options, value)
  return isValidValue(newValue) ? newValue : defaultValue
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

// 获取虚拟节点中的文本
export function getTextNode(vNode = {}) {
  const hasText = (arr) => arr.find(v => Boolean(v.text))
  const { text, children } = vNode
  if (text) return text
  const newText = hasText(children)
  if (newText) {
    return getTextNode(newText)
  }
}

// 获取表格参数配置列表 [{ name: '我的', // 表示字段名 state: true, // 表示选择状态 disabled: true // 表示是否禁用 }]
export function getTableFieldData(h, fields = []) {
  const newFields = fields.map(item => {
    const { prop, label, display, editable } = item
    let newLabel = label
    // label为函数式，解析里面的文本
    if (typeof (label) === 'function') {
      const vNode = label(h, {})
      newLabel = getTextNode(vNode)
    }
    return { prop, name: newLabel, state: display, disabled: !editable }
  })
  return newFields
}

// 根据指定字段提取表格数据中的字段列表
export function getTableFieldByTableData(tableData = [], config = {}) {
  const { prop, label } = config
  return tableData.reduce((t, v) => {
    return v[prop] ? [...t, { prop, name: typeof (label) === 'function' ? label(v) : (v[label] || v[prop]), state: true, disabled: false, config: v }] : t
  }, [])
}
// 根据指定字段处理导出的数据
export function excel_data_format(tableFields = [], tableData = [], allOptions, checkedField = []) {
  let fieldMap = tableFields
  if (checkedField.length) {
    fieldMap = checkedField.map((item) => {
      return tableFields.find((obj) => obj.prop === item)
    })
  } else {
    fieldMap = tableFields.reduce((t, v) => v.prop !== 'index' ? [...t, v] : t, [])
  }
  const data = tableData.reduce((t, v) => {
    const row = fieldMap.reduce((oldVal, config) => {
      const { prop, formatValue, formatOptions } = config
      const options = formatOptions ? formatOptions(allOptions) : allOptions[prop]
      const value = formatValue
        ? formatValue(config, v, allOptions)
        : getLabelByOptions(prop, v[prop], options)
      return [...oldVal, value]
    }, [])
    return [...t, row]
  }, [])
  const header = fieldMap.reduce((t, v) => [...t, v.label], [])
  return { data: data, header: header }
}
