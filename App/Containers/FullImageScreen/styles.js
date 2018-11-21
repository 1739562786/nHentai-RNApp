import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 3
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  }
})
