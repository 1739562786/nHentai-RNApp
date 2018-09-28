import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from 'App/Themes'

export default StyleSheet.create({
  ...ApplicationStyles,
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    backgroundColor: 'white',
  },
})
