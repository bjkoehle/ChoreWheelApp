import React from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import HomeScreenButton from './HomeScreenButton'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './Styles/HomeScreenStyles'

export default class HomeSCreen extends React.Component {
  render(){
    return(
      <View style = {{flex: 1}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Welcome!</Text></View>
        <View style = {styles.default}>
          <HomeScreenButton />
          <Text style = {{fontSize:24}}>Group Name</Text>
          <Image source= {require('./Images/ChoreWheelMock.png')} style = {styles.circleImg} resizeMode='contain' />
        </View>
      </View>
    )
  }
}
//<Image source={require('./Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
