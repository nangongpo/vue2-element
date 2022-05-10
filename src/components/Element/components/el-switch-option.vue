<script>
export default {
  functional: true,
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  render(h, context) {
    const { data, props } = context
    const { options } = props
    const [active = {}, inactive = {}] = options

    return <el-switch
      { ...data }
      active-text={active.label}
      inactive-text={inactive.label}
      active-value={active.value}
      inactive-value={inactive.value}>
    </el-switch>
  }
}

</script>
<style lang="scss" scoped>
.wrapper { display: block; }
</style>
