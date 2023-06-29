import {
  Scrollbar,
  Tooltip,
  Tag,
  Link,
  Divider,
  Row,
  Col,
  Card,
  Dialog,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Button,
  Loading,
  Message,
  Avatar,
  MessageBox,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  InputNumber,
  Select,
  Option,
  Cascader,
  Switch,
  TimeSelect,
  TimePicker,
  DatePicker,
  Upload,
  Table,
  TableColumn,
  Progress,
  Image
  // Tabs,
  // TabPane,
  // Rate
  // ColorPicker
  // Transfer,
  // Tree
} from 'element-ui'

const components = [
  Scrollbar,
  Tooltip,
  Tag,
  Link,
  Divider,
  Row,
  Col,
  Card,
  Dialog,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Button,
  Avatar,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  InputNumber,
  Select,
  Option,
  Cascader,
  Switch,
  TimeSelect,
  TimePicker,
  DatePicker,
  Upload,
  Table,
  TableColumn,
  Progress,
  Image
  // Tabs,
  // TabPane,
  // Rate
  // ColorPicker
  // Transfer,
  // Tree
]

export default {
  install(Vue, opts = {}) {
    Vue.prototype.$loading = Loading.service
    Vue.prototype.$message = Message
    Vue.prototype.$msgbox = MessageBox
    // Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    // Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$ELEMENT = opts
    Vue.use(Loading.directive)

    components.forEach(component => {
      Vue.component(component.name, component)
    })
  },
  components
}
