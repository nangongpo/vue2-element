<template>
  <transition name="viewer-fade">
    <div
      v-if="visible"
      tabindex="-1"
      class="vue-pdf el-image-viewer__wrapper"
      :style="{ 'z-index': viewerZIndex }"
    >
      <div class="el-image-viewer__mask" />
      <div class="vue-pdf-wrapper">
        <div class="vue-pdf-control">
          <el-button @click="prev">上一页</el-button>
          <el-button @click="next">下一页</el-button>
          <span class="vue-pdf-page-num">
            页码: <el-input-number v-model="page_num" :controls="false" @change="changePageNum" @blur="refreshPageNum" /> / <span v-text="page_count" />
          </span>
          <el-button icon="el-icon-plus" @click="addscale" />
          <el-button icon="el-icon-minus" @click="minus" />
          <el-button id="prev" @click="closepdf">关闭</el-button>
        </div>
        <div class="vue-pdf-content">
          <canvas
            id="the-canvas"
            v-loading="pageRendering"
            element-loading-text="拼命加载中"
            class="canvas-style"
          />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// 该组件样式依赖el-image的样式, 图层由element-ui内置的弹窗管理计算
import { PopupManager } from 'element-ui/src/utils/popup'
import load from './dynamicLoadScript'
import { getLocalFile } from '@/api/file'

const pdfSrc = getLocalFile('/pdf/pdf.js')
const pdfWorkerSrc = getLocalFile('/pdf/pdf.worker.js')

export default {
  name: 'VuePdf',
  props: {
    visible: Boolean,
    src: String,
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      // pdfjs 生成的对象
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      // 放大倍数
      scale: 1,
      // 当前页数
      page_num: 0,
      // 总页数
      page_count: 0,
      // 最大放大倍数
      maxscale: 2,
      // 最小放大倍数
      minscale: 0.8
    }
  },
  computed: {
    viewerZIndex() {
      const nextZIndex = PopupManager.nextZIndex()
      return this.zIndex > nextZIndex ? this.zIndex : nextZIndex
    }
  },
  watch: {
    visible: {
      handler: 'init',
      immediate: true
    }
  },
  methods: {
    init(visible) {
      const { src, initPDF } = this
      if (!visible) return
      if (!src) return
      this.pageNum = 1

      load(pdfSrc, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        initPDF(src)
      })
    },
    initPDF(src) {
      const { pageNum, renderPage } = this
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc
      // 初始化pdf
      window.pdfjsLib.getDocument(src).then(pdfDoc => {
        this.pdfDoc = pdfDoc
        this.page_count = pdfDoc.numPages
        renderPage(pageNum)
      })
    },
    // 渲染pdf
    renderPage(num) {
      const { pdfDoc, scale, pageNum, renderPage } = this
      this.pageRendering = true
      const canvas = document.getElementById('the-canvas')
      pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport(scale)
        canvas.height = viewport.height
        canvas.width = viewport.width
        const canvasContext = canvas.getContext('2d')

        //  Render PDF page into canvas context
        const renderContext = {
          canvasContext,
          viewport
        }
        const renderTask = page.render(renderContext)

        //  Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false
          if (this.pageNumPending !== null) {
            //  New page rendering is pending
            renderPage(this.pageNumPending)
            this.pageNumPending = null
          }
        })
      })
      this.page_num = pageNum
    },
    // 放大
    addscale() {
      const { scale, maxscale, pageNum, queueRenderPage } = this
      if (scale >= maxscale) {
        return
      }
      this.scale += 0.1
      queueRenderPage(pageNum)
    },
    // 缩小
    minus() {
      const { scale, minscale, pageNum, queueRenderPage } = this
      if (scale <= minscale) {
        return
      }
      this.scale -= 0.1
      queueRenderPage(pageNum)
    },
    // 上一页
    prev() {
      const { pageNum, queueRenderPage } = this
      if (pageNum <= 1) {
        return
      }
      this.pageNum--
      queueRenderPage(this.pageNum)
    },
    // 下一页
    next() {
      const { pageNum, page_count, queueRenderPage } = this
      if (pageNum >= page_count) {
        return
      }
      this.pageNum++
      queueRenderPage(this.pageNum)
    },
    // 关闭PDF
    closepdf() {
      this.$emit('update:visible', false)
    },
    queueRenderPage(num) {
      const { pageRendering, renderPage } = this
      if (pageRendering) {
        this.pageNumPending = num
      } else {
        renderPage(num)
      }
    },
    changePageNum(value) {
      const { page_count, queueRenderPage } = this
      if (value < 1 || value > page_count) {
        return
      }
      this.pageNum = value
      queueRenderPage(value)
    },
    refreshPageNum() {
      this.page_num = this.pageNum
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-pdf {
  &-control {
    height: 80px;
    line-height: 80px;
  }
  &-content {
    height: calc(100% - 60px);
    overflow-y: auto;
  }
  &-page-num {
    color: #FFF;
    margin: 0px 5px;
    .el-input-number {
      width: 60px;
    }
  }
  &-mask-layer {
    position: fixed;
    background-color: #000;
    opacity: 0.8;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
}
</style>
