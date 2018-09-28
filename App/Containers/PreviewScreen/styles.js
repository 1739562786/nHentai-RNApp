import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  textEnglish: {
    fontSize: Fonts.size.h5,
    paddingVertical: Metrics.marginVertical
  },
  textJapanese: {
    fontSize: Fonts.size.input,
    paddingVertical: Metrics.marginVertical
  },
  label: {
    fontSize: Fonts.size.medium,
    paddingVertical: Metrics.marginVertical
  },
  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 25,
    marginVertical: 5
  }
})
