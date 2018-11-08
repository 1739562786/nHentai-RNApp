import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import SearchHistoryActions from '../../Stores/SearchHistory/Actions'

import HomePageScreen from '../HomePageScreen/HomePage'
import PreviewScreen from '../PreviewScreen/Preview'
import FullImageScreen from '../FullImageScreen/FullImage'
import SearchScreen from '../SearchScreen/Search'

const AppNav = createStackNavigator(
  {
    MainScreen: HomePageScreen,
    PreviewScreen: PreviewScreen,
    FullImageScreen: FullImageScreen,
    SearchScreen: SearchScreen
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  }
)

class RootScreen extends Component {
  componentDidMount() {
    this.props.loadSearchHistory()
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
  loadSearchHistory: () => dispatch(SearchHistoryActions.loadSearchHistory()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
