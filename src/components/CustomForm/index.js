import './form.scss'
import Component from './component'
import formProps, { getFormProps } from './props'

export default {
  functional: true,
  props: {
    ...formProps,
    labelAsPlaceholder: Boolean,
    valueWidth: String,
    content: {
      type: Array,
      default() {
        return []
      }
    },
    layout: { // el-row参数
      type: Object,
      default() {
        return {}
      }
    },
    wrapperCol: { // el-col参数
      type: Object,
      default() {
        return {}
      }
    },
    formId: {
      type: [String, Number],
      default: 'el-form-' + new Date().getTime()
    }
  },
  render(h, context) {
    const { data, props } = context

    const { content, layout, formId, labelAsPlaceholder } = props
    const formProps = getFormProps(props)

    return <el-form
      {...data}
      props={formProps}
      data-key={formId}
      class={{ 'custom-form': true }}>
      <el-row props={layout} class='el-form-item-row'>
        {
          content.map((item, index) => {
            const { label, labelWidth, valueWidth, wrapperCol = {}, isBlock, ...formItemProps } = item
            const _labelWidth = labelWidth || props.labelWidth
            const _valueWidth = valueWidth || props.valueWidth || '100%'

            const colProps = { ...props.wrapperCol, ...wrapperCol }
            const hasColProps = Object.keys(colProps).length > 0
            let labelSlot = ''
            let labelText = label

            const formItemData = {
              props: { ...formItemProps, labelWidth: _labelWidth },
              class: { 'el-form-item-wrapper-col': hasColProps, 'is-block': isBlock },
              style: { width: hasColProps ? '100%' : '' },
              slotScopes: {}
            }

            if (typeof (label) === 'function') {
              labelSlot = <span slot='label' class='el-form-item-label'>
                {label(h, context)}
              </span>
              labelText = labelSlot.children[0] && labelSlot.children[0].children.reduce((t, v) => v.text ? [...t, v.text.replace('\n', '')] : t, []).join('')
            } else {
              formItemData.props['label'] = label
            }

            const componentData = {
              class: { 'is-block': isBlock },
              style: { width: isBlock && !valueWidth ? '100%' : _valueWidth },
              attrs: {
                placeholder: item.placeholder || (labelAsPlaceholder ? (labelText || labelSlot) : '')
              },
              props: {
                item,
                index,
                parentContext: context
              }
            }

            if (hasColProps) {
              const colData = { props: colProps, class: 'el-form-item-col' }

              return <el-col {...colData} key={index}>
                <el-form-item {...formItemData}>
                  { labelSlot }
                  <Component {...componentData} />
                </el-form-item>
              </el-col>
            }
            return <el-form-item {...formItemData}>
              { labelSlot }
              <Component {...componentData} key={index} />
            </el-form-item>
          })
        }
      </el-row>
    </el-form>
  }
}
