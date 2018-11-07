import { takeLatest } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { SearchHistoryTypes } from '../Stores/SearchHistory/Actions'
import { startup } from './StartupSaga'

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup)
  ]
}
