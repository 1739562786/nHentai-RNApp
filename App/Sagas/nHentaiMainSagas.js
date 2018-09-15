import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import nHentaiMainActions from '../Redux/nHentaiMainRedux'

export function* getSearch(api, action) {
  const { content, pageNum } = action
  // make the call to the api
  const response = yield call(api.getSearchUrl(content, pageNum))

  if (response.ok) {
    const firstUser = path(['data', 'items'], response)[0]
    const avatar = firstUser.avatar_url
    // do data conversion here if needed
    yield put(nHentaiMainActions.userSuccess(avatar))
  } else {
    yield put(nHentaiMainActions.userFailure())
  }
}

export function* getBookDetails(api, action) {
  const { bookId } = action

  const response = yield call(api.getBookDetails(bookId))

  if (response.ok) {
    //TODO
  }
}