import { StyleSheet, Platform } from 'react-native'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
  },
  photo: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  close: {
    paddingLeft: 20
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: '50%',
    right: '50%',
  },
  headerAbsolutePosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.OS === 'ios' ? 44 : 56,
    zIndex: 100,
    backgroundColor: '#0005',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    paddingRight: 20
  },
  textCenter: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26
  }
})
