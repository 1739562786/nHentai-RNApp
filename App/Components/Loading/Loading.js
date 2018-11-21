import React, { Component } from 'react'
import { View } from 'react-native'
import Spinkit from 'react-native-spinkit'
import WhiteText from '../WhiteText/WhiteText'
import { ApplicationStyles, Fonts, Metrics } from '../../Themes'

export default class Loading extends Component {
  render() {
    return (
      <View style={[ApplicationStyles.mainContainer, ApplicationStyles.center]}>
        <Spinkit type='WanderingCubes' size={Metrics.icons.xl} color='white' />
        <WhiteText text='Loading...' styles={Fonts.style.h4} />
      </View>
    )
  }
}
