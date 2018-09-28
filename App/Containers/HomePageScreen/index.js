import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import HomePageItem from '../../Components/HomePageItem';
import Header from '../../Components/Header'
import { Metrics, ApplicationStyles } from '../../Themes/'
import API from '../../Services/Api'

export default class HomePageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      done: false,
      data: []
    }
  }

  async loadHomepage(pageNum) {
    var nData = await API.nHentaiHome().getHomePageUrl(pageNum);
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
    this.setState({ data: arrayData, done: true })
  }

  componentDidMount() {
    this.loadHomepage(1)
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <HomePageItem item={item} />
  );

  render() {
    return (
      <View style={ApplicationStyles.mainContainer}>
        <Header />
        {!this.state.done ? <Text>Loading</Text> :
          <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            numColumns={2}
            style={[ApplicationStyles.mainContainer, { padding: Metrics.smallMargin }]}
          />
        }
      </View>
    )
  }
}
