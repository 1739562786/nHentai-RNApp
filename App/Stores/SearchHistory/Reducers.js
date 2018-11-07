import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SearchHistoryTypes } from './Actions'

export const loadSearchHistory = (state) =>
  state.merge({
    cardListIsLoading: true,
    cardListErrorMessage: '',
  })

export const addSearchHistoryItem = (state, { cardList }) =>
  state.merge({
    cardList: generateNewData(state, cardList),
    cardListIsLoading: false,
    cardListErrorMessage: null,
  })

export const deleteSearchHistoryItem = (state, { errorMessage }) =>
  state.merge({
    cardList: null,
    cardListIsLoading: false,
    cardListErrorMessage: errorMessage,
  })

export const cleanSearchHistory = (state, { errorMessage }) =>
  state.merge({
    cardList: null,
    cardListIsLoading: false,
    cardListErrorMessage: errorMessage,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [SearchHistoryTypes.LOAD_SEARCH_HISTORY]: loadSearchHistory,
  [SearchHistoryTypes.ADD_SEARCH_HISTORY_ITEM]: addSearchHistoryItem,
  [SearchHistoryTypes.DELETE_SEARCH_HISTORY_ITEM]: deleteSearchHistoryItem,
  [SearchHistoryTypes.CLEAN_SEARCH_HISTORY]: cleanSearchHistory,
})
