<template>
  <div class="preview-pdf app-container">
    <el-button type="primary" @click="previewInfo.visible = true">预览pdf</el-button>
    <vue-pdf v-bind.sync="previewInfo" />
    <h3>添加方法</h3>
    <ul>
      <li>
        vue.config.js 中添加, 用于将public中的文件夹打包到dist/static中, 关键代码如下
        <pre>
          config
            .plugin('copy')
            .tap(args => {
              args[0][0].ignore.push('**/*/**')
              args[0].push({
                from: resolve('public'),
                to: resolve(`${outputDir}/${assetsDir}`),
                toType: 'dir',
                ignore: ['.jpg', '.jpeg', '.png', '.ico', 'index.html']
              })
              return args
            })
        </pre>
      </li>
      <li>public文件夹下放置 pdf工具包 (pdf.js 和 pdf.worker.js)</li>
      <li>
        vue-pdf组件内部使用了
        <pre>
          import { getLocalFile } from '@/api/file'
          getLocalFile方法用于指定pdf工具包的资源路径
        </pre>
      </li>
      <li>vue-pdf只支持同源的pdf链接, 部分样式依赖el-image</li>
    </ul>
  </div>
</template>

<script>
import VuePdf from '@/components/VuePdf/index.vue'
import { getLocalFile } from '@/api/file'

export default {
  name: 'PreviewPdf',
  components: { VuePdf },
  data() {
    return {
      previewInfo: { visible: false, src: getLocalFile('/pdf/测试文件.pdf') }
    }
  }
}
</script>
