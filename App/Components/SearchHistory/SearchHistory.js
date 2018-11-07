import React, { PureComponent } from 'react'
import { View, ScrollView } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../Themes'

export default class SearchHistory extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={ApplicationStyles.mainContainer}>
        <ScrollView></ScrollView>
      </View>
    )
  }
}
