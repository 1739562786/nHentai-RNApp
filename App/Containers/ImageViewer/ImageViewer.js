import React from 'react'
import { View, Text } from 'react-native'
import Gallery from 'react-native-image-gallery'
import Icon from 'react-native-vector-icons/Ionicons'
import { Config } from '../../Config'
import styles from './styles'

export default class ImageViewerScreen extends React.Component {
  constructor(props) {
    super(props)
    const { images, index } = this.props.navigation.state.params
    this.state = {
      loading: true,
      index: index,
      images: images.map((image, index) => {
        if (Config.hideNSFW) {
          return ({
            source: Config.SFWImage[index % 10].i,
            dimensions: {
              width: Config.SFWImage[index % 10].w,
              height: Config.SFWImage[index % 10].h
            }
          })
        }
        return {
          source: { uri: image.uri },
          dimensions: { width: image.w, height: image.h }
        }
      }),
      hideHeader: true,
    };
  }

  _handleOnPressImage = () => {
    this.setState(prevState => ({
      hideHeader: !prevState.hideHeader,
    }));
  };

  _onChangeImage = (index) => this.setState({ index })

  header() {
    const { index, images } = this.state
    return (
      <View style={styles.headerAbsolutePosition}>
        <Icon name={'ios-close'} size={40} color={'white'}
          onPress={() => this.props.navigation.goBack()}
          style={styles.close} />
        <Text style={styles.text}>
          {`${index + 1}/${images.length}`}
        </Text>
      </View>)
  }

  error = () => <View style={styles.loaderContainer}>
    <Icon name={'ios-close-circle-outline'} color={'red'} size={60} />
    <Text style={styles.textCenter}>This image cannot be displayed</Text>
  </View>

  render() {
    const { index } = this.props.navigation.state.params
    let { images, hideHeader } = this.state;
    return (
      <View style={styles.container}>
        <Gallery images={images} pageMargin={10}
          style={styles.container} initialPage={index}
          onPageSelected={this._onChangeImage}
          errorComponent={this.error}
          onSingleTapConfirmed={this._handleOnPressImage} />
        {hideHeader || this.header()}
      </View>
    )
  }
}
