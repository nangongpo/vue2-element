<template>
  <div id="app">
    <router-view />
    <div v-show="dialogConfig.visible" id="captureDialog" ref="captureDialog" class="el-dialog__wrapper" style="z-index: 20000001;">
      <div role="dialog" aria-modal="true" aria-label="高拍仪" class="el-dialog" style="margin-top: 15vh;width:30%">
        <div class="el-dialog__header"><span class="el-dialog__title">高拍仪</span></div>
        <div class="el-dialog__body">
          <object id="capture" classid="clsid:454C18E2-8B7D-43C6-8C17-B1825B49D7DE" width="400" height="300" />
        </div>
        <div class="el-dialog__footer">
          <div class="dialog-footer">
            <el-button v-show="true" id="captureClose" @click="captureClose">关闭摄像头</el-button>
            <el-button id="captureConfirm" type="primary" :loading="dialogConfig.loading">确认拍摄 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
    dialogConfig() {
      return this.$store.state.altimeter
    }
  },
  mounted() {
    // 添加监听页面刷新的功能 页面刷新是将摄像头关闭，否则会连不上摄像头
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    this.pageInit()
  },
  beforeDestroy() {
    this.captureClose()
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  methods: {
    pageInit() {
      // 防止页面刷新后将长链接断开之后不会重新连接
      // this.$store.dispatch('user/getMessage')
    },
    captureOpen() {
      this.$store.commit('altimeter/SET_VISIBLE', true)
      const captrue = document.getElementById('capture')
      captrue.bStopPlay()
      captrue.bStartPlay()

      setTimeout(() => {
        captrue.bSetMode('3')
      }, 1000)
    },
    captureClose() {
      try {
        const capture = document.getElementById('capture')
        capture.bStopPlay()
        this.$store.commit('altimeter/SET_VISIBLE', false)
      } catch (e) {
        this.$store.commit('altimeter/SET_VISIBLE', false)
      }
    },
    beforeunloadFn() {
      this.captureClose()
    }
  }
}
</script>
