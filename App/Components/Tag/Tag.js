import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'

import { randomString } from '../../Utils'
import { Config } from '../../Config'
import { ApplicationStyles } from '../../Themes'
import styles from './tagStyles'

export default class Tag extends PureComponent {
  render() {
    const { onPressItem, onPressRemoveKeyword, text } = this.props
    let _text = text
    if (Config.hideNSFW) _text = randomString()
    return (
      <LinearGradient colors={['orange', 'red']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.container}>
        <TouchableOpacity onPress={onPressItem}
          style={ApplicationStyles.center}>
          <View>
            <Text style={styles.text}>{_text}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRemoveKeyword}
          style={[styles.delete, ApplicationStyles.center]}>
          <Icon name='ios-close' size={30} color='white' />
        </TouchableOpacity>
      </LinearGradient>
    )
  }
}
