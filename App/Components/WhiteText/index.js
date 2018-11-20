import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

/**
 * White text
 *
 * Prop:
 * - text: Text to display
 * - styles: Style for text
 * 
 * @export
 * @class WhiteText
 * @extends {Component}
 */
export default class WhiteText extends Component {
  static propTypes = {
    text: PropTypes.string,
    styles: PropTypes.object
  }

  render() {
    return <Text style={[{ color: 'white' }, this.props.styles]}>{this.props.text}</Text>
  }
}
