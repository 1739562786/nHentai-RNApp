import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  loadSearchHistory: ['keywords'],
  addSearchHistoryItem: ['keywords'],
  deleteSearchHistoryItem: ['keywords'],
  cleanSearchHistory: null
})

export const SearchHistoryTypes = Types
export default Creators
