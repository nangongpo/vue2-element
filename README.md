# vue2-element

项目访问地址：https://nangongpo.github.io/vue2-element/
## 任务
  - [x] 导出带样式的excel
  - [x] 切换路由取消正在pending的请求
  - [x] 富文本编辑器tinymce的使用
  - [x] 3D引擎threejs的基本用法
  - [ ] vuecli4打包优化

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

# build for test environment
npm run build:stage

# build for production environment
npm run build:prod

# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run report

# code format check
npm run lint
