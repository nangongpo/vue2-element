import Vue from 'vue'
import VueRouter from 'vue-router'

// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/my-form',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/my-form/index'),
        name: 'MyForm',
        meta: { title: '我的表单', icon: 'icon', noCache: false }
      }
    ]
  },
  {
    path: '/preview-pdf',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/preview-pdf/index'),
        name: 'PreviewPdf',
        meta: { title: '预览PDF', icon: 'icon', noCache: false }
      }
    ]
  },
  {
    path: '/tinymce',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tinymce/index'),
        name: 'Tinymce',
        meta: { title: '富文本编辑器', icon: 'icon', noCache: false }
      }
    ]
  },
  {
    path: '/confirm-dialog',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/confirm-dialog/index'),
        name: 'ConfirmDialog',
        meta: { title: 'confirm弹窗', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/threejs',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/threejs/index'),
        name: 'ThreeJS',
        meta: { title: 'threejs', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/barcode',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/barcode/index'),
        name: 'Barcode',
        meta: { title: '条形码', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel', noCache: true }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected', noCache: true }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header', noCache: true }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
  {
    path: '/custom-table',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/custom-table/index'),
        name: 'CustomTable',
        meta: { title: '自定义多级表头', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/custom-table-input',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/custom-table-input/index'),
        name: 'CustomTableInput',
        meta: { title: '自定义多级表头-虚拟滚动版', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/side-pop-up',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/side-pop-up/index'),
        name: 'SidePopUp',
        meta: { title: '侧边弹框', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/sign',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/sign/index'),
        name: 'sign',
        meta: { title: '签名', icon: 'icon', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
