import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Types from './Types'

/* ------------- Types and Action Creators ------------- */
const { Creators } = createActions({
  getSearch: ['content', 'pageNum'],
  getBookDetails: ['bookId'],
  getBookRecommend: ['bookId'],
  getTag: ['tag', 'isPopularList', 'pageNum'],
  getHomePage: ['pageNum']
})

export const nHentaiMainTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  content: null,
  pageNum: null,
  bookId: null,
  tag: null,
  isPopularList: null,
})

/* ------------- Selectors ------------- */
export const nHentaiMainSelectors = {
  selectContent: state => state.nHentaiMain.content,
  selectPageNum: state => state.nHentaiMain.pageNum,
  selectBookId: state => state.nHentaiMain.bookId,
  selectTag: state => state.nHentaiMain.tag,
  selectIsPopularList: state => state.nHentaiMain.isPopularList,
}

/* ------------- Reducers ------------- */
export const search = (state, { content, pageNum }) =>
  state.merge({ content, pageNum })

export const bookDetails = (state, { bookId }) =>
  state.merge({ bookId })

export const bookRecommend = (state, { bookId }) =>
  state.merge({ bookId })

export const tag = (state, { tag, isPopularList, pageNum }) =>
  state.merge({ tag, isPopularList, pageNum })

export const homePage = (state, { pageNum }) =>
  state.merge({ pageNum })

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH]: search,
  [Types.BOOK_DETAILS]: bookDetails,
  [Types.BOOK_RECOMMAND]: bookRecommend,
  [Types.TAG]: tag,
  [Types.HOME_PAGE]: homePage
})
