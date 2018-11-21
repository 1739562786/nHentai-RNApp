import React, { Component } from 'react'
import { FlatList, ScrollView, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ParallaxScrollView from 'react-native-parallax-scrollview'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { CoverThumbnail, PageThumbnail, FullImage } from '../../Utils/ImageURL'
import WhiteText from '../../Components/WhiteText/WhiteText'
import Loading from '../../Components/Loading/Loading'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'
import styles from './styles'

export default class PreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      data: null,
      images: null,
      index: 0,
      isImageViewVisible: false
    }
  }

  componentDidMount() {
    var x = this.props.navigation.getParam('data')
    let mediaId = x.mediaId
    var images = x.images.pages.map((item, index) => {
      return {
        uri: FullImage(mediaId, index + 1, item.t),
        width: item.w,
        height: item.h
      }
    })
    this.setState({ data: x, done: true, images: images })
  }

  _keyExtractor = (item, index) => 'page' + index;

  _onPressImage(index) {
    // this.setState({ isImageViewVisible: true, index: index })
    this.props.navigation.navigate('FullImageScreen', { images: this.state.images, index: index })
  }

  _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this._onPressImage(index)}>
      <FastImage
        style={{ width: (200 * item.w / item.h) + 3, height: 200 }}
        source={{
          uri: PageThumbnail(this.state.data.mediaId, index + 1, item.t),
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );

  _onPressTag = (name) => () => {
    this.props.navigation.navigate({
      routeName: 'MainScreen',
      params: {
        search: name
      },
      key: 'MainScreen:' + name
    })
  }

  tagList(key) {
    var filterData = this.state.data.tags.filter((item) => { return item.type == key })
    let list = filterData.map(item =>
      <Button key={item.id} onPress={this._onPressTag(item.name)}
        title={item.name} buttonStyle={styles.button} />)
    return list
  }

  render() {
    let bg = {}
    if (this.state.done) {
      bg = { uri: CoverThumbnail(this.state.data.mediaId, this.state.data.images.cover.t) }
    }
    return (
      this.state.done ?
        <ParallaxScrollView
          windowHeight={Metrics.screenHeight / 2}
          backgroundSource={bg}
          navBarTitle=' '
          navBarTitleColor='white'
          navBarColor='#1112'
          headerView={<View />}
          leftIcon={{ name: 'md-arrow-round-back', color: 'white', size: 30, type: 'ionicon' }}
          leftIconOnPress={() => this.props.navigation.goBack()}
        >
          <LinearGradient colors={[Colors.g1, Colors.g2]} style={ApplicationStyles.mainContainer}>
            <ScrollView style={styles.container}>
              <View style={{ padding: Metrics.marginVertical }}>
                <WhiteText styles={styles.textEnglish} text={this.state.data.title.english} />
                <WhiteText styles={styles.textJapanese} text={this.state.data.title.japanese} />

                <WhiteText styles={styles.label} text='Parodies:' />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {this.tagList('parody')}
                </View>

                <WhiteText styles={styles.label} text='Tags:' />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {this.tagList('tag')}
                </View>

                <WhiteText styles={styles.label} text='Artists:' />
                <View style={{ flexDirection: 'row' }}>
                  {this.tagList('artist')}
                </View>

                <WhiteText styles={styles.label} text='Groups:' />
                <View style={{ flexDirection: 'row' }}>
                  {this.tagList('group')}
                </View>

                <WhiteText styles={styles.label} text='Languages:' />
                <View style={{ flexDirection: 'row' }}>
                  {this.tagList('language')}
                </View>

                <WhiteText styles={styles.label} text='Categories:' />
                <View style={{ flexDirection: 'row' }}>
                  {this.tagList('category')}
                </View>

                <WhiteText styles={styles.label} text={this.state.data.images.pages.length + ' pages'} />

                <View style={{ height: 200 }}>
                  <FlatList
                    horizontal={true}
                    keyExtractor={this._keyExtractor}
                    data={this.state.data.images.pages}
                    renderItem={this._renderItem}
                  />
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </ParallaxScrollView> :
        <Loading />
    )
  }
}
