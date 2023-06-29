<script>
/* eslint-disable no-unused-vars */
import RenderLabel from './render-label.vue'
import RenderValue from './render-value.vue'
import { renderError, isValidValue, numberToPx, getTextNode } from '@/utils'

import { getFormItemWidth, getFormItemValue } from './utils'

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
    propWidth: String,
    propOverflow: Boolean, // 没render时溢出省略号
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
    },
    defaultValue: {
      type: String,
      default: '—'
    }
  },
  data() {
    return {
      newRules: {}
    }
  },
  renderError,
  render(h, context) {
    const { props, data, scopedSlots } = context
    const { fields, model, rules, patterns, labelWidth, propWidth, labelSuffix, valueWidth } = props
    const newRules = {}

    const getContent = fields.reduce((acc, item) => {
      const { render, label, label_class, prop = '', prop_height, prop_class, prop_type, prop_overflow = false, label_width = labelWidth, value_width = valueWidth, value_height, display = true, null_value_display = true, required = false, placeholder, other_attrs = {}, ...restItem } = item
      // 显示的表单项
      const isDisplay = null_value_display ? display : isValidValue(model[prop])
      // 不显示表单项跳过
      if (!isDisplay) {
        return acc
      }
      // prop为空时，清空labelSuffix
      const newLabelSuffix = prop ? labelSuffix : ''
      const formItemWidth = getFormItemWidth(item, model, propWidth)

      // render为空时
      if (!render) {
        const elementInfo = getFormItemValue(item, model, context)
        return [
          ...acc,
          <div
            class={['el-form-item', 'el-form-item--mini', prop_class]}
            style={{ width: `${formItemWidth}`, height: numberToPx(prop_height) }}>
            {
              label && <label class='el-form-item__label' style={{ width: numberToPx(label_width) }}>
                <RenderLabel label={label} labelClass={label_class} label-suffix={newLabelSuffix} />
              </label>
            }
            {
              item.prop && <div class='el-form-item__content' style={{ width: numberToPx(value_width) }}>
                {
                  elementInfo.propOverflow
                    ? <el-tooltip effect='dark' content={String(elementInfo.value)} placement='top'>
                      <div class='text-overflow'>{ elementInfo.value }</div>
                    </el-tooltip>
                    : elementInfo.value
                }
              </div>
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
          message: placeholder || `${label}必填`,
          trigger: 'blur'
        }
        if (required) {
          newRules[prop] = patterns[prop] ? [requiredRule, patterns[prop]] : [requiredRule]
        } else {
          newRules[prop] = patterns[prop] ? [patterns[prop]] : undefined
        }
      }

      const tmpNodes = <el-form-item
        prop={prop}
        label-width={numberToPx(label_width)}
        attrs={other_attrs}
        class={prop_class}
        style={{ width: `${formItemWidth}`, height: numberToPx(prop_height) }}>
        <template slot='label'>
          <RenderLabel label={label} labelClass={label_class} label-suffix={newLabelSuffix} />
        </template>
        <template slot='default'>
          <RenderValue config={item} item={restItem} parent={context} />
        </template>
      </el-form-item>
      return [...acc, tmpNodes]
    }, [])

    return <el-form
      {...data}
      props={{ model, rules: newRules, labelSuffix, labelWidth }}
      attrs={{ valueWidth }}
      validate-on-rule-change={ false }
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
