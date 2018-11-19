import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  loadSearchHistory: null,
  saveSearchHistory: ['keywords'],
  addSearchHistoryItem: ['keyword'],
  deleteSearchHistoryItem: null,
  cleanSearchHistory: null
})

export const SearchHistoryTypes = Types
export default Creators
