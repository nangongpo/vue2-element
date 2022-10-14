<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-tooltip content="应用检索" effect="dark" placement="bottom">
          <search id="header-search" class="right-menu-item" />
        </el-tooltip>

        <error-log class="errLog-container right-menu-item hover-effect" />

        <el-tooltip content="全屏" effect="dark" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <!-- <div class="right-menu-item hover-effect">
          <el-badge is-dot="" class="icon-badge" @click="handleCommand('notice')">
            <i class="el-icon-message-solid" />
          </el-badge>
        </div> -->

      </template>

      <el-dropdown size="small" trigger="click" class="right-menu-item hover-effect" @command="handleCommand">
        <div class="avatar-wrapper">
          <svg-icon icon-class="user" />
          <span> {{ userInfo.real_name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login">登录信息</el-dropdown-item>
          <el-dropdown-item command="updatePassword">密码修改</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="right-menu-item hover-effect" @click="handleCommand('logout')">
        <svg-icon icon-class="exit" />
        <span> 退出</span>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogConfig.visible"
      :title="dialogConfig.title"
      :width="dialogConfig.width"
      :close-on-click-modal="false"
      top="0"
      center
      append-to-body
      class="center"
      @open="handleFormReset('dialog')"
    >
      <base-form
        ref="dialog"
        :fields="dialogConfig.fields"
        :model="dialogConfig.model"
        :patterns="dialogConfig.patterns"
        :label-width="dialogConfig.labelWidth"
        :value-width="dialogConfig.valueWidth"
        :class="dialogConfig.formClass"
        label-as-placeholder
        label-suffix=":"
      >
        <template #input="{ prop, attrs }">
          <el-input
            v-model="dialogConfig.model[prop]"
            v-bind="attrs"
          />
        </template>
      </base-form>
      <template v-if="dialogConfig.showFooter" #footer>
        <el-button @click="dialogConfig.visible = false">取 消</el-button>
        <el-button :loading="dialogConfig.loading" type="primary" @click="handleSubmit">确 定</el-button>
      </template>
    </el-dialog>

    <el-dialog
      :visible.sync="messageDialog.visible"
      :title="messageDialog.title"
      :width="messageDialog.width"
      :close-on-click-modal="false"
      :show-close="false"
      append-to-body
      center
      top="0"
      class="center"
      custom-class="message-dialog"
    >
      <div style="padding: 20px 0 40px 0;" class="text-center font-16">
        <render-jsx :value="messageDialog.message" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import ErrorLog from '@/components/ErrorLog/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import SizeSelect from '@/components/SizeSelect/index.vue'
import Search from '@/components/HeaderSearch/index.vue'
import BaseForm from '@/components/BaseForm/index.vue'
import RenderJsx from '@/components/RenderJsx/index.vue'
import { countDown } from '@/utils'
import { axiosPost } from '@/api'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
    BaseForm,
    RenderJsx
  },
  data() {
    return {
      dialogConfig: {
        formClass: '',
        visible: false,
        loading: false,
        action: '',
        title: '',
        width: '',
        labelWidth: '',
        valueWidth: '',
        fields: [],
        model: {},
        patterns: {},
        showFooter: false
      },
      messageDialog: {
        visible: false,
        title: '',
        width: '',
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'userInfo',
      'firstLogin'
    ])
  },
  mounted() {
    this.firstLogin && this.showLoginInfo()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleCommand(command) {
      const { showNoticeInfo, showLoginInfo, showResetPassword, logout } = this
      switch (command) {
        case 'notice':
          showNoticeInfo()
          break
        case 'login':
          showLoginInfo()
          break
        case 'updatePassword':
          showResetPassword()
          break
        case 'logout':
          logout()
          break
      }
    },
    handleSubmit() {
      // eslint-disable-next-line no-unused-vars
      const { dialogConfig, userInfo, logout } = this
      const { action, model } = dialogConfig
      this.$refs.dialog.validate(valid => {
        if (!valid) return
        switch (action) {
          case 'reset_password':
            dialogConfig.loading = true
            axiosPost('/user/reset_password/', { username: userInfo.card_id, password: model.password }).then(() => {
              dialogConfig.visible = false
              dialogConfig.loading = false

              countDown((second) => {
                const visible = second > 0
                if (visible) {
                  this.messageDialog = {
                    visible,
                    title: '密码修改',
                    width: '400px',
                    message: (h) => <div>操作成功, <strong class='text-primary'>{second}s</strong> 后自动进入登录页面</div>
                  }
                  return
                }
                this.messageDialog.visible = visible
                logout()
              }, 3)
            }).catch(() => {
              dialogConfig.loading = false
            })
            break
        }
      })
    },
    showResetPassword() {
      this.dialogConfig = {
        visible: true,
        action: 'reset_password',
        showFooter: true,
        loading: false,
        title: '密码修改',
        width: '400px',
        labelWidth: '105px',
        valueWidth: '240px',
        fields: [
          {
            'label': '输入密码',
            'prop': 'password',
            'prop_type': 'string',
            'prop_width': 1,
            'display': true,
            'editable': true,
            'required': true,
            'render': 'input'
          },
          {
            'label': '确认密码',
            'prop': 'confirm_password',
            'prop_type': 'string',
            'prop_width': 1,
            'display': true,
            'editable': true,
            'required': true,
            'render': 'input'
          }
        ],
        model: { password: '', confirm_password: '' },
        patterns: {
          password: {
            validator: (rule, value, callback) => {
              const { confirm_password } = this.dialogConfig.model
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (confirm_password !== '') {
                  this.$refs.dialog.validateField('confirm_password')
                }
                callback()
              }
            }
          },
          confirm_password: {
            validator: (rule, value, callback) => {
              const { password } = this.dialogConfig.model
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            }
          }
        }
      }
    },
    async showLoginInfo() {
      // eslint-disable-next-line no-unused-vars
      const { userInfo = {}, $createElement: h } = this

      const fields = [
        { label: '真实姓名', prop: 'real_name' },
        { label: '所属角色', prop: 'role_name' },
        { label: '最近一次登录时间', prop: 'last_login_time' }
      ]

      const vNodes = fields.map(item => {
        return h('div', { class: 'info-item' }, `${item.label}：${userInfo[item.prop] || '暂无'}`)
      })

      this.$msgbox({
        title: '登录信息',
        customClass: 'login-info',
        center: true,
        message: h(
          'div',
          { class: 'info-wrapper text-left' },
          vNodes
        ),
        showCancelButton: false,
        showConfirmButton: false,
        closeOnClickModal: false,
        callback: () => {}
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleFormReset(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/base/_variables.scss';

.navbar {
  height: $headerHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 15px;

  .hamburger-container {
    line-height: $headerHeight - 4;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: $headerHeight;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $headerHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

.login-info {
  .info-wrapper {
    padding: 0 10px;
    font-size: 16px;
    .info-item {
      padding: 5px 0;
    }
  }
  .backlog-info {
    padding: 10px 0;
  }
}
</style>
