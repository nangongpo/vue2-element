<script>
/* eslint-disable no-unused-vars */
import RenderLabel from './render-label.vue'
import RenderValue from './render-value.vue'
import { renderError, isValidValue } from '@/utils'

import {
  numberToPx,
  getFormItemWidth,
  getDefaultModel,
  getDefaultRules,
  getSubmitFields
} from './utils'

export { getDefaultModel, getSubmitFields, getDefaultRules }

export default {
  functional: true,
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: { // 用于覆盖 patterns 的值
      type: Object,
      default() {
        return {}
      }
    },
    patterns: { // 正则表达式列表， 如：{ pattern: /[0-9]/g, message: '不合格' }
      type: Object,
      default() {
        return {}
      }
    },
    labelWidth: String,
    valueWidth: String,
    labelSuffix: String,
    labelAsPlaceholder: {
      type: Boolean,
      default: true
    },
    allOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    filterOptionBy: { // 过滤映射关系，保留有效值
      type: String,
      default: 'is_valid'
    }
  },
  renderError,
  render(h, context) {
    const { props, data, scopedSlots } = context
    const { fields, model, rules, patterns, labelWidth, labelSuffix } = props

    const newRules = {}
    // const newModel = fields.reduce((t, v) => model[v.prop] ? { ...t, [v.prop]: model[v.prop] } : { ...t }, {})
    const getContent = fields.reduce((acc, item, index) => {
      const { label, label_class, prop, prop_height, prop_class, prop_type, label_width, value_width, display = true, null_value_display = true, required = false, placeholder, other_attrs = {}, ...newItem } = item
      // 显示的表单项
      const isDisplay = null_value_display ? display : isValidValue(model[prop])
      // 不显示表单项跳过
      if (!isDisplay) {
        return acc
      }
      const formItemWidth = getFormItemWidth(item, model)
      // prop为空时，清空labelSuffix
      const newLabelSuffix = prop ? labelSuffix : ''
      // render无效时
      if (!item.render) {
        return [
          ...acc,
          <div
            class={['el-form-item', 'el-form-item--mini', prop_class]}
            style={{ width: `${formItemWidth}`, height: numberToPx(prop_height) }}>
            {
              label && <label class={['el-form-item__label', label_class]} style={{ width: numberToPx(label_width || labelWidth) }}>
                {label}{ newLabelSuffix }
              </label>
            }
            {
              model[item.prop] && <div class='el-form-item__content'>{ model[item.prop] }</div>
            }
          </div>
        ]
      }

      // 构造校验规则
      if (rules[prop]) {
        newRules[prop] = rules[prop]
      } else {
        const requiredRule = {
          type: prop_type,
          required,
          message: placeholder || `请填写${label}`
        }
        newRules[prop] = patterns[prop] ? [requiredRule, patterns[prop]] : [requiredRule]
      }
      const tmpNodes = <el-form-item
        prop={prop}
        label-width={numberToPx(label_width) || labelWidth}
        attrs={other_attrs}
        key={index}
        class={prop_class}
        style={{ width: `${formItemWidth}`, height: numberToPx(prop_height) }}>
        <template slot='label'>
          <RenderLabel label={label} labelClass={label_class} label-suffix={newLabelSuffix} />
        </template>
        <template slot='default'>
          <RenderValue config={item} item={newItem} parent={context} />
        </template>
      </el-form-item>
      return [...acc, tmpNodes]
    }, [])

    return <el-form
      {...data}
      props={{ model, rules: newRules }}
      validate-on-rule-change={false}
      class='base-form'>
      { scopedSlots.header && scopedSlots.header() }
      { getContent }
      {
        scopedSlots.footer && <el-form-item label-width='0'>
          { scopedSlots.footer() }
        </el-form-item>
      }
    </el-form>
  }
}
</script>
