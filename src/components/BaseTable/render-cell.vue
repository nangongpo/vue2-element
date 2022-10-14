<script>
import { renderError, isValidValue } from '@/utils'
import { getLabelByOptions, getComponentAttrs } from './utils'

export default {
  functional: true,
  props: {
    scope: Object,
    config: Object,
    item: Object,
    parent: Object
  },
  renderError,
  render(h, context) {
    const { scope = {}, config = {}, item = {}, parent = {}} = context.props
    const { allOptions } = parent.props
    const { render, prop, formatValue, editable, vprop, formatOptions } = config
    const valueList = vprop.split('.')
    let value = valueList.reduce((t, v) => t && isValidValue(t[v]) ? t[v] : undefined, scope.row)
    scope['value'] = value
    scope['cellProp'] = prop
    scope['cellRender'] = render
    scope['cellAttrs'] = getComponentAttrs({ ...item, disabled: !editable })
    scope['cellConfig'] = config
    scope['setValue'] = (newValue) => {
      scope.row[prop] = newValue
    }
    const options = formatOptions ? formatOptions(allOptions) : allOptions[prop]
    // 有转义函数
    value = formatValue
      ? formatValue(config, scope.row, allOptions)
      : getLabelByOptions(prop, value, options)
    scope['cellValue'] = value

    if (typeof (render) === 'function') {
      return render(h, scope)
    }

    return [value]
  }
}
</script>
