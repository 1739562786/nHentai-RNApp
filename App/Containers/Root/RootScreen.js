import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import NavigationService from 'App/Services/NavigationService'

import HomePageScreen from '../HomePageScreen/HomePage'
import PreviewScreen from '../PreviewScreen/Preview'
import FullImageScreen from '../FullImageScreen/FullImage'

const AppNav = createStackNavigator(
  {
    MainScreen: HomePageScreen,
    PreviewScreen: PreviewScreen,
    FullImageScreen: FullImageScreen
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none'
  }
)

class RootScreen extends Component {
  componentDidMount() {
    console.clear()
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
