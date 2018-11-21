import React, { Component } from 'react'
import { FlatList, ScrollView, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import ParallaxScrollView from 'react-native-parallax-scrollview'

import Loading from '../../Components/Loading/Loading'
import WhiteText from '../../Components/WhiteText/WhiteText'
import { Config } from '../../Config'
import { CoverThumbnail, PageThumbnail, FullImage, randomString } from '../../Utils'
import { Metrics, ApplicationStyles, Colors } from '../../Themes'
import styles from './styles'

const heightList = 200

export default class PreviewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false,
      data: null,
      images: null,
      index: 0,
      isImageViewVisible: false
    }
  }

  componentDidMount() {
    let x = this.props.navigation.getParam('data')
    let mediaId = x.mediaId
    let images = x.images.pages.map((item, index) => ({
      uri: FullImage(mediaId, index + 1, item.t),
      width: item.w,
      height: item.h
    }))
    this.setState({ data: x, done: true, images: images })
  }

  _keyExtractor = (item, index) => 'page' + index

  _onPressImage(index) {
    // this.setState({ isImageViewVisible: true, index: index })
    this.props.navigation.navigate('FullImageScreen', { images: this.state.images, index: index })
  }

  _renderItem = ({ item, index }) => {
    var _image = {
      uri: PageThumbnail(this.state.data.mediaId, index + 1, item.t),
      priority: FastImage.priority.normal
    }
    var _height = item.h
    var _width = item.w
    if (Config.hideNSFW) {
      _image = Config.SFWImages[1].i
      _height = Config.SFWImages[1].h
      _width = Config.SFWImages[1].w
    }
    return <TouchableOpacity onPress={() => this._onPressImage(index)}>
      <FastImage source={_image}
        style={{ width: (heightList * _width / _height) + 3, height: heightList }}
        resizeMode={FastImage.resizeMode.contain} />
    </TouchableOpacity>
  }

  _onPressTag = (name) => () => {
    this.props.navigation.navigate({
      routeName: 'MainScreen',
      params: { search: name },
      key: 'MainScreen:' + name
    })
  }

  _tagList(key) {
    var filterData = this.state.data.tags.filter((item) => { return item.type == key })
    let list = filterData.map(item => {
      let _name = item.name
      if (Config.hideNSFW) _name = randomString()
      return <Button key={item.id} onPress={this._onPressTag(item.name)}
        title={_name} buttonStyle={styles.button} />
    })
    return list
  }

  render() {
    if (!this.state.done) return <Loading />
    var bg = { uri: CoverThumbnail(this.state.data.mediaId, this.state.data.images.cover.t) }
    if (Config.hideNSFW) bg = Config.SFWImages[2].i
    return (
      <ParallaxScrollView
        windowHeight={Metrics.screenHeight / 2}
        backgroundSource={bg}
        navBarTitle=' '
        navBarTitleColor='white'
        navBarColor='#1112'
        headerView={<View />}
        leftIcon={{ name: 'md-arrow-round-back', color: 'white', size: 30, type: 'ionicon' }}
        leftIconOnPress={() => this.props.navigation.goBack()}>
        <LinearGradient colors={[Colors.g1, Colors.g2]} style={ApplicationStyles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style={{ padding: Metrics.marginVertical }}>
              <WhiteText styles={styles.textEnglish} text={this.state.data.title.english} />
              <WhiteText styles={styles.textJapanese} text={this.state.data.title.japanese} />

              <WhiteText styles={styles.label} text='Parodies:' />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {this._tagList('parody')}
              </View>

              <WhiteText styles={styles.label} text='Tags:' />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {this._tagList('tag')}
              </View>

              <WhiteText styles={styles.label} text='Artists:' />
              <View style={{ flexDirection: 'row' }}>
                {this._tagList('artist')}
              </View>

              <WhiteText styles={styles.label} text='Groups:' />
              <View style={{ flexDirection: 'row' }}>
                {this._tagList('group')}
              </View>

              <WhiteText styles={styles.label} text='Languages:' />
              <View style={{ flexDirection: 'row' }}>
                {this._tagList('language')}
              </View>

              <WhiteText styles={styles.label} text='Categories:' />
              <View style={{ flexDirection: 'row' }}>
                {this._tagList('category')}
              </View>

              <WhiteText styles={styles.label} text={this.state.data.images.pages.length + ' pages'} />

              <View style={{ height: heightList, marginBottom: 10 }}>
                <FlatList horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={this._keyExtractor}
                  data={this.state.data.images.pages}
                  renderItem={this._renderItem} />
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ParallaxScrollView>
    )
  }
}
