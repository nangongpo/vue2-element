<script>
/* eslint-disable no-unused-vars */
import {
  getLabelByOptions,
  getComponentAttrs,
  renderError
} from './utils'

export default {
  functional: true,
  props: {
    scope: Object,
    config: Object,
    item: Object,
    parent: Object
  },
  render(h, context) {
    const { scope = {}, config = {}, item = {}, parent = {}} = context.props
    const { allOptions } = parent.props
    const { render, prop, formatValue, editable } = config

    let value = scope.row[prop]
    scope['value'] = value
    scope['cellProp'] = prop
    scope['cellRender'] = render
    scope['cellAttrs'] = getComponentAttrs({ ...item, disabled: !editable })
    scope['cellConfig'] = config
    scope['setValue'] = (newValue) => {
      scope.row[prop] = newValue
    }
    // 有转义函数
    value = formatValue
      ? formatValue(config, scope.row, allOptions)
      : getLabelByOptions(prop, value, allOptions)
    scope['cellValue'] = value

    if (typeof (render) === 'function') {
      return render(h, scope)
    }

    return [value]
  },
  renderError
}
</script>
