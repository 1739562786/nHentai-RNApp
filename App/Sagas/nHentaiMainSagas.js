import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import nHentaiMainActions from '../Redux/nHentaiMainRedux'

export function* getSearch(api, action) {
  const { content, pageNum } = action
  // make the call to the api
  const response = yield call(api.getSearchUrl(content, pageNum))

  if (response.ok) {
    //TODO
  }
}

export function* getBookDetails(api, action) {
  const { bookId } = action

  const response = yield call(api.getBookDetails(bookId))

  if (response.ok) {
    //TODO
  }
}