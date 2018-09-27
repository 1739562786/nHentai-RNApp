import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import styles from './styles'
import WhiteText from '../WhiteText'
import { Metrics } from '../../Themes'

export default class HomePageItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }

  constructor(props) {
    super(props);
    let time = moment.unix(this.props.item.uploadDate)
    this.state = {
      uri: `https://t.nhentai.net/galleries/${this.props.item.mediaId}/thumb.${this.props.item.images.thumbnail.t == 'j' ? 'jpg' : 'png'}`,
      english: this.props.item.title.english,
      japanese: this.props.item.title.japanese,
      pages: this.props.item.numPages,
      tags: this.props.item.tags[0].name,
      time: time.format('H:mm:ss D/M/YYYY'),
      tHeight: this.props.item.images.thumbnail.h,
      tWidth: this.props.item.images.thumbnail.w,
      textStyle: {
        paddingHorizontal: 6,
        paddingVertical: 3
      }
    }
  }

  componentDidMount() {
    console.log('Thumb: ', this.state.uri)
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.styles]} onPress={this.props.onPress}>
        <FastImage
          style={[styles.image, { height: Metrics.images.itemWidth * this.state.tHeight / this.state.tWidth }]}
          source={{
            uri: this.state.uri,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <WhiteText text={`English title: ${this.state.english}`} styles={this.state.textStyle} />
        <WhiteText text={`Japanese title: ${this.state.japanese}`} styles={this.state.textStyle} />
        <WhiteText text={`Pages: ${this.state.pages}`} styles={this.state.textStyle} />
        <WhiteText text={`Tags: ${this.state.tags}`} styles={this.state.textStyle} />
        <WhiteText text={`Time: ${this.state.time}`} styles={this.state.textStyle} />
      </TouchableOpacity>
    )
  }
}
