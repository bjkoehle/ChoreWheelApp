import React, {PropTypes} from 'react'
import { Text, ListView, View, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/GroupUserStyles'

export default class GroupUser extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.object
  }

  render() {
    return (
      <View style = {styles.userRow}>
        <Icon style = {styles.userIcon} name = 'user-circle-o' size = {60} />
        <View style = {styles.userText}>
          <Text style = {styles.userName}>
            {this.props.data.username}
          </Text>
          <Text style = {styles.email}>
            {this.props.data.email}
          </Text>
        </View>
      </View>
    )
  }
}
