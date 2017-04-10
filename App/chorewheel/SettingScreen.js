import React from 'react'
import { View, Modal, Text, Image, Button, TouchableOpacity } from 'react-native'
import RoundedButton from '../../App/Components/myRoundedButton'

import { Actions } from 'react-native-router-flux'
import styles from './Styles/SettingScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SettingScreen extends React.Component {
  onPress(){
    Alert.alert('pressed');
  }

  render () {
      return (
        <View style={{margin: '5%'}}>
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
        <View style={{margin: '16%'}}>
          <RoundedButton onPress={this._onPress}>
            Profile
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Color Scheme
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Home Page Theme
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Group Settings
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Chore List Settings
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            TBD
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            TBD
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            TBD
          </RoundedButton>
          </View>
        </View>
      )
  }
}
