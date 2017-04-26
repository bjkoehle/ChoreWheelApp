import React from 'react'
import { Text, Image, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import HomeScreenButton from './HomeScreenButton'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './Styles/HomeScreenStyles'

export default class HomeSCreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {groupName: ''};
  }

  componentWillMount(){
    AsyncStorage.getItem('Group').then((result)=>{this.setState({groupName: JSON.parse(result).name})}).catch((error)=>{console.log(error)});
  }

  render(){
    return(
      <View style = {{flex:1}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Welcome!</Text></View>
        <View style = {styles.default}>
          <HomeScreenButton />
          <Text style = {{fontSize:24}}>{this.state.groupName}</Text>
          <Image source= {require('./Images/ChoreWheelMock.png')} style = {styles.circleImg} resizeMode='contain' />
        </View>
      </View>
    )
  }
}
//<Image source={require('./Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
