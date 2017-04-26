
import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import { login, getGroup } from '../Services/ChoreWheelApi'
import base64 from 'base-64'
import Modal from 'react-native-modalbox'
import DropdownAlert from 'react-native-dropdownalert'
import * as Progress from 'react-native-progress'

import styles from './Styles/RegisterScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Metrics} from '../Themes'


export default class LoginScreen extends React.Component {
  constructor () {
    super();
    this.success = null;
    this.state = {
      email: '',
      password: '',
      waiting: false,
      errors: {number: null, message: ''},
    }
  }

  toggleLoader = (tf) =>{
    this.setState({waiting: tf});
  }

  onLoginPressed = () => {
    let verify = this.emailVerify(this.state.email);
    if(verify === true){
      this.toggleLoader(true);
      let credentials = {email: this.state.email, password: this.state.password};
      login(credentials)
      .then((result)=>{
        if(result.ok === true) { //Check status for if user exists?
          let auth = base64.encode(this.state.email +':'+ this.state.password);
          AsyncStorage.setItem('Auth', auth).catch((error)=>{this.setState({errors:{number:0,message:'Error setting Auth'+error}}),this.showAlert('error'),console.error()});
          AsyncStorage.setItem('UID', result._bodyText).catch((error)=>{this.setState({errors:{number:1,message:'Error setting User'+error}}),this.showAlert('error'),console.error()});
          if(JSON.parse(result._bodyText).groupId === 0){
            AsyncStorage.getItem('Group')
            .then((response)=>{
              if(response !== null){ //Default group so everything is in local storage
                moveToHomePage = this.moveToHomePage;
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false)},500);
                setTimeout(()=>Actions.homeScreen({type: ActionConst.REPLACE}),1000);
              }
              else{ //Something missing in local storage
                this.setState({errors: {number: 0, message: 'Error loading data, resetting... please log in again'}});
                let default_list = [{id: 1, choreName: 'Example chores', choreTime: 'Time Frame appears here', done: true, userName: JSON.parse(result._bodyText).username, userId: JSON.parse(result._bodyText).id, groupId: 0},
                              {id: 2, choreName: 'Put away dishes', choreTime: 'Daily', done: false, userName: JSON.parse(result._bodyText).username, userId: JSON.parse(result._bodyText).id, groupId: 0},
                              {id: 3, choreName: 'Vaccum living-room', choreTime: 'Weekly', done: false, userName: JSON.parse(result._bodyText).username, userId: JSON.parse(result._bodyText).id, groupId: 0}];
                let default_group = {Group_ID: 0, Group_Name: 'Default', user_list: [JSON.parse(result._bodyText)], chore_list: default_list};
                AsyncStorage.setItem('Group', JSON.stringify(default_group));
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
              }
            })
            .catch((error)=>{
              this.setState({errors: {number: 999, message: error}})
              showAlert = this.showAlert;
              toggleLoader = this.toggleLoader;
              setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
            });
          }
          else{ //Not default group
            getGroup(JSON.parse(result._bodyText).groupId,auth)//group id
            .then((response) => {
              if(response.ok === true) {
                AsyncStorage.setItem('Group', response._bodyText);
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false)},500);
                setTimeout(()=>Actions.homeScreen({type: ActionConst.REPLACE}),1000);
              }
              else {  //Group doesnt exist?
                let errMsg = '';
                if(result.status === 401){errMsg = 'Error retriving group.'}
                else{errMsg = result._bodyText}
                this.setState({errors: {number: result.status, message: errMsg}});
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
              }
            })
            .catch((error)=>{ //error in getting group
              this.setState({errors: {number: 999, message: error}})
              showAlert = this.showAlert;
              toggleLoader = this.toggleLoader;
              setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
            });
          }
        }
        else {// error in getting user
          let errMsg = '';
          if(result.status === 401){errMsg = 'Invalid Email/Password'}
          else{errMsg = result._bodyText}
          this.setState({errors: {number: result.status, message: errMsg}});
          showAlert = this.showAlert;
          toggleLoader = this.toggleLoader;
          setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
        }
      })
      .catch((error)=>{ //Error in login sent to server
        this.setState({errors: {number: 999, message: error}});
        showAlert = this.showAlert;
        toggleLoader = this.toggleLoader;
        setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
      });
    }
    else{ //Invalid email reset password
      this.setState({...this.state, password: ''});
    }
  }

  onRegisterPressed = () =>{
    Actions.registerScreen();
  }

  emailVerify(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (!re.test(email)){
       Alert.alert(
        'Error',
        'Please enter a valid email address',
        [
          {text: 'OK'},
        ],
        { cancelable: true }
      );
      return false;
    }
    else{
      return true;
    }
  }

  showAlert = (type) => {
    switch (type) {
      case 'info':
        this.dropdown.alertWithType(type, 'Info #'+ this.state.errors.number, this.state.errors.message);
        break;
      case 'warn':
        this.dropdown.alertWithType(type, 'Warning #'+ this.state.errors.number, this.state.errors.message);
        break;
      case 'error':
        this.dropdown.alertWithType(type, 'Error #'+ this.state.errors.number, this.state.errors.message);
        break;
      case 'success':
        this.dropdown.alertWithType(type, 'Success', 'Successfully logged into ChoreWheelApp!\n\n\n');
      case 'custom':
        this.dropdown.alert('');
        break;
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
              keyboardType='email-address'
              returnKeyType='done'
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
              returnKeyType='done'
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
        <Modal
          backdropPressToClose = {false}
          swipeToClose = {false}
          backButtonClose = {true}
          style = {{height: '40%',width:'80%',backgroundColor: 'rgba(0,0,0,0)',alignItems: 'center', justifyContent: 'space-around'}}
          isOpen = {this.state.waiting}>
          <View>
            <Progress.CircleSnail size = {Metrics.screenHeight*.2} thickness = {5}/>
          </View>
        </Modal>
        <DropdownAlert
          closeInterval = {4000}
          ref = {(ref) => {this.dropdown = ref}}
          />
      </View>
    )
  }
}
