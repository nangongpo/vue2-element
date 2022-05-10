<script>
/* eslint-disable no-unused-vars */
import {
  getComponentAttrs,
  getLabelByOptions,
  numberToPx,
  renderError
} from './utils'

export default {
  functional: true,
  props: {
    config: Object,
    item: Object,
    parent: Object
  },
  render(h, context) {
    const { config = {}, item = {}, parent = {}} = context.props
    const { labelAsPlaceholder, allOptions, model, valueWidth, filterOptionBy } = parent.props
    const { render, label, value_width, prop, placeholder, editable, formatValue, formatOptions } = config
    // 表单元素的宽度
    const width = numberToPx(value_width || valueWidth)
    let options = formatOptions ? formatOptions(allOptions) : allOptions[prop]
    // 过滤选项无效值
    if (Array.isArray(options) && filterOptionBy) {
      options = options.filter(v => Object.prototype.hasOwnProperty.call(v, filterOptionBy) ? v[filterOptionBy] : true)
    }
    // console.log('render-value', prop, allOptions, allOptions[prop])
    let value = model[prop]

    // 有转义函数
    if (formatValue) {
      value = formatValue(config, model, options)
    }

    // 无render，需要转义
    if (!render) {
      return [getLabelByOptions(prop, value, options)]
    }

    const newPlaceholder = placeholder || (labelAsPlaceholder ? label : placeholder)

    const elementAttrs = {
      config,
      prop,
      value,
      options: options,
      attrs: getComponentAttrs({ ...item, placeholder: newPlaceholder, disabled: !editable, style: { width }}),
      setValue: (newValue) => {
        const { listeners } = parent
        if (!listeners['update:model']) {
          return renderError(h, { stack: `:model.sync="model"` })
        }
        model[prop] = newValue
        listeners['update:model'](model)
      }
    }

    const scopedSlots = parent.scopedSlots
    if (typeof (render) === 'function') {
      scopedSlots[render] = (attrs) => render(h, attrs)
    }
    if (!scopedSlots[render]) {
      return renderError(h, { stack: `${render} slot is undefined` })
    }

    return scopedSlots[render](elementAttrs)
  },
  renderError
}
</script>
