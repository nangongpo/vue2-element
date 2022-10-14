<script>
/* eslint-disable no-unused-vars */
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selectAll: Boolean,
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
    return {
      checked: [],
      isIndeterminate: false,
      checkAll: false
    }
  },
  render() {
    this.checked = this.value
    const { options = [], defaultProps, isIndeterminate } = this
    const onInput = (value) => {
      this.$emit('input', value)
    }
    const onChangeAll = (val) => {
      const allOptionsVal = this.options.reduce((t, v) => [...t, v[defaultProps.value]], [])
      const checkedCities = val ? allOptionsVal : []
      this.$emit('input', checkedCities)
      this.isIndeterminate = false
    }
    const onCheckedChange = (value) => {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.options.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
    }
    const getOptionHeader = () => <el-checkbox label='全选' indeterminate={isIndeterminate} v-model={this.checkAll} style='margin-right:15px' onChange={onChangeAll}>全选</el-checkbox>

    return <div>
      {this.selectAll && getOptionHeader()}
      <el-checkbox-group value={this.checked} onInput={onInput} onChange={onCheckedChange}>
        {
          options.map((item, index) => {
            return <el-checkbox
              key={index}
              label={item[defaultProps.value]}
              disabled={item[defaultProps.disabled]}>
              {item[defaultProps.label]}
            </el-checkbox>
          })
        }
      </el-checkbox-group>
    </div>
  }
}
</script>
