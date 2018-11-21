import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.itemColor,
    width: Metrics.images.itemWidth,
    margin: Metrics.smallMargin
  },
  image: {
    width: Metrics.images.itemWidth
  },
  delete: {
    position: 'absolute',
    right: 0,
    top: -5,
    zIndex: 2
  },
  textStyle: {
    paddingHorizontal: 6,
    paddingVertical: 3
  },
  secondLine: {
    flexDirection: 'row',
    paddingLeft: 10
  }
})
