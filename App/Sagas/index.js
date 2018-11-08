import { takeLatest } from 'redux-saga/effects'
import { SearchHistoryTypes } from '../Stores/SearchHistory/Actions'
import { loadSearchHistory, addSearchHistoryItem } from './SearchHistorySaga'

export default function* root() {
  yield [
    takeLatest(SearchHistoryTypes.LOAD_SEARCH_HISTORY, loadSearchHistory),
    takeLatest(SearchHistoryTypes.ADD_SEARCH_HISTORY_ITEM, addSearchHistoryItem)
  ]
}
