import React, { Component } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scrollview';
import JPGorPNG from '../../Utils/JPGorPNG'
import WhiteText from '../../Components/WhiteText'
import { Button } from 'react-native-elements';
import styles from './styles'
import { Config } from '../../Config'
import FastImage from 'react-native-fast-image';

export default class PreviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      data: null
    }
  }

  componentDidMount() {
    var x = this.props.navigation.getParam('data')
    this.setState({ data: this.props.navigation.getParam('data'), done: true })
  }

  _keyExtractor = (item, index) => index + '';

  _renderItem = ({ item, index }) => (
    <FastImage
      style={{ width: (200 * item.w / item.h) + 3, height: 200 }}
      source={{
        uri: `${Config.t_NHENTAI + this.state.data.mediaId}/${index + 1}t.${JPGorPNG(item.t)}`,
        priority: FastImage.priority.normal
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );

  tagList(key) {
    var filterData = this.state.data.tags.filter((item) => { return item.type == key })
    return filterData.map((item) => {
      return <Button
        key={item.id}
        title={item.name}
        buttonStyle={styles.button} />
    })
  }

  render() {
    return (
      this.state.done ?
        <ParallaxScrollView
          windowHeight={Metrics.screenHeight * 0.45}
          backgroundSource={{ uri: `${Config.t_NHENTAI + this.state.data.mediaId}/cover.${JPGorPNG(this.state.data.images.cover.t)}` }}
          navBarTitle=' '
          navBarTitleColor='white'
          navBarColor='#11111122'
          headerView={<View />}
          leftIcon={{ name: 'md-arrow-round-back', color: 'white', size: 30, type: 'ionicon' }}
          leftIconOnPress={() => this.props.navigation.goBack()}
        >
          <LinearGradient colors={[Colors.g1, Colors.g2]} style={ApplicationStyles.mainContainer}>
            <ScrollView style={styles.container}>
              <View style={{ padding: 20 }}>
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
        <View />
    )
  }
}
