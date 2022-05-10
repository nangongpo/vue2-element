import settings from '@/settings'
// 获取放在public目录下的文件
export function getLocalFile(path) {
  const domain = window.location.origin
  return process.env.NODE_ENV === 'production' ? `${domain}/${settings.name}/static${path}` : `${domain}${path}`
}

// 远程文件
export function getRemoteFile(path) {
  const baseAPI = process.env.VUE_APP_BASE_API
  return `${baseAPI}/${path}`
}
