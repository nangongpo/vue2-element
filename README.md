# vue2-element

## 任务
  - [x] 导出带样式的excel
  - [x] 切换路由取消正在pending的请求
  - [x] 富文本编辑器tinymce的使用
  - [x] 3D引擎threejs的基本用法
  - [] vuecli4打包优化
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
