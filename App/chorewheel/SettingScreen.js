import React from 'react'
import { View, Modal, Text, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import RoundedButton from '../../App/Components/myRoundedButton'

import { Actions, ActionConst } from 'react-native-router-flux'
import styles from './Styles/SettingScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SettingScreen extends React.Component {
  onLogoutPress = async () => {
    await AsyncStorage.multiRemove(['UID', 'Group', 'CHORE_LIST']);
    Actions.loginScreen({type: ActionConst.RESET});
  }

  render () {
      return (
        <View style={{height: '100%'}}>
          <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
          <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Settings</Text></View>
          <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
          }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        <View style={styles.settingList}>
          <RoundedButton onPress={this.onLogoutPress}>
            Logout
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Group Settings
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Chore List Settings
          </RoundedButton>
          </View>
        </View>
      )
  }
}
