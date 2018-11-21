import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements'
import FastImage from 'react-native-fast-image'

import { Config } from '../../Config'
import styles from './styles'

export default class FullImageScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: this.props.navigation.getParam('images'),
      index: this.props.navigation.getParam('index')
    }
  }

  _keyExtractor = (item, index) => 'page' + index

  _renderItem = ({ item, index }) => {
    var _img = {
      uri: item.uri,
      priority: FastImage.priority.high
    }
    if (Config.hideNSFW) {
      _img = Config.SFWImages[index % 10].i
    }
    return (
      <View style={styles.image}>
        <FastImage source={_img}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name='md-arrow-round-back' color='white' size={30}
          type='ionicon' underlayColor='transparent'
          onPress={() => this.props.navigation.goBack()}
          containerStyle={styles.backIcon} />
        <FlatList horizontal pagingEnabled
          keyExtractor={this._keyExtractor}
          data={this.state.images}
          renderItem={this._renderItem}
          style={styles.container} />
      </View>
    )
  }
}
