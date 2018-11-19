import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  searchInput: {
    width: '80%',
    backgroundColor: '#909090',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    color: 'white'
  },
  searchBar: {
    flexDirection: 'row',
    height: 60
  },
  searchButton: {
    width: '7%',
    marginLeft: 10
  },
  keywordView: {
    height: 50,
    marginBottom: 5
  },
  keywordItem: {
    alignItems: 'center'
  },
  coverItem: {
    padding: Metrics.smallMargin
  }
})
