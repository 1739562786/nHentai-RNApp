import { HistoryKeyword } from '../Database'
import moment from 'moment'

function loadKeywords() {
  HistoryKeyword.onLoaded(() => {
    let data = HistoryKeyword.data()
    return data
  })
}

function addKeyword(keyword) {
  HistoryKeyword.insert({
    keyword: keyword,
    time: moment.now().toString()
  }, save = true)
}

function deleteKeyword(keyword) {
  HistoryKeyword.remove(keyword, save = true)
}

export const DatabaseHandler = { loadKeywords, addKeyword, deleteKeyword }
