import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.center,
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth
  },
  text: {
    fontSize: Fonts.size.h4,
    fontWeight: 'bold'
  }
})
