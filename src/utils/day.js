import dayjs from 'dayjs'

export function dateFormat(dateStr, format = 'YYYY-MM-DD HH:mm:ss') {
  return dateStr ? dayjs(dateStr).format(format) : ''
}

export default dayjs
