<script>
/* eslint-disable no-unused-vars */
import { byteLength } from '@/utils'
export default {
  props: {
    value: [Array, String, Number],
    options: {
      type: Array,
      default() {
        return []
      }
    },
    showOptionHeader: Boolean, // 显示”全选|全不选“
    showOptionValue: Boolean, // 显示映射值
    multiple: Boolean,
    filterMethod: Function,
    defaultProps: { // 映射关系对应键名称
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        }
      }
    },
    maxlength: { // 多选
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      newOptions: []
    }
  },
  watch: {
    value: {
      handler: 'updateOptionsByValue',
      deep: true,
      immediate: true
    }
  },
  methods: {
    filterOptions(query) {
      const { showOptionValue, options, defaultProps, maxlength } = this

      let newOptions = options
      if (query) {
        const _query = query.toLowerCase()
        const filterItem = (item) => {
          const label = item[defaultProps.label]?.toLowerCase()
          const value = item[defaultProps.value]?.toLowerCase()
          return showOptionValue ? (value.indexOf(_query) > -1 || label.indexOf(_query) > -1) : label.indexOf(_query) > -1
        }
        newOptions = options.filter(item => filterItem(item))
      }

      this.newOptions = newOptions.slice(0, maxlength)
    },
    updateOptionsByValue(value) {
      const { multiple, options, maxlength, defaultProps } = this
      if (multiple) {
        this.newOptions = options
        return
      }
      const newOptions = options.slice(0, maxlength)
      if (!value) {
        this.newOptions = newOptions
        return
      }

      const otherOptions = options.slice(maxlength)
      const hasOption = otherOptions.find(v => v[defaultProps.value] === value)

      if (hasOption) {
        newOptions[newOptions.length - 1] = hasOption
      }
      this.newOptions = newOptions
    },
    onMultiple(isCheckAll) {
      const { defaultProps, newOptions } = this
      const newValue = isCheckAll ? newOptions.map(v => v[defaultProps.value]) : []
      this.$emit('input', newValue)
    },
    getOptionHeader() {
      const { showOptionHeader, multiple, onMultiple } = this

      return showOptionHeader && multiple && <li class='el-select-dropdown__header' key='option-header'>
        <el-button size='middle' type='text' icon='el-icon-check' onClick={() => onMultiple(true)}>全选</el-button>
        <el-button size='middle' type='text' icon='el-icon-close' onClick={() => onMultiple(false)}>全不选</el-button>
      </li>
    }
  },
  render(h, context) {
    const { value, multiple, filterMethod, defaultProps, showOptionValue, newOptions, filterOptions, getOptionHeader, $attrs, $listeners, updateOptionsByValue } = this

    const { focus, ...restListeners } = $listeners
    // 计算选项的最小宽度
    const minWidth = newOptions.reduce((t, v) => {
      const len = byteLength(v.label) * 7
      return len > t ? len : t
    }, 0)

    const scopedSlots = this.$slots || {}

    const onFocus = (event) => {
      updateOptionsByValue(value)
      focus && focus(event)
    }

    return <el-select
      value={value}
      multiple={multiple}
      filterMethod={filterMethod || filterOptions}
      attrs={$attrs}
      onFocus={onFocus}
      on={restListeners}
    >
      { getOptionHeader() }
      {
        newOptions.map((item, index) => {
          const newItem = {
            key: index,
            label: item[defaultProps.label],
            value: item[defaultProps.value],
            disabled: item[defaultProps.disabled],
            style: { minWidth: `${minWidth}px` }
          }
          if (showOptionValue) {
            return <el-option
              key={newItem.key}
              label={newItem.label}
              value={newItem.value}
              disabled={newItem.disabled}
              style={newItem.style}>
              <span style='float: left'>{ newItem.label }</span>
              <span style='float: right; color: #8492a6; font-size: 13px'>{ newItem.value }</span>
            </el-option>
          }
          return <el-option
            key={newItem.key}
            label={newItem.label}
            value={newItem.value}
            disabled={newItem.disabled}
            style={newItem.style}>
          </el-option>
        })
      }
      {
        Object.keys(scopedSlots).map(slotName => {
          return <template slot={slotName}>
            { scopedSlots[slotName] && scopedSlots[slotName]() }
          </template>
        })
      }
      { this.$slots.default && this.$slots.default() }
    </el-select>
  }
}

</script>
<style lang="scss">
.el-select-dropdown {
  &.is-multiple {
    .el-select-dropdown__item {
      &.selected {
        &:after {
          border: 1px solid #fff;
        }
      }
    }
  }
  .el-select-dropdown__header {
    margin-top: -6px;
    padding: 0 20px;
  }
}
</style>
