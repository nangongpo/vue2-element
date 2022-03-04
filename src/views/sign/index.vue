<template>
  <div class="signWrapper">
    <div class="title">
      <div>横屏展示签名（主要通过样式控制）</div>
      <div>注：<a href="https://www.npmjs.com/package/sign-canvas">相关组件api</a></div>
    </div>
    <div class="sign">
      <div class="buttonWrapper">
        <el-button type="primary" plain block @click="handleReset">重新签名</el-button>
        <el-button type="primary" block @click="handleGenerate">提交签名</el-button>
      </div>
      <vueEsign ref="esign" :options="options" />
    </div>
  </div>
</template>
<script>
import vueEsign from 'sign-canvas'
import { rotateBase64Img } from '@/utils'
export default {
  components: { vueEsign },
  data() {
    return {
      options: {
        isFullScreen: false, // 是否全屏手写 [Boolean] 可选
        isFullCover: false,
        isDpr: false, // 是否使用dpr兼容高倍屏 [Boolean] 可选
        lastWriteSpeed: 1, // 书写速度 [Number] 可选
        lastWriteWidth: 2, // 下笔的宽度 [Number] 可选
        lineCap: 'round', // 线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square]	正方形线帽
        lineJoin: 'bevel', // 线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
        isShowBorder: false, // 是否显示边框 [可选]
        canvasWidth: 375 - 60, // canvas宽高 [Number] 可选
        canvasHeight: 667 - 60,
        bgColor: 'transparent', // 背景色 [String] 可选
        borderWidth: 1, // 网格线宽度  [Number] 可选
        borderColor: '#ff787f', // 网格颜色  [String] 可选
        writeWidth: 5, // 基础轨迹宽度  [Number] 可选
        maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
        minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
        writeColor: '#101010', // 轨迹颜色  [String] 可选
        isSign: true, // 签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
        imgType: 'png' // 下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的
      }
    }
  },
  methods: {
    handleReset() {
      this.$refs.esign.canvasClear()
    },
    handleGenerate() {
      const img = this.$refs.esign.saveAsImg()
      rotateBase64Img(img, 270, (imgUrl) => {
        alert(imgUrl)
      })
    }
  }
}
</script>
<style lang="scss">
  .signWrapper {
    padding: 12px;
    .title {
      margin-bottom: 10px;
    }
    a {
      text-decoration: underline;
      color: #1890ff;
      cursor: pointer;

      &:hover {
        color: #a3d3ff;
      }
    }
  }
  .sign {
      background: #fff;
      border-radius:  8px;
      height: 667px;
      width: 375px;
      border: 1px solid #999;
      height:calc( 667px - 60px);
      position: relative;
      .buttonWrapper {
        display: flex;
        position: absolute;
        z-index: 99999;
        width: calc( 667px - 60px);
        height: 40px;
        button {
          width: 49%;
        }
        transform: rotate(90deg);
        top: calc(333.5px - 50px);
        left: calc(50px - 333.5px);
      }
    }
</style>
