import React, { Component } from 'react'
import { Text, FlatList } from 'react-native'
import CoverItem from '../../Components/CoverItem';
import Header from '../../Components/Header'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'
import API from '../../Services/Api'
import LinearGradient from 'react-native-linear-gradient';

export default class HomePageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countPage: 1,
      done: false,
      data: []
    }
  }

  async loadHomepage() {
    var nData = await API.nHentaiHome().getHomePageUrl(this.state.countPage);
    var arrayData = nData.data.result.map((item) => {
      return {
        id: item.id,
        images: item.images,
        mediaId: item.media_id,
        numFavorites: item.num_favorites,
        numPages: item.num_pages,
        scanlator: item.scanlator,
        tags: item.tags,
        title: item.title,
        uploadDate: item.upload_date
      }
    })
    var newData = [...this.state.data, ...arrayData]
    this.setState({ data: newData, done: true })
    console.log('HomePageScreen: load done')
  }

  componentDidMount() {
    this.loadHomepage()
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <CoverItem
      item={item}
      hide={true}
      onPress={() => {
        this.props.navigation.navigate('PreviewScreen', { data: item })
      }} />
  );

  _loadMore = () => {
    this.setState({ countPage: this.state.countPage + 1 })
    this.loadHomepage()
  }

  render() {
    return (
      <LinearGradient colors={[Colors.g1, Colors.g2]} style={ApplicationStyles.mainContainer}>
        <Header />
        {!this.state.done ? <Text>Loading</Text> :
          <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            numColumns={2}
            style={[ApplicationStyles.mainContainer, { padding: Metrics.smallMargin }]}
            onEndReached={this._loadMore}
          />
        }
      </LinearGradient>
    )
  }
}
