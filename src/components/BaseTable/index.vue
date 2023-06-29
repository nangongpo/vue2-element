<script>
import { PlTable, PlTableColumn } from 'pl-table'
import RenderHeader from './render-header.vue'
import RenderCell from './render-cell.vue'

import { renderError, numberToPx } from '@/utils'
import { isNormalColumn } from './utils'

import './pl-table.css'

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
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    paginationBackground: Boolean, // 分页条开启背景
    paginationCenter: Boolean, // 分页条是否居中
    pageSize: {
      type: Number,
      default: 50
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100, 200]
      }
    },
    defaultValue: {
      type: String,
      default: '—'
    }
  },
  renderError,
  render(h, context) {
    const { data, props, scopedSlots } = context
    const { height, fields, actionAttrs, border, stripe, paginationBackground, paginationCenter, pageSize, pageSizes } = props

    // 将pageSize添加到pageSizes中
    let newPageSizes = pageSizes
    if (!pageSizes.includes(pageSize)) {
      newPageSizes.push(pageSize)
      newPageSizes.sort((a, b) => a - b)
      cacheConfig['pageSizes'] = newPageSizes
    } else {
      newPageSizes = cacheConfig['pageSizes'] || pageSizes
    }

    const createTableColumn = (item) => {
      const { table_type, other_attrs = {}, label, prop, prop_class, prop_overflow = false, prop_width, prop_min_width, display = true, children = [], ...restItem } = item
      // 不显示跳过
      if (!display) {
        return
      }
      const newLabel = typeof (label) === 'string' ? label : undefined
      const tmpScopedSlots = {}

      const tableColumnAttrs = {
        'type': table_type,
        'prop': prop,
        'label': newLabel,
        'width': numberToPx(prop_width),
        'min-width': numberToPx(prop_min_width),
        'class-name': prop_class,
        'show-overflow-tooltip': prop_overflow,
        ...other_attrs
      }

      if (isNormalColumn(item)) {
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

      const tmpNodes = <PlTableColumn attrs={tableColumnAttrs} scopedSlots={tmpScopedSlots}>
        {
          Array.isArray(children) && children.map(v => {
            return createTableColumn(v)
          })
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
      border={border}
      stripe={stripe}
      page-size={pageSize}
      page-sizes={newPageSizes}
      style={{ height: numberToPx(height) }}
      class={
        ['base-table', { 'is-pagination-background': paginationBackground, 'is-pagination-center': paginationCenter }]
      }>
      {
        fields.reduce((t, v) => {
          const tmpNodes = createTableColumn(v, v.prop)
          if (!tmpNodes) {
            return t
          }
          return [...t, tmpNodes]
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
