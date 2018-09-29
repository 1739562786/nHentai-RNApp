import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Flag from 'react-native-flags';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import WhiteText from '../WhiteText'
import { CoverThumbnail } from '../../Utils/ImageURL'
import styles from './styles'
import { Metrics, Colors, ApplicationStyles } from '../../Themes'

export default class CoverItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    hide: PropTypes.bool
  }

  constructor(props) {
    super(props);
    let time = moment.unix(this.props.item.uploadDate)
    this.state = {
      uri: CoverThumbnail(this.props.item.mediaId, this.props.item.images.thumbnail.t),
      english: this.props.item.title.english,
      pages: this.props.item.numPages,
      tags: this.props.item.tags,
      time: time.format('H:mm:ss D/M/YYYY'),
      tHeight: this.props.item.images.thumbnail.h,
      tWidth: this.props.item.images.thumbnail.w
    }
  }

  _findCountry() {
    var x = this.state.tags.find((item) => {
      return item.type == 'language' && item.name != 'translated'
    })
    switch (x.name) {
      case 'english':
        return 'GB'
      case 'japanese':
        return 'JP'
      case 'chinese':
        return 'CN'
      default:
        return 'unknown'
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.styles]} onPress={this.props.onPress}>
        <LinearGradient colors={[Colors.g3, Colors.g4]} style={ApplicationStyles.mainContainer}>
          {!this.props.hide ?
            <TouchableOpacity style={styles.delete} onPress={() => console.log('Press X')}>
              <Icon name='md-close-circle' size={40} color='white' />
            </TouchableOpacity> :
            <View />}
          <FastImage
            style={[styles.image, { height: Metrics.images.itemWidth * this.state.tHeight / this.state.tWidth }]}
            source={{
              uri: this.state.uri,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <WhiteText text={`${this.state.english}`} styles={styles.textStyle} />
          <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
            <Flag code={this._findCountry()} size={32} type='flat' />
            <WhiteText text={`Pages: ${this.state.pages}`} styles={styles.textStyle} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
