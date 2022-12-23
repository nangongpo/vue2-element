<template>
  <div>
    <el-button  @click="print" :loading="loading">打印</el-button>
  </div>
</template>

<script>
import printJS from 'print-js'
import { getLocalFile } from '@/api/file'
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    print() {
      this.loading = true
      const self = this
      let html = ''
      for (let i = 0; i < 10; i++) {
        html = html + `
        <div class="print-wrapper">
        <div class="content">
          <p>测试${i + 1}</p>
          <p>测试</p>
          <p>测试</p>
        </div>
        <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" style="width:100px; height:100px"/>
      </div>`
      }

      const doc = document.createElement('div')
      doc.innerHTML = html
      printJS({
        printable: doc,
        type: 'html',
        header: null,
        scanStyles: false,
        css: getLocalFile('/printCss/print.css'),
        onLoadingEnd() {
          self.loading = false
        }
      })
    }
  }
}
</script>

<style>

</style>
