
import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Metrics } from '../Themes'

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
  onLoginPressed(){
    this.emailVerify(this.state.email);
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
 }
  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.logoContainer}>
          <Image
          style = {styles.logo}
          source = {require('../../App/chorewheel/Images/ChoreWheelMock.png')} // can change image at any point
          />
        </View>
        <View style = {styles.formContainer}>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email Address</Text>
            <TextInput
              onChangeText = {(text) => this.setState({email: text})}
              ref='email'
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='Email Address' />
          </View>

           <View style={styles.row}>
            <Text style={styles.rowLabel}>Password</Text>
            <TextInput
              onChangeText = {(text) => this.setState({password: text})}
              ref='password'
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry //protect password
              underlineColorAndroid='transparent'
              placeholder='Password' />
          </View>

         <TouchableOpacity style ={styles.buttonContainer} onPress={this.onLoginPressed.bind(this)}>
         <Text style = {styles.buttonText} >LOGIN </Text>
         </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex :1,
    backgroundColor: '#79c605'
  },
  logoContainer: {
    alignSelf: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  formContainer: {
    backgroundColor: Colors.cwalightgreen,
    margin: Metrics.baseMargin,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: '#000000'
  },
  buttonContainer: {
    backgroundColor: Colors.cwadarkgreen,
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000'
  }
})
