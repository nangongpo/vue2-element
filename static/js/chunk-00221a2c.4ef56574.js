(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00221a2c"],{1072:function(e,n,t){"use strict";t("5f1d")},"201b":function(e,n,t){"use strict";t.r(n);var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"preview-pdf app-container"},[t("el-button",{attrs:{type:"primary"},on:{click:function(n){e.previewInfo.visible=!0}}},[e._v("预览pdf")]),t("vue-pdf",e._b({},"vue-pdf",e.previewInfo,!1,!0)),t("h3",[e._v("添加方法")]),e._m(0)],1)},a=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ul",[t("li",[e._v(" vue.config.js 中添加, 用于将public中的文件夹打包到dist/static中, 关键代码如下 "),t("pre",[e._v("        config\n          .plugin('copy')\n          .tap(args => {\n            args[0][0].ignore.push('**/*/**')\n            args[0].push({\n              from: resolve('public'),\n              to: resolve(`${outputDir}/${assetsDir}`),\n              toType: 'dir',\n              ignore: ['.jpg', '.jpeg', '.png', '.ico', 'index.html']\n            })\n            return args\n          })\n      ")])]),t("li",[e._v("public文件夹下放置 pdf工具包 (pdf.js 和 pdf.worker.js)")]),t("li",[e._v(" vue-pdf组件内部使用了 "),t("pre",[e._v("        import { getLocalFile } from '@/api/file'\n        getLocalFile方法用于指定pdf工具包的资源路径\n      ")])]),t("li",[e._v("vue-pdf只支持同源的pdf链接, 部分样式依赖el-image")])])}],s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"viewer-fade"}},[e.visible?t("div",{staticClass:"vue-pdf el-image-viewer__wrapper",style:{"z-index":e.viewerZIndex},attrs:{tabindex:"-1"}},[t("div",{staticClass:"el-image-viewer__mask"}),t("div",{staticClass:"vue-pdf-wrapper"},[t("div",{staticClass:"vue-pdf-control"},[t("el-button",{on:{click:e.prev}},[e._v("上一页")]),t("el-button",{on:{click:e.next}},[e._v("下一页")]),t("span",{staticClass:"vue-pdf-page-num"},[e._v(" 页码: "),t("el-input-number",{attrs:{controls:!1},on:{change:e.changePageNum,blur:e.refreshPageNum},model:{value:e.page_num,callback:function(n){e.page_num=n},expression:"page_num"}}),e._v(" / "),t("span",{domProps:{textContent:e._s(e.page_count)}})],1),t("el-button",{attrs:{icon:"el-icon-plus"},on:{click:e.addscale}}),t("el-button",{attrs:{icon:"el-icon-minus"},on:{click:e.minus}}),t("el-button",{attrs:{id:"prev"},on:{click:e.closepdf}},[e._v("关闭")])],1),t("div",{staticClass:"vue-pdf-content"},[t("canvas",{directives:[{name:"loading",rawName:"v-loading",value:e.pageRendering,expression:"pageRendering"}],staticClass:"canvas-style",attrs:{id:"the-canvas","element-loading-text":"拼命加载中"}})])])]):e._e()])},r=[],u=(t("a9e3"),t("03a5")),o=t("b85c"),c=(t("d9e2"),[]);function l(){return window.pdfjsLib}var d=function(e,n){var t=document.getElementById(e),i=n||function(){};if(!t){var a=document.createElement("script");a.src=e,a.id=e,document.body.appendChild(a),c.push(i);var s="onload"in a?r:u;s(a)}function r(n){n.onload=function(){this.onerror=this.onload=null;var e,t=Object(o["a"])(c);try{for(t.s();!(e=t.n()).done;){var i=e.value;i(null,n)}}catch(a){t.e(a)}finally{t.f()}c=null},n.onerror=function(){this.onerror=this.onload=null,i(new Error("Failed to load "+e),n)}}function u(e){e.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var n,t=Object(o["a"])(c);try{for(t.s();!(n=t.n()).done;){var i=n.value;i(null,e)}}catch(a){t.e(a)}finally{t.f()}c=null}}}t&&i&&(l()?i(null,t):c.push(i))},p=d,g=t("3f5e"),f=Object(g["a"])("/pdf/pdf.js"),v=Object(g["a"])("/pdf/pdf.worker.js"),h={name:"VuePdf",props:{visible:Boolean,src:String,zIndex:{type:Number,default:2e3}},data:function(){return{pdfDoc:null,pageNum:1,pageRendering:!1,pageNumPending:null,scale:1,page_num:0,page_count:0,maxscale:2,minscale:.8}},computed:{viewerZIndex:function(){var e=u["a"].nextZIndex();return this.zIndex>e?this.zIndex:e}},watch:{visible:{handler:"init",immediate:!0}},methods:{init:function(e){var n=this,t=this.src,i=this.initPDF;e&&t&&(this.pageNum=1,p(f,(function(e){e?n.$message.error(e.message):i(t)})))},initPDF:function(e){var n=this,t=this.pageNum,i=this.renderPage;window.pdfjsLib.GlobalWorkerOptions.workerSrc=v,window.pdfjsLib.getDocument(e).then((function(e){n.pdfDoc=e,n.page_count=e.numPages,i(t)}))},renderPage:function(e){var n=this,t=this.pdfDoc,i=this.scale,a=this.pageNum,s=this.renderPage;this.pageRendering=!0;var r=document.getElementById("the-canvas");t.getPage(e).then((function(e){var t=e.getViewport(i);r.height=t.height,r.width=t.width;var a=r.getContext("2d"),u={canvasContext:a,viewport:t},o=e.render(u);o.promise.then((function(){n.pageRendering=!1,null!==n.pageNumPending&&(s(n.pageNumPending),n.pageNumPending=null)}))})),this.page_num=a},addscale:function(){var e=this.scale,n=this.maxscale,t=this.pageNum,i=this.queueRenderPage;e>=n||(this.scale+=.1,i(t))},minus:function(){var e=this.scale,n=this.minscale,t=this.pageNum,i=this.queueRenderPage;e<=n||(this.scale-=.1,i(t))},prev:function(){var e=this.pageNum,n=this.queueRenderPage;e<=1||(this.pageNum--,n(this.pageNum))},next:function(){var e=this.pageNum,n=this.page_count,t=this.queueRenderPage;e>=n||(this.pageNum++,t(this.pageNum))},closepdf:function(){this.$emit("update:visible",!1)},queueRenderPage:function(e){var n=this.pageRendering,t=this.renderPage;n?this.pageNumPending=e:t(e)},changePageNum:function(e){var n=this.page_count,t=this.queueRenderPage;e<1||e>n||(this.pageNum=e,t(e))},refreshPageNum:function(){this.page_num=this.pageNum}}},m=h,b=(t("1072"),t("2877")),_=Object(b["a"])(m,s,r,!1,null,"788b97c2",null),w=_.exports,P={name:"PreviewPdf",components:{VuePdf:w},data:function(){return{previewInfo:{visible:!1,src:Object(g["a"])("/pdf/测试文件.pdf")}}}},N=P,x=Object(b["a"])(N,i,a,!1,null,null,null);n["default"]=x.exports},"3f5e":function(e,n,t){"use strict";t.d(n,"a",(function(){return s}));t("99af"),t("b0c0");var i=t("83d6"),a=t.n(i);function s(e){var n=window.location.origin;return"".concat(n,"/").concat(a.a.name,"/static").concat(e)}},"5f1d":function(e,n,t){}}]);