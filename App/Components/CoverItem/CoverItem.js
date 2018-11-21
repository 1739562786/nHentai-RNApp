import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Flag from 'react-native-flags'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { Config } from '../../Config'
import WhiteText from '../WhiteText/WhiteText'
import { CoverThumbnail } from '../../Utils'
import { Metrics, Colors, ApplicationStyles } from '../../Themes'
import styles from './styles'

/**
 * Cover item
 * 
 * Prop:
 * - item: item (required)
 * - onPress: function
 * - styles: style
 * - hide: hide x button
 *
 * @export
 * @class CoverItem
 * @extends {Component}
 */
export default class CoverItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    hide: PropTypes.bool
  }

  static defaultProps = {
    styles: {},
    hide: true
  }

  _findCountry() {
    let x = this.props.item.tags.find(item => item.type === 'language' && item.name !== 'translated')
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
    let { item } = this.props
    let english = item.title.english
    let pages = item.numPages
    let time = moment.unix(item.uploadDate).format('H:mm:ss D/M/YYYY')
    let tHeight = item.images.thumbnail.h
    let tWidth = item.images.thumbnail.w
    var _image = {
      uri: CoverThumbnail(item.mediaId, item.images.thumbnail.t),
      priority: FastImage.priority.normal
    }
    if (Config.hideNSFW) {
      _image = Config.SFWImages[0].i
      tHeight = Config.SFWImages[0].h
      tWidth = Config.SFWImages[0].w
    }
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[styles.container, this.props.styles]}>
        <LinearGradient colors={[Colors.g3, Colors.g4]}
          style={ApplicationStyles.mainContainer}>
          {!this.props.hide &&
            <TouchableOpacity onPress={() => console.log('Press X')}
              style={styles.delete}>
              <Icon name='md-close-circle' size={40} color='white' />
            </TouchableOpacity>}
          <FastImage source={_image}
            style={[styles.image,
            { height: Metrics.images.itemWidth * tHeight / tWidth }]}
            resizeMode={FastImage.resizeMode.contain} />
          <WhiteText text={`${english}`} styles={styles.textStyle} />
          <View style={styles.secondLine}>
            <Flag code={this._findCountry()} size={32} type='flat' />
            <WhiteText text={`Pages: ${pages}`} styles={styles.textStyle} />
          </View>
        </LinearGradient>
      </TouchableOpacity>)
  }
}
