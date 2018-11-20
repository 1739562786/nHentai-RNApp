import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts } from '../../Themes'

export default StyleSheet.create({
  header: {
    ...ApplicationStyles.center,
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    flexDirection: 'row'
  },
  headerText: {
    fontSize: Fonts.size.h4,
    fontWeight: 'bold'
  },
  leftHeader: {
    flex: 1
  },
  centerHeader: {
    flex: 5
  },
  rightHeader: {
    flex: 1
  },
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
