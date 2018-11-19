import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './tagStyles'

export default class Tag extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { onPressItem, onPressRemoveKeyword, text } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPressItem}>
          <View>
            <Text style={styles.text}>{text}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRemoveKeyword}>
          <Icon name='ios-close' size={20} color='blue' />
        </TouchableOpacity>
      </View>
    )
  }
}
