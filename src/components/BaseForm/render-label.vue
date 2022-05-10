<script>
export default {
  functional: true,
  props: {
    label: {
      type: [String, Function]
    },
    labelSuffix: String
  },
  render(h, context) {
    const { props } = context
    const { label, labelSuffix } = props
    if (typeof (label) === 'function') {
      return <span style='line-height: 1'>
        { label(h, context) }
      </span>
    }
    return label && [label, labelSuffix]
  }
}
</script>
