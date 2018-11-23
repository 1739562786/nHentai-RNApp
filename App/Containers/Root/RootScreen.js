import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import NavigationService from 'App/Services/NavigationService'

import HomePageScreen from '../HomePageScreen/HomePage'
import PreviewScreen from '../PreviewScreen/Preview'
import ImageViewerScreen from '../ImageViewer/ImageViewer'

const AppNav = createStackNavigator(
  {
    MainScreen: HomePageScreen,
    PreviewScreen: PreviewScreen,
    ImageViewerScreen: ImageViewerScreen
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none'
  }
)

class RootScreen extends Component {
  componentDidMount() {
    if (__DEV__) {
      console.clear()
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNav
          ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
