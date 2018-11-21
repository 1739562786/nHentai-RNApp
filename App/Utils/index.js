import { Config } from '../Config'

const JPGorPNG = (key) => {
  if (key === 'j') return 'jpg'
  return 'png'
}

export const randomString = () => Math.random().toString(36).substring(2, 10)

export function CoverThumbnail(mediaId, type) {
  return `${Config.t_NHENTAI + mediaId}/cover.${JPGorPNG(type)}`
}

export function PageThumbnail(mediaId, index, type) {
  return `${Config.t_NHENTAI + mediaId}/${index}t.${JPGorPNG(type)}`
}

export function FullImage(mediaId, index, type) {
  return `${Config.i_NHENTAI + mediaId}/${index}.${JPGorPNG(type)}`
}
