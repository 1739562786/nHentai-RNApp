import { AsyncStorage } from 'react-native'
import { put, call } from 'redux-saga/effects'
import SearchHistoryActions from '../Stores/SearchHistory/Actions'

async function getSearchHistory() {
  try {
    const value = await AsyncStorage.getItem('keywords')
    if (value !== null) {
      // We have data!!
      var a = JSON.parse(value)
      console.log(a)
      return a
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

async function setSearchHistory(value) {
  try {
    let v = JSON.stringify(value)
    await AsyncStorage.setItem('keywords', v)
  } catch (error) {
    // Error saving data
    console.log(error)
  }
}

export function* loadSearchHistory() {
  console.log('loadSearchHistory')
  let data = yield call(getSearchHistory)
  if (data) {
    yield put(SearchHistoryActions.saveSearchHistory(data))
  } else {
    yield put(SearchHistoryActions.saveSearchHistory([]))
  }
}

export function* addSearchHistoryItem(action) {
  console.log('addSearchHistoryItem:', action.keyword)
  yield call(setSearchHistory, action.keyword)
  yield put(SearchHistoryActions.saveSearchHistory(action.keyword))
}

export function* deleteSearchHistoryItem(action) {
  console.log('deleteSearchHistoryItem:')
  let data = setSearchHistory('')
  yield put(SearchHistoryActions.saveSearchHistory(data))
}

export function* cleanSearchHistory() {
  console.log('cleanSearchHistory')
  AsyncStorage.clear().then(res => { })
  yield put(SearchHistoryActions.cleanSearchHistory())
}
