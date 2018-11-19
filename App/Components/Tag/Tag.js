import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './tagStyles'
import { ApplicationStyles } from '../../Themes'

export default class Tag extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { onPressItem, onPressRemoveKeyword, text } = this.props
    return (
      <LinearGradient colors={['orange', 'red']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.container}>
        <TouchableOpacity onPress={onPressItem}
          style={ApplicationStyles.center}>
          <View>
            <Text style={styles.text}>{text}</Text>
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
