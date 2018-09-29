import { Config } from '../Config'
import JPGorPNG from './JPGorPNG'

export function CoverThumbnail(mediaId, type) {
  return `${Config.t_NHENTAI + mediaId}/cover.${JPGorPNG(type)}`
}

export function PageThumbnail(mediaId, index, type) {
  return `${Config.t_NHENTAI + mediaId}/${index}t.${JPGorPNG(type)}`
}

export function FullImage(mediaId, index, type) {
  return `${Config.i_NHENTAI + mediaId}/${index}.${JPGorPNG(type)}`
}