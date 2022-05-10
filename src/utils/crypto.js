import AES from 'crypto-js/aes'
import enc from 'crypto-js/enc-utf8'

// AES加密
export function encrypt(data) {
  if (data === null || data === undefined) return
  return AES.encrypt(JSON.stringify(data), process.env.VUE_APP_SECRET).toString()
}

export function decrypt(data) {
  if (data === null || data === undefined) return
  return JSON.parse(AES.decrypt(data, process.env.VUE_APP_SECRET).toString(enc))
}
