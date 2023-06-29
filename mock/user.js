
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    real_name: '超级管理员',
    role_name: '超级管理员',
    last_login_time: '2022-05-01 10:00:00'
  },
  'editor-token': {
    roles: ['editor'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    real_name: '普通用户',
    role_name: '普通用户',
    last_login_time: '2022-05-01 10:00:00'
  }
}

const all_options = {
  user_status: [
    { label: '正常', value: '1' },
    { label: '停用', value: '2' }
  ],
  data_permission: [
    { label: '全部', value: '1' },
    { label: '本单位', value: '2' },
    { label: '个人', value: '3' }
  ]
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const user_info = users[token]

      // mock error
      if (!user_info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: {
          user_info,
          ...all_options
        }
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
