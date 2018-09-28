import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.center,
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
