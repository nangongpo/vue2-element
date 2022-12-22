# vue2-element

## 任务
  - [x] 导出带样式的excel
  - [x] 切换路由取消正在pending的请求
  - [x] 富文本编辑器tinymce的使用
  - [x] 3D引擎threejs的基本用法
  - [ ] vuecli4打包优化
    - [x] 按需加载element-ui, 然后将其独立打包 （babel-plugin-component 和 splitChunks）
          [基本组件列表](src/vendor/Element.js)，剩余组件可通过 import { xx } from 'element-ui'  components: { 'el-xx': xx } 进行局部注册使用
    - [ ] 较大的第三方包， 如 xlsx、pdf-dist、tinymce, 可使用js动态加载的方法
      - [x] [vue-pdf](src/components/VuePdf/)
      - [x] [tinymce](src/components/Tinymce/)
  - [x] 自定义多级表头
  - [x] 自定义多级表头+虚拟滚动
  - [x] 侧边弹框
  - [x] 签名组件的使用
  - [x] 生成条形码
  - [x] [纯函数都放这里](src/utils/util.js)
    - [x] 生成圆形电子章，输出png格式的base图片

# 高拍仪组建
1.身份证读取（el-input-altimeter）
> 主要在public/index.html 写入object

2.拍摄（el-upload-altimeter）
> 1.在App.vue 文件中写入 object
> 2.在store/modules/altimeter 控制按钮loading 加载 及弹窗打开的配置
> 3.上传文件通过高拍仪获取base64 进行压缩后再转为blob对象进行上传

| 字段 | 描述 | 数据类型 | 默认值 |
| -- | -- | -- | -- |
| cameraType| 主副摄像头（ 1 主 2 副） | string | 1|
| mode| 剪裁模式（自动 '3', 默认 '0', 证件 '4',自定义 '1'） | string |  3 |
| rotate| 旋转角度 | number |  0 |
| multiple| 是否支持上传多张 | boolean | true |

## 创建静态资源分支gh-pages

- 首次创建
  ```
  npm run build:prod(主分支打包)
  git checkout -b gh-pages
  git add -f dist
  git commit '提交内容'
  git subtree push --prefix=dist origin gh-pages
  ```

- 后续更新
  ```
  npm run build:prod(主分支打包)
  git checkout gh-pages
  git add -f dist
  git commit '提交内容'
  git subtree push --prefix=dist origin gh-pages
  ```

## 项目构建
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
