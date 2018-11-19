import { HistoryKeyword } from '../Database'
import moment from 'moment'

function loadKeywords() {
  return new Promise((resolve, reject) => {
    HistoryKeyword.onLoaded(() => {
      let data = HistoryKeyword.data()
      resolve(data)
    })
  })
}

function addKeyword(keyword) {
  return new Promise((resolve, reject) => {
    let data = HistoryKeyword.insert({
      keyword: keyword,
      time: moment.now().toString()
    }, save = true)
    resolve(data)
  })
}

function deleteKeyword(keyword) {
  HistoryKeyword.remove(keyword, save = true)
}

export const DatabaseHandler = { loadKeywords, addKeyword, deleteKeyword }
