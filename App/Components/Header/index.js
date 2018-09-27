import React, { Component } from 'react'
import { View } from 'react-native'
import WhiteText from '../WhiteText'
import styles from './styles'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WhiteText text='nHentai' styles={styles.text} />
      </View>
    )
  }
}
