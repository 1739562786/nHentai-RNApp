import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import { Metrics } from '../../Themes/'

export default class FullImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.navigation.getParam('images'),
      index: this.props.navigation.getParam('index')
    }
  }

  _keyExtractor = (item, index) => 'page' + index;

  _renderItem = ({ item, index }) => (
    <View style={{ width: Metrics.screenWidth, height: Metrics.screenHeight }}>
      <FastImage
        style={{ width: Metrics.screenWidth, height: Metrics.screenHeight }}
        source={{
          uri: item.uri,
          priority: FastImage.priority.high
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Icon name='md-arrow-round-back' color='white' size={30} type='ionicon'
          onPress={() => this.props.navigation.goBack()}
          underlayColor='transparent'
          containerStyle={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 3
          }} />
        <FlatList
          horizontal
          pagingEnabled
          keyExtractor={this._keyExtractor}
          data={this.state.images}
          renderItem={this._renderItem}
          style={{ flex: 1, backgroundColor: 'black' }}
        />
      </View>
    )
  }
}
