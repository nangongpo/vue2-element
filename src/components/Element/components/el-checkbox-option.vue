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
      isIndeterminate: true,
      checkAll: false
    }
  },
  render() {
    this.checked = this.value
    const { options = [], defaultProps, isIndeterminate } = this
    const self = this
    const onInput = (value) => {
      self.$emit('input', value)
    }
    const onChangeAll = (val) => {
      const allOptionsVal = self.options.reduce((t, v) => [...t, v[defaultProps.value]], [])
      const checkedCities = val ? allOptionsVal : []
      self.$emit('input', checkedCities)
      self.isIndeterminate = false
    }
    const onCheckedChange = (value) => {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.options.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
    }
    const getOptionHeader = () => <el-checkbox label='全选' indeterminate={isIndeterminate} v-model={self.checkAll} style='margin-right:15px' onChange={onChangeAll}>全选</el-checkbox>

    return <div style='display:flex'>
      {this.selectAll && getOptionHeader()}
      <el-checkbox-group value={this.checked} onInput={onInput}>
        {
          options.map((item, index) => {
            return <el-checkbox
              key={index}
              label={item[defaultProps.value]}
              disabled={item[defaultProps.disabled]}
              onChange={onCheckedChange}
            >
              {item[defaultProps.label]}
            </el-checkbox>
          })
        }
      </el-checkbox-group>
    </div>
  }
}

</script>
<style lang="scss">

</style>
