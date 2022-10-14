<script>
/* eslint-disable no-unused-vars */
import { PlTable, PlTableColumn } from 'pl-table'
import RenderHeader from './render-header.vue'
import RenderCell from './render-cell.vue'

import { renderError } from '@/utils'
import { numberToPx, getTableFieldData, getTableFieldByTableData } from './utils'

import './pl-table.css'

export { getTableFieldData, getTableFieldByTableData }

// 暂存配置
const cacheConfig = {}

export default {
  functional: true,
  props: {
    height: [Number, String],
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    actionAttrs: {
      type: Object,
      default() {
        return {
          fixed: 'right'
        }
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
      default: 50
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    }
  },
  renderError,
  render(h, context) {
    const { data, props, scopedSlots } = context
    const { height, paginationShow, fields, actionAttrs, stripe, pageSize, pageSizes } = props

    // 将pageSize添加到pageSizes中
    let newPageSizes = pageSizes
    if (!pageSizes.includes(pageSize)) {
      newPageSizes.push(pageSize)
      newPageSizes.sort((a, b) => a - b)
      cacheConfig['pageSizes'] = newPageSizes
    } else {
      newPageSizes = cacheConfig['pageSizes'] || pageSizes
    }

    const createTableColumn = (item, vprop) => {
      const { table_type, other_attrs = {}, label, prop, prop_width, prop_min_width, editable, display = true, null_value_display = true, children = [], ...restItem } = item
      item.vprop = vprop
      // 不显示跳过
      if (!display) {
        return
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
        prop={vprop}
        label={newLabel}
        width={numberToPx(prop_width)}
        min-width={numberToPx(prop_min_width)}
        attrs={other_attrs}
        scopedSlots={tmpScopedSlots}>
        {
          children.length ? children.map((item) => {
            return createTableColumn(item, `${vprop}.${item.prop}`)
          }) : ''
        }
      </PlTableColumn>
      return tmpNodes
    }

    const actionColumnData = {
      props: {
        label: '操作',
        prop: 'action',
        ...actionAttrs
      },
      scopedSlots: {
        default: scopedSlots.action
      }
    }

    return <PlTable
      {...data}
      stripe={stripe}
      page-size={pageSize}
      page-sizes={newPageSizes}
      style={{ height: numberToPx(height) }}
      class='base-table'>
      {
        fields.reduce((acc, v) => {
          const tmpNodes = createTableColumn(v, v.prop)
          if (!tmpNodes) {
            return acc
          }
          return [...acc, tmpNodes]
        }, [])
      }
      {
        scopedSlots.action && <PlTableColumn {...actionColumnData} />
      }
    </PlTable>
  }
}

</script>
<style lang="scss">
@import '~@/styles/base-table.scss';
</style>
