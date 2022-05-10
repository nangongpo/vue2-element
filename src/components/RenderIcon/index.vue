<script>
export default {
  functional: true,
  props: {
    icon: String,
    className: String
  },
  render(h, context) {
    const { icon, className } = context.props
    const vnodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon', className]} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon} class-name={className} />)
      }
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
