<script>
/* eslint-disable no-unused-vars */
export default {
  functional: true,
  props: {
    scope: Object,
    label: [String, Function]
  },
  render(h, context) {
    const { props } = context
    const { label } = props
    if (typeof (label) === 'function') {
      return label(h, context)
    }
    return [label]
  }
}
</script>
