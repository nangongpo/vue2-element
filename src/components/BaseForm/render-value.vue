<script>
import { renderError, numberToPx } from '@/utils'
import { getFormItemValue, getComponentAttrs } from './utils'

export default {
  functional: true,
  props: {
    config: Object,
    item: Object,
    parent: Object
  },
  renderError,
  render(h, context) {
    const { config = {}, item = {}, parent = {}} = context.props
    const { labelAsPlaceholder, model, valueWidth } = parent.props
    const { render, label, value_width = valueWidth, prop, placeholder, editable } = config
    // 表单元素的宽度
    const width = numberToPx(value_width)
    const { value, options } = getFormItemValue(config, model, parent)

    // 无render，需要转义
    if (!render) {
      return [value]
    }

    const newPlaceholder = placeholder || (labelAsPlaceholder ? label : placeholder)

    const elementAttrs = {
      config,
      prop,
      value,
      attrs: getComponentAttrs({
        style: { width },
        ...item,
        options,
        placeholder: newPlaceholder,
        disabled: !editable
      })
    }

    const scopedSlots = parent.scopedSlots
    if (typeof (render) === 'function') {
      scopedSlots[render] = (attrs) => render(h, attrs)
    }
    if (!scopedSlots[render]) {
      return renderError(h, { stack: `${render} slot is undefined` })
    }

    return scopedSlots[render](elementAttrs)
  }
}
</script>
