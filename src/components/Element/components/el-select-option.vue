<script>
/* eslint-disable no-unused-vars */
import { byteLength, debounce, isValidValue } from '@/utils'

export default {
  props: {
    value: [Array, String, Number],
    placeholder: {
      type: String,
      default: '请选择'
    },
    multiple: Boolean, // 多选时强制显示所有选项
    remote: Boolean,
    filterMethod: Function,
    remoteMethod: Function,
    collapseTags: { // 多选时是否将选中值按文字的形式展示
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    showOptionHeader: Boolean, // 显示”全选|全不选“
    showOptionValue: Boolean, // 显示映射值
    showAllOption: Boolean, // 显示所有选项
    maxlength: { // 可选项的个数
      type: Number,
      default: 20
    },
    optionMaxWidth: { // 选项的最大宽度
      type: Number,
      default: 600
    },
    defaultProps: { // 映射关系对应键名称
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        }
      }
    }
  },
  data() {
    this.selectedOptions = []
    this.otherOptions = []
    this.selectedValue = []
    return {
      newOptions: [] // this.options.slice(0, this.maxlength)
    }
  },
  computed: {
    isRemote() {
      return !this.showAllOption && this.options.length > this.maxlength
    }
  },
  watch: {
    value: {
      handler: 'initOptions',
      deep: true,
      immediate: true
    }
  },
  methods: {
    initOptions(value) {
      const { isRemote, options, formatItem, setOptions } = this
      // 默认值为空时，强制清空已选项
      if (isValidValue(value)) {
        if (this.$refs.select) {
          this.$refs.select.selectedLabel = ''
        }
      }
      // 选项过多时，获取默认值对应的选项，将其放到选项列表的最上方
      if (isRemote) {
        const values = Array.isArray(value) ? value : isValidValue(value) ? [value] : []
        const selectedOptions = []
        const otherOptions = []
        options.map(v => {
          const item = formatItem(v)
          if (values.includes(item.value)) {
            selectedOptions.push(item)
          } else {
            otherOptions.push(item)
          }
        })
        this.selectedValue = values
        this.selectedOptions = selectedOptions
        this.otherOptions = otherOptions
      } else {
        this.selectedOptions = []
        this.otherOptions = options
      }

      setOptions()
    },
    filterOptions(query) {
      const { multiple, showOptionValue, options, selectedValue, otherOptions, setOptions, formatItem } = this
      // 选项过多时，自动启动远程搜索, 显示所有选项(showAllOption=true)时，关闭远程搜索
      debounce(() => {
        let newOptions = []
        if (query) {
          const q = query.toLowerCase()
          for (let i = 0; i < options.length; i++) {
            const item = formatItem(options[i])
            const label = item.label?.toLowerCase()
            // 多选搜索时，排除已勾选的选项
            if (multiple && selectedValue.includes(item.value)) {
              continue
            }
            if (showOptionValue ? (String(item.value).toLowerCase().indexOf(q) > -1 || label.indexOf(q) > -1) : label.indexOf(q) > -1) {
              newOptions.push(item)
            }
          }
        } else {
          newOptions = otherOptions
        }
        this.otherOptions = newOptions
        setOptions()
      }, 50)()
    },
    setOptions() {
      const { isRemote, selectedOptions, otherOptions, maxlength } = this
      this.newOptions = isRemote ? selectedOptions.concat(otherOptions.slice(0, maxlength)) : otherOptions
    },
    onMultiple(isCheckAll) {
      const { newOptions, formatItem } = this
      const newValue = isCheckAll ? newOptions.map(v => formatItem(v).value) : []
      this.$emit('input', newValue)
    },
    formatItem(item) {
      const { defaultProps } = this
      const _item = item
      for (const key in defaultProps) {
        _item[key] = item[defaultProps[key]]
      }
      return _item
    },
    getOptionHeader() {
      const { showOptionHeader, multiple, onMultiple } = this

      return showOptionHeader && multiple && <li class='el-select-dropdown__header' key='option-header'>
        <el-button size='middle' type='text' icon='el-icon-check' onClick={() => onMultiple(true)}>全选</el-button>
        <el-button size='middle' type='text' icon='el-icon-close' onClick={() => onMultiple(false)}>全不选</el-button>
      </li>
    }
  },
  render(h) {
    const { value, placeholder, multiple, optionMaxWidth, isRemote, collapseTags, remoteMethod, filterMethod, showOptionValue, newOptions, filterOptions, getOptionHeader, $attrs, $listeners, initOptions } = this

    const { focus, ...restListeners } = $listeners

    // 计算选项的最小宽度
    let optionMinWidth = newOptions.reduce((t, v) => {
      const len = byteLength(v.label) * 7
      return len > t ? len : t
    }, 0)

    const showTooltip = optionMinWidth > optionMaxWidth

    if (showTooltip) {
      optionMinWidth = 0
    }

    const scopedSlots = this.$slots || {}

    const onFocus = (evt) => {
      initOptions(value)
      focus && focus(evt)
    }

    return <el-select
      ref='select'
      value={value}
      placeholder={placeholder}
      multiple={multiple}
      collapse-tags={collapseTags}
      filterMethod={filterMethod || filterOptions}
      remote={isRemote}
      remote-method={remoteMethod || filterOptions}
      attrs={$attrs}
      onFocus={onFocus}
      on={restListeners}>
      { getOptionHeader() }
      {
        newOptions.map((item, index) => {
          const itemData = {
            style: { minWidth: `${optionMinWidth}px`, maxWidth: `${optionMaxWidth}px` },
            attrs: {
              label: item.label,
              value: item.value,
              disabled: item.disabled,
              title: showTooltip ? item.label : ''
            },
            key: `${item.value}`
          }
          if (showOptionValue) {
            return <el-option { ...itemData }>
              <span style='float: left'>{ item.label }</span>
              <span style='float: right; color: #8492a6; font-size: 13px'>{ item.value }</span>
            </el-option>
          }
          return <el-option { ...itemData } />
        })
      }
      {
        Object.keys(scopedSlots).map(slotName => {
          return <template slot={slotName}>
            { scopedSlots[slotName] && scopedSlots[slotName]() }
          </template>
        })
      }
      { this.$slots.default }
    </el-select>
  }
}

</script>
<style lang="scss">
.el-select-dropdown {
  &.is-multiple {
    .el-select-dropdown__item {
      padding-right: 20px;
      &.selected {
        &:after {
          display: none;
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
