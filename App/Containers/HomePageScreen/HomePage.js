import React, { PureComponent } from 'react'
import { FlatList, View, TextInput, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Spinkit from 'react-native-spinkit'
import { connect } from 'react-redux'
import _ from 'lodash'

import { DatabaseHandler } from '../../Utils/DatabaseHandler'
import CoverItem from '../../Components/CoverItem'
import Header from '../../Components/Header'
import { Metrics, ApplicationStyles, Colors } from '../../Themes'
import styles from './styles'
import API from '../../Services/Api'
import Tag from '../../Components/Tag/Tag'

class HomePageScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countPage: 1,
      loading: true,
      data: [],
      keyword: '',
      keywords: []
    }
    this._loadMore = _.debounce(this._loadMore, 1000)
  }

  async loadHomepage() {
    console.log('Load page', this.state.countPage)
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
    this.setState({ data: newData, loading: false })
  }

  componentDidMount() {
    this.loadHomepage()
    DatabaseHandler.loadKeywords().then(res => this.setState({ keywords: res }))
  }

  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) =>
    <CoverItem
      item={item}
      hide={true}
      onPress={this.goToPreview(item)} />

  _keyExtractorForKeyword = (item, index) => item.id

  _renderKeyword = ({ item }) => <Tag text={item.keyword}
    onPress={this._onPressKeyword(item)}
    onPressRemoveKeyword={this._removeKeyword(item)} />

  goToPreview = (item) => () => this.props.navigation.navigate('PreviewScreen', { data: item })

  _loadMore = () => {
    this.setState({ countPage: this.state.countPage + 1, loading: true })
    this.loadHomepage()
  }

  renderFooter = () => this.state.loading &&
    <View style={[ApplicationStyles.center, { margin: 10 }]}>
      <Spinkit type='WanderingCubes' size={30} color='white' />
    </View>

  _onSearch = () => {
    if (this.state.keyword.length !== 0 && _.indexOf(this.state.keywords, this.state.keyword) === -1) {
      DatabaseHandler.addKeyword(this.state.keyword).then(res => {
        let data = [...this.state.keywords, res]
        this.setState({ keywords: data })
      })
    }
  }

  _onChangeText = (text) => this.setState({ keyword: text })

  _removeKeyword = (item) => { }

  _onPressKeyword = (item) => { }

  render() {
    return (
      <LinearGradient colors={[Colors.g1, Colors.g2]}
        style={ApplicationStyles.mainContainer}>
        <Header title='nHentai' />
        <TextInput style={styles.searchInput}
          onChangeText={this._onChangeText}
          onSubmitEditing={this._onSearch}
          placeholder={'Type here...'}
          value={this.state.keyword} />
        <FlatList
          horizontal
          data={this.state.keywords.reverse()}
          keyExtractor={this._keyExtractorForKeyword}
          renderItem={this._renderKeyword}
          style={{ height: 20 }}
        />
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={2}
          initialNumToRender={4}
          style={[ApplicationStyles.mainContainer, { padding: Metrics.smallMargin }]}
          onEndReached={this._loadMore}
          ListFooterComponent={this.renderFooter}
        />
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen)
