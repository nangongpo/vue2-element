export default {
  phone: { pattern: /^[1][3-9][0-9]{9}$/, message: '手机号不正确' },
  password: { pattern: /^\S*(?=\S{8,18})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[\-\_!@#$%^&*?])\S*$/, message: '最少8位最大18位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }
}
