import React from 'react'
import { View, Platform, Text } from 'react-native'
import PhotoView from 'react-native-photo-view'
import Spinner from 'react-native-spinkit'
import { TabView, PagerScroll, PagerPan } from 'react-native-tab-view'
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
      images: images.map(image => ({
        url: image,
        loading: true,
      })),
      routes: images.map((image, index) => ({ key: index + 'image' })),
      hideHeader: true,
    };
  }

  renderPager = props =>
    Platform.OS === 'ios'
      ? <PagerScroll {...props} />
      : <PagerPan {...props} />;

  renderScene = ({ route }) => {
    const { index, routes, images } = this.state
    if (Math.abs(index - routes.indexOf(route)) > 2) {
      return null;
    }
    const image = Config.hideNSFW ? Config.SFWImages[index % 10].i : images[index].url.uri;
    const loading = images[index].loading;
    return (
      <View key={image} style={styles.slide}>
        {loading &&
          <View style={styles.loaderContainer}>
            <Spinner type="ThreeBounce" color={'#fff'} />
          </View>}
        <PhotoView
          source={Config.hideNSFW ? image : { uri: image }}
          resizeMode="contain"
          androidScaleType="fitCenter"
          minimumZoomScale={1}
          maximumZoomScale={3}
          style={styles.photo}
          onTap={this.handleOnPressImage}
          onLoad={this.handleOnImageLoaded(image)}
          onViewTap={this.handleOnPressImage} />
      </View>
    );
  };

  handleChangeTab = index => this.setState({ index });

  handleOnPressImage = () => {
    this.setState(prevState => ({
      hideHeader: !prevState.hideHeader,
    }));
  };

  handleOnImageLoaded = imageUrl => () => {
    this.setState(({ images }) => ({
      images: images.map(
        image =>
          image.uri === imageUrl ? { ...image, loading: false } : image,
      ),
    }));
  };

  render() {
    let { images, index, hideHeader } = this.state;
    return (
      <View style={styles.container}>
        {hideHeader ||
          <View style={styles.headerAbsolutePosition}>
            <Icon name={'ios-close'} size={40} color={'white'}
              onPress={() => this.props.navigation.goBack()}
              style={styles.close} />
            <Text style={styles.text}>
              {images.length > 1 ? `${index + 1}/${images.length}` : null}
            </Text>
          </View>}
        <TabView
          renderTabBar={() => <View />}
          style={styles.slide}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderPager={this.renderPager}
          onIndexChange={this.handleChangeTab} />
      </View>
    )
  }
}
