import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

import { getKeywords } from '../../Stores/SearchHistory/Selectors'
import SearchHistoryActions from '../../Stores/SearchHistory/Actions'

class MySearchBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  _onChangeText = (text) => this.setState({ keyword: text })
  _onClearText = () => this.setState({ keyword: '' })

  _onSearch = () => {
    let keywords = this.props.keywords
    if (this.state.keyword.length !== 0) {
      if (!keywords.find((value, index) => value === this.state.keyword)) {
        keywords.push(this.state.keyword)
        this.props.addSearchHistoryItem(keywords)
      }
    }
  }

  render() {
    return (
      <View>
        <SearchBar
          onChangeText={this._onChangeText}
          onClearText={this._onClearText}
          onSubmitEditing={this._onSearch}
          placeholder={this.props.placeholder} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  keywords: getKeywords(state)
})

const mapDispatchToProps = (dispatch) => ({
  addSearchHistoryItem: (keyword) => dispatch(SearchHistoryActions.addSearchHistoryItem(keyword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MySearchBar)
