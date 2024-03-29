import React, { PropTypes } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'

import styles from './Styles/LargeRoundedButtonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class LargeRoundedButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    icon: PropTypes.string,
    size: PropTypes.number,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText
  }

  render () {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Icon name = {this.props.icon} size ={this.props.size} color='black' style = {styles.ico} />
        </TouchableOpacity>
      </View>
    )
  }
}
