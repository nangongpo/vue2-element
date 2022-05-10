<script>
/* eslint-disable no-unused-vars */
import { PlTable, PlTableColumn } from 'pl-table'
import RenderHeader from './render-header'
import RenderCell from './render-cell.vue'
import { numberToPx, getTableFieldData, getTableFieldByTableData } from './utils'
import './pl-table.css'

export { getTableFieldData, getTableFieldByTableData }

// 暂存配置
const cacheConfig = {}

export default {
  functional: true,
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    actionAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    allOptions: {
      type: Object,
      default() {
        return {}
      }
    },
    stripe: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    }
  },
  render(h, context) {
    const { data, props, scopedSlots } = context
    const { fields, actionAttrs, stripe, pageSize, pageSizes } = props

    // 将pageSize添加到pageSizes中
    let newPageSizes = pageSizes
    if (!pageSizes.includes(pageSize)) {
      newPageSizes.push(pageSize)
      newPageSizes.sort((a, b) => a - b)
      cacheConfig['pageSizes'] = newPageSizes
    } else {
      newPageSizes = cacheConfig['pageSizes'] || pageSizes
    }

    const getTableColumn = (arr = []) => {
      return arr.reduce((acc, item) => {
        const { table_type, other_attrs = {}, label, prop, prop_width, prop_min_width, null_value_display, editable, display, children = [], ...restItem } = item

        // 不显示跳过
        if (!display) {
          return acc
        }
        const newLabel = typeof (label) === 'string' ? label : undefined
        const tmpScopedSlots = {}

        const needIgnoreColumn = ['selection', 'index', 'expand'].includes(table_type)
        if (!needIgnoreColumn) {
          if (!newLabel) {
            tmpScopedSlots['header'] = (scope) => {
              return <RenderHeader scope={scope} label={label} />
            }
          }
          tmpScopedSlots['default'] = (scope) => {
            return <RenderCell scope={scope} config={item} item={restItem} parent={context} />
          }
        }
        if (table_type === 'expand' && scopedSlots['expand']) {
          tmpScopedSlots['default'] = (scope) => {
            return scopedSlots['expand'](scope)
          }
        }

        const tmpNodes = <PlTableColumn
          type={table_type}
          prop={prop}
          label={newLabel}
          width={numberToPx(prop_width)}
          min-width={numberToPx(prop_min_width)}
          attrs={other_attrs}
          scopedSlots={tmpScopedSlots}>
        </PlTableColumn>
        return [...acc, tmpNodes]
      }, [])
    }

    return <PlTable
      {...data}
      stripe={stripe}
      page-size={pageSize}
      page-sizes={newPageSizes}
      class='base-table'>
      { getTableColumn(fields) }
      {
        scopedSlots.action && <PlTableColumn
          label='操作'
          prop='action'
          attrs={actionAttrs}
          scopedSlots={{ default: scopedSlots.action }} />
      }
    </PlTable>
  }
}

</script>
<style lang="scss">
@import '~@/styles/modules/base-table.scss';
</style>
