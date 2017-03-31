
import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Metrics } from '../Themes'

import Icon from 'react-native-vector-icons/FontAwesome'



export default class RegisterScreen extends React.Component {

  constructor () {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: [],
    }
  }
  onRegisterPressed() {
    this.infoVerify(this.state.email,this.state.password, this.state.password_confirmation);

  }

  infoVerify (email,password, password_confirmation){
    var rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (!rex.test(email)){
       Alert.alert(
        'Error',
        'Please enter a valid email address',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    }
    var rec = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!rec.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain 6 characters, 1 Uppercase, 1 Lowercase, and 1 Number',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    }
    if (password == password_confirmation) {
      console.log ('fine')
    } else {
       Alert.alert(
        'Error',
        'Passwords do not match',
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
      <View style = {styles.formContainer}>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Username</Text>
            <TextInput
              onChangeText={(val) => this.setState({username: val})}
              ref='username'
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid='transparent'
              placeholder='Username' />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Email Address</Text>
            <TextInput
              onChangeText={(val) => this.setState({email: val})}
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
              onChangeText={(val) => this.setState({password: val})}
              ref='password'
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry = {true}//protect password
              underlineColorAndroid='transparent'
              placeholder='Password' />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Confirm Password</Text>
            <TextInput
              onChangeText={(val) => this.setState({password_confirmation: val})}
              ref='password_confirmation'
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry = {true} //protect password
              underlineColorAndroid='transparent'
              placeholder='Re-enter password' />
          </View>

        <TouchableOpacity style ={styles.buttonContainer} onPress={this.onRegisterPressed.bind(this)}>
          <Text style = {styles.buttonText} >REGISTER </Text>
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
