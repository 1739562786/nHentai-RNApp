import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import SplashScreen from '../SplashScreen/SplashScreen'
import HomePageScreen from '../HomePageScreen'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: HomePageScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

class RootScreen extends Component {
  componentDidMount() {
    this.props.startup()
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNav
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
