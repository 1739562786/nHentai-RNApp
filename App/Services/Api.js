/**
 * API list
 * 15/09/18
 */
import apisauce from 'apisauce'

/**
 * nHentaiHome
 * @param {String} baseURL nhentai.net
 */
const nHentaiHome = (baseURL = 'https://nhentai.net/') => {
  const api = apisauce.create({ baseURL, timeout: 10000 })

  /**
   * API get search by keywords
   * @param {String} content keywords
   * @param {Number} pageNum page number
   */
  const getSearchUrl = (content, pageNum) => api.get('api/galleries/search',
    { query: content.replace(" ", "+"), page: pageNum })

  /**
   * API get book details
   * @param {String} bookId book ID
   */
  const getBookDetailsUrl = (bookId) => api.get('api/gallery/' + bookId)

  /**
   * API get book recommend
   * @param {String} bookId book ID
   */
  const getBookRecommendUrl = (bookId) => api.get('api/gallery/' + bookId + '/related')

  /**
   * API get galleries by tag
   * @param {Tag} tag tag
   * @param {Boolean} isPopularList is sort by popular list
   * @param {Number} pageNum page number
   */
  const getTagUrl = (tag, isPopularList, pageNum) => api.get('api/galleries/tagged',
    { tag_id: tag.id, page: pageNum, sort: (isPopularList) ? 'popular' : '' })

  /**
   * API get list at homepage
   * @param {Number} pageNum page number
   */
  const getHomePageUrl = (pageNum) => api.get('api/galleries/all', { page: pageNum })

  return {
    getSearchUrl,
    getBookDetailsUrl,
    getBookRecommendUrl,
    getTagUrl,
    getHomePageUrl
  }
}

/**
 * nHentai_i
 * @param {String} baseURL i.nhentai.net
 */
const nHentai_i = (baseURL = 'https://i.nhentai.net/') => {
  const api = apisauce.create({ baseURL, timeout: 10000 })

  /**
   * API get images by gallery ID
   * @param {String} galleryId gallery ID
   */
  const getGalleryUrl = (galleryId) => api.get('galleries/' + galleryId)

  /**
   * API get picture by gallery ID, page number
   * @param {String} galleryId gallery ID
   * @param {String} pageNum page number
   * @param {String} fileType file type
   */
  const getPictureUrl = (galleryId, pageNum, fileType) => api.get('galleries/' + galleryId + '/' + pageNum + '.' + fileType)

  /**
   * API get origin picture by gallery ID, page number
   * @param {String} galleryId gallery ID
   * @param {String} pageNum page number
   */
  const getOriginPictureUrl = (galleryId, pageNum) => api.get('galleries/' + galleryId + '/' + pageNum + '.jpg')

  return { getGalleryUrl, getPictureUrl, getOriginPictureUrl }
}

/**
 * nHentai_t
 * @param {String} baseURL 
 */
const nHentai_t = (baseURL = 'https://t.nhentai.net/') => {
  const api = apisauce.create({ baseURL, timeout: 10000 })

  /**
   * API get thumbnails by gallery ID
   * @param {String} galleryId gallery ID
   */
  const getThumbGalleryUrl = (galleryId) => api.get('galleries/' + galleryId)

  /**
   * API get thumbnail by gallery ID, pageNum
   * @param {String} galleryId gallery ID
   * @param {String} pageNum page number
   * @param {String} fileType file type
   */
  const getThumbPictureUrl = (galleryId, pageNum, fileType) => api.get('galleries/' + galleryId + '/' + pageNum + 't.' + fileType)

  /**
   * API get cover by gallery ID
   * @param {String} galleryId gallery ID
   */
  const getBigCoverUrl = (galleryId) => api.get('galleries/' + galleryId + '/cover.jpg')

  /**
   * API get book thumbnail by gallery ID
   * @param {String} galleryId gallery ID
   * @param {String} fileType file type
   */
  const getBookThumbUrl = (galleryId, fileType = 'jpg') => api.get('galleries/' + galleryId + '/thumb.' + fileType)

  return {
    getThumbGalleryUrl,
    getThumbPictureUrl,
    getBigCoverUrl
  }
}

export default { nHentaiHome, nHentai_i, nHentai_t }
