import { HistoryKeyword } from '../Database'
import moment from 'moment'

function loadKeywords() {
  return new Promise((resolve, reject) => {
    HistoryKeyword.onLoaded(() => {
      let data = [...HistoryKeyword.data()]
      data.sort((a, b) => {
        let timeA = moment(a.time, 'x')
        let timeB = moment(b.time, 'x')
        return timeA.isBefore(timeB)
      })
      resolve(data)
    })
  })
}

function addKeyword(keyword) {
  return new Promise((resolve, reject) => {
    let find = HistoryKeyword.get({ keyword: keyword })
    var data = null
    if (find === undefined) {
      data = HistoryKeyword.insert({
        keyword: keyword,
        time: moment.now().toString()
      }, save = true)[0]
    } else {
      data = HistoryKeyword.update(find.id, { time: moment.now().toString() }, save = true)
    }
    HistoryKeyword.onInsert(() => resolve(data))
  })
}

function removeKeyword(keyword) {
  HistoryKeyword.remove(keyword, save = true)
}

export const DatabaseHandler = { loadKeywords, addKeyword, removeKeyword }
