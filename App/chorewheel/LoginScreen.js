
import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import {Actions} from 'react-native-router-flux'

import styles from './Styles/LoginScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class LoginScreen extends React.Component {
  constructor () {
    super();
    this.state = {
      email: "",
      password: "",
      errors: "",
    }
  }

  onLoginPressed = () => {
    this.emailVerify(this.state.email);
  }

  onRegisterPressed = () =>{
    // await AsyncStorage.multiRemove(['UID', 'Group', 'CHORE_LIST']);
    Actions.registerScreen();
  }

  emailVerify(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (!re.test(email)){
       Alert.alert(
        'Error',
        'Please enter a valid email address',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    }
    else{
      //Is true so check database for user
    }
 }
  render(){
    return(
      <View style = {styles.container}>
        <Image source={require('../chorewheel/Images/Login_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Login</Text></View>
        <View style = {styles.content}>
          <View style = {styles.logoContainer}>
            <Image
            style = {styles.logo}
            source = {require('../../App/chorewheel/Images/ChoreWheelMock.png')} // can change image at any point
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email:</Text>
            <TextInput
              style = {styles.textInput}
              onChangeText = {(text) => this.setState({email: text})}
              ref='email'
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='email@example.com' />
          </View>
           <View style={styles.row}>
            <Text style={styles.rowLabel}>Password:</Text>
            <TextInput
              style = {styles.textInput}
              onChangeText = {(text) => this.setState({password: text})}
              ref='password'
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry //protect password
              underlineColorAndroid='transparent'
              placeholder='password' />
          </View>
        <View style = {styles.row}>
          <TouchableOpacity style ={styles.buttonContainer} onPress={this.onLoginPressed}>
            <Text style = {styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.row}>
          <TouchableOpacity style ={styles.buttonContainer} onPress={this.onRegisterPressed}>
            <Text style = {styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
}
