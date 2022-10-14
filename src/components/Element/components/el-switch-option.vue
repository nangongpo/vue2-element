<script>
import ElSwitch from 'element-ui/packages/switch/index'
const MySwitch = {
  extends: ElSwitch,
  props: {
    activeValue: {
      type: [String, Boolean, Number],
      default: ''
    },
    inactiveValue: {
      type: [String, Boolean, Number],
      default: ''
    }
  }
}

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

    return <MySwitch
      { ...data }
      active-text={active.label}
      inactive-text={inactive.label}
      active-value={active.value}
      inactive-value={inactive.value}>
    </MySwitch>
  }
}
</script>
