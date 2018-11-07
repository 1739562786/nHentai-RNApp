import { AsyncStorage } from 'react-native'
import { put } from 'redux-saga/effects'
import SearchHistoryActions from '../Stores/SearchHistory/Actions'

export function* loadSearchHistory() {
  console.log('loadSearchHistory')
  AsyncStorage.getItem('keywords').then(res => {
    yield put(SearchHistoryActions.loadSearchHistory(res))
  })
}

export function* addSearchHistoryItem(action) {
  console.log('addSearchHistoryItem:', JSON.stringify(action.keyword))
  AsyncStorage.setItem('keywords').then(res => {
    yield put(SearchHistoryActions.addSearchHistoryItem(res))
  })
}

export function* deleteSearchHistoryItem(action) {
  console.log('deleteSearchHistoryItem:', JSON.stringify(action.keyword))
  AsyncStorage.setItem('keywords').then(res => {
    yield put(SearchHistoryActions.deleteSearchHistoryItem(res))
  })
}

export function* cleanSearchHistory() {
  console.log('cleanSearchHistory')
  AsyncStorage.clear().then(res => {
    yield put(SearchHistoryActions.cleanSearchHistory(null))
  })
}
