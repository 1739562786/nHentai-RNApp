import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Gallery from 'react-native-image-gallery';
import WhiteText from '../../Components/WhiteText'
import Loading from '../../Components/Loading'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default class FullImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      images: null,
      index: 0
    }
  }

  componentDidMount() {
    let x = this.props.navigation.getParam('data')
    let i = this.props.navigation.getParam('index')
    this.setState({ images: x, done: true, index: i })
  }

  render() {
    return (
      this.state.done ?
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          images={this.state.images}
          initialPage={this.state.index}
        /> :
        <Loading />
    )
  }
}
