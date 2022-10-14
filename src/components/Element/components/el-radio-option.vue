<script>
export default {
  functional: true,
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
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
  render(h, context) {
    const { data, props } = context
    const { options = [], defaultProps } = props

    return <el-radio-group { ...data }>
      {
        options.map((item, index) => {
          return <el-radio
            key={index}
            label={item[defaultProps.value]}
            disabled={item[defaultProps.disabled]}
          >
            {item[defaultProps.label]}
          </el-radio>
        })
      }
    </el-radio-group>
  }
}
</script>
