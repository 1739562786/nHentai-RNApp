import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SearchHistoryTypes } from './Actions'

export const saveSearchHistory = (state, { keywords }) => {
  return keywords
}

export const deleteSearchHistoryItem = (state, { keywords }) => {
  return keywords
}

export const cleanSearchHistory = (state) => {
  return []
}

export const reducer = createReducer(INITIAL_STATE, {
  [SearchHistoryTypes.SAVE_SEARCH_HISTORY]: saveSearchHistory,
  [SearchHistoryTypes.DELETE_SEARCH_HISTORY_ITEM]: deleteSearchHistoryItem,
  [SearchHistoryTypes.CLEAN_SEARCH_HISTORY]: cleanSearchHistory,
})
