import React, { PureComponent } from 'react'
import { FlatList, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import _ from 'lodash'

import { DatabaseHandler } from '../../Utils/DatabaseHandler'
import CoverItem from '../../Components/CoverItem'
import Header from '../../Components/Header'
import { ApplicationStyles, Colors } from '../../Themes'
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

  async _loadHomepage() {
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
    this._loadHomepage()
    DatabaseHandler.loadKeywords().then(res => this.setState({ keywords: res }))
  }

  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) =>
    <CoverItem
      item={item}
      hide={true}
      onPress={this._goToPreview(item)} />

  _keyExtractorForKeyword = (item, index) => item.id

  _renderKeyword = ({ item }) => <Tag text={item.keyword}
    onPressItem={this._onPressKeyword(item)}
    onPressRemoveKeyword={this._removeKeyword(item)} />

  _goToPreview = (item) => () => this.props.navigation.navigate('PreviewScreen', { data: item })

  _loadMore = () => {
    this.setState({ countPage: this.state.countPage + 1, loading: true })
    this._loadHomepage()
  }

  _onSearch = () => {
    let find = this.state.keywords.findIndex(value => value.keyword === this.state.keyword)
    if (this.state.keyword.length !== 0 && find === -1) {
      DatabaseHandler.addKeyword(this.state.keyword).then(res => {
        let data = [res, ...this.state.keywords]
        this.setState({ keywords: data })
      })
    }
  }

  _onResetSearch = () => {
    this.setState({ keyword: '' })
  }

  _onChangeText = (text) => this.setState({ keyword: text })

  _removeKeyword = (item) => () => {
    let d = this.state.keywords.filter(value => value.keyword !== item.keyword)
    this.setState({ keywords: d })
    DatabaseHandler.removeKeyword(item)
  }

  _onPressKeyword = (item) => () => {
    this.setState({ keyword: item.keyword })
  }

  render() {
    return (
      <LinearGradient colors={[Colors.g1, Colors.g2]}
        style={ApplicationStyles.mainContainer}>
        <Header title='nHentai' />
        <View style={[styles.searchBar, ApplicationStyles.center]}>
          <TextInput style={styles.searchInput}
            onChangeText={this._onChangeText}
            onSubmitEditing={this._onSearch}
            placeholder={'Type here...'}
            placeholderTextColor={'#fff7'}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={this.state.keyword} />
          <TouchableOpacity onPress={this._onSearch}
            onLongPress={this._onResetSearch}
            style={styles.searchButton}>
            <Icon name={'ios-search'} size={40} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.keywordView}>
          <FlatList horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.keywords}
            keyExtractor={this._keyExtractorForKeyword}
            renderItem={this._renderKeyword}
            contentContainerStyle={styles.keywordItem}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          numColumns={2}
          initialNumToRender={4}
          style={[ApplicationStyles.mainContainer, styles.coverItem]}
          onEndReached={this._loadMore}
        />
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(HomePageScreen)
