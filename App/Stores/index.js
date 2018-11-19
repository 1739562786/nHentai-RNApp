import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as SearchHistoryReducer } from './SearchHistory/Reducers'

export default () => {
  const rootReducer = combineReducers({ searchHistory: SearchHistoryReducer })
  return configureStore(rootReducer, rootSaga)
}
