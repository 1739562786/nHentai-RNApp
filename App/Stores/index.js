import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'

export default () => {
  const rootReducer = combineReducers({})
  return configureStore(rootReducer, rootSaga)
}
