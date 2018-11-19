import { HistoryKeyword } from '../Database'
import moment from 'moment'

function loadKeywords() {
  return new Promise((resolve, reject) => {
    HistoryKeyword.onLoaded(() => {
      let data = HistoryKeyword.data()
      resolve(data.reverse())
    })
  })
}

function addKeyword(keyword) {
  return new Promise((resolve, reject) => {
    let data = HistoryKeyword.insert({
      keyword: keyword,
      time: moment.now().toString()
    }, save = true)[0]
    resolve(data)
  })
}

function removeKeyword(keyword) {
  HistoryKeyword.remove(keyword, save = true)
}

export const DatabaseHandler = { loadKeywords, addKeyword, removeKeyword }
