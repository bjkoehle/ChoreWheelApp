import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, AsyncStorage, Switch } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import { SegmentedControlButton, Switcher } from 'nachos-ui'
import Modal from 'react-native-modalbox'
import base64 from 'base-64'
import DropdownAlert from 'react-native-dropdownalert'
import * as Progress from 'react-native-progress'

import { register, createGroup, joinGroup, updateUser } from '../Services/ChoreWheelApi'

import styles from './Styles/RegisterScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Metrics } from '../Themes'

'use strict';

export default class RegisterScreen extends React.Component {

  constructor () {
    super();
    this.state = {
      username: '',
      email: '',
      waiting: false,
      password: '',
      password_confirmation: '',
      newGroup: 'no',
      group: '',
      groupDetails:{name: 'Default', Group_ID: 0},
      errors: {number: null, message: ''}
    }
  }

    // Actions.homeScreen({type: ActionConst.REPLACE});

  toggleLoader = (tf) =>{
    this.setState({waiting: tf});
  }

  //Data hard coded for dev testing
  setData = async () =>{
    let UID_obj = {id: 1, groupId: 1, username: 'bcuk', email: 'cuck@cuk.com', admin: true};
    let GROUP_obj = {Group_ID: 1, Group_Name: 'Cucks', user_list: [{User_id: 1, admin: true, group_id: 1, email: 'cuck@cuk.com', username: 'bcuk'},
                                                                  {User_id: 1, admin: true, group_id: 1, email: 'cuck@cuk.com', username: 'bcuk'},
                                                                  {User_id: 1, admin: true, group_id: 1, email: 'cuck@cuk.com', username: 'bcuk'}]
                                                                };
    let CHORE_LIST_obj = [{id: 1, choreName: 'Do the Dishes', choreTime: 'Daily', done: true, userName: 'Brendan', userId: 1, groupId: 1},
                          {id: 2, choreName: 'Change the filter', choreTime: 'Daily', done: false, userName: 'Brendan', userId: 1, groupId: 1},
                          {id: 3, choreName: 'Sweep the patio', choreTime: 'Weekly', done: true, userName: 'Jaime', userId: 2, groupId: 1},
                          {id: 4, choreName: 'Vacuum the floor', choreTime: 'Weekly', done: true, userName: 'Tik', userId: 3, groupId: 1},
                          {id: 5, choreName: 'Mow the Lawn', choreTime: 'Weekly', done: false, userName: 'Jaime', userId: 2, groupId: 1},
                          {id: 6, choreName: 'Pull the weeds', choreTime: 'Daily', done: false, userName: 'Brendan', userId: 1, groupId: 1},
                          {id: 7, choreName: 'Clean the windows', choreTime: 'Weekly', done: true, userName: 'Tik', userId: 3, groupId: 1},
                          {id: 8, choreName: 'Wipe down counters', choreTime: 'Weekly', done: false, userName: 'Jaime', userId: 2, groupId: 1}];
    await AsyncStorage.setItem('UID', JSON.stringify(UID_obj));
    await AsyncStorage.setItem('Group', JSON.stringify(GROUP_obj));
    await AsyncStorage.setItem('CHORE_LIST',JSON.stringify(CHORE_LIST_obj));
  }

  //Check to make sure that the info isnt harmful or out of bounds, then pass as a new user
  onRegisterPressed = () => {
    let verified =  this.infoVerify(this.state.email,this.state.password, this.state.password_confirmation);
    if(verified === true){
      this.toggleLoader(true);
      let user = {groupId: null, username: this.state.username, email: this.state.email, password: this.state.password, admin: false};
      register(user)
      .then((response) => {
        if(response.ok === true){
          let auth = base64.encode(this.state.email +':'+ this.state.password)
          AsyncStorage.setItem('Auth', auth).catch((error)=>{this.setState({errors:{number:0,message:'Error setting Auth'}}),this.showAlert('error')});
          if((this.state.groupDetails.name === 'Default' || this.state.groupDetails.name === '') && this.state.group === ''){ //Default group
            let newUser = JSON.parse(response._bodyText);
            newUser.admin = true;
            newUser.groupId = 0;
            let mergeUser = {...user, ...newUser};
            console.log(mergeUser);
            updateUser(mergeUser, auth).then((response)=>{console.log(response)}).catch((error)=>{console.log(error)});
            let default_list = [{id: 1, choreName: 'Example chores',  done: true, choreTime: 'Time Frame appears here', userId: newUser.id, groupId: 0},
                                {id: 2, choreName: 'Put away dishes', done: false, choreTime: 'Daily', userId: newUser.id, groupId: 0},
                                {id: 3, choreName: 'Vaccum living-room', done: false, choreTime: 'Weekly', userId: newUser.id, groupId: 0}];
            let default_group = {id: 0, users: [newUser], chores: default_list, name: 'Default'};
            AsyncStorage.setItem('UID', JSON.stringify(newUser));
            AsyncStorage.setItem('Group', JSON.stringify(default_group));
            showAlert = this.showAlert;
            toggleLoader = this.toggleLoader;
            setTimeout(()=>{toggleLoader(false)},500);
            setTimeout(()=>Actions.homeScreen({type: ActionConst.REPLACE}),1000);
          }
          else if(this.state.newGroup === 'yes' && this.state.group === ''){
            //Register a new group here
            createGroup({users: [], chores: [],name: this.state.groupDetails.name}, JSON.parse(response._bodyText).id, auth)
            .then((result) => {
              if(result.ok === true){
                AsyncStorage.setItem('UID', response._bodyText);
                AsyncStorage.setItem('Group', result._bodyText);
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false)},500);
                setTimeout(()=>Actions.homeScreen({type: ActionConst.REPLACE}),1000);
              }
              else{
                let errMsg = '';
                if(result.status === 401){errMsg = 'Error creating group.'}
                else{errMsg = result._bodyText}
                this.setState({errors: {number: result.status, message: errMsg}});
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
              }
            })
            .catch((error)=>{
              this.setState({errors: {number: result.status, message: error}});
              showAlert = this.showAlert;
              toggleLoader = this.toggleLoader;
              setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
            });
          }
          else{
            //Assume that they entered something for group id
            joinGroup(this.state.group, JSON.parse(response._bodyText).id, auth)
            .then((result)=>{
              if(result.ok === true){
                AsyncStorage.setItem('UID', response._bodyText);
                AsyncStorage.setItem('Group', result._bodyText);
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false)},500);
                setTimeout(()=>Actions.homeScreen({type: ActionConst.REPLACE}),1000);
              }
              else{
                let errMsg = '';
                if(result.status === 401){errMsg = 'Error joining group.'}
                else{errMsg = result._bodyText}
                this.setState({errors: {number: result.status, message: errMsg}});
                showAlert = this.showAlert;
                toggleLoader = this.toggleLoader;
                setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
              }
            })
            .catch((error)=>{
              this.setState({errors: {number: result.status, message: error}});
              showAlert = this.showAlert;
              toggleLoader = this.toggleLoader;
              setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
            });
          }
        }
        else{// response.ok came back false
          let errMsg = '';
          if(response.status === 401){errMsg = 'Error creating user.'}
          else{errMsg = result._bodyText}
          this.setState({errors: {number: result.status, message: errMsg}});
          showAlert = this.showAlert;
          toggleLoader = this.toggleLoader;
          setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
        }
      })
      .catch((error)=>{//failed to contact server
        this.setState({errors: {number: result.status, message: error}});
        showAlert = this.showAlert;
        toggleLoader = this.toggleLoader;
        setTimeout(()=>{toggleLoader(false),showAlert('error')},1500);
      })
    }
    else{ //handled in verified?? not sure if anything needed maybe reset

    }
  }

  infoVerify (email,password, password_confirmation){
    var rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (!rex.test(email)){
       Alert.alert(
        'Error',
        'Please enter a valid email address',
        [
          {text: 'OK'},
        ],
        { cancelable: true }
      );
      this.setState({...this.state, password: '', password_confirmation: ''});
      return false;
    }
    var rec = /(?=.*\d)(?=.*[a-z]).{10,}/;
    if (!rec.test(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain 10 characters, 1 Lowercase, and 1 Number',
        [
          {text: 'OK'},
        ],
        { cancelable: true }
      );
      this.setState({...this.state, password: '', password_confirmation: ''});
      return false;
    }
    if (password == password_confirmation) {
      return true
    } else {
       Alert.alert(
        'Error',
        'Passwords do not match',
        [
          {text: 'OK'},
        ],
        { cancelable: true }
      );
      this.setState({...this.state, password: '', password_confirmation: ''});
      return false;
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
        this.dropdown.alertWithType(type, 'Error #'+ this.state.errors.number, this.state.errors.message+'\n\n\n');
        break;
      case 'success':
        this.dropdown.alertWithType(type, 'Success', 'Successfully registered!\n\n\n');
      case 'custom':
        this.dropdown.alert('');
        break;
    }
  }

  render(){
    return(
      <View style = {styles.container}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Register</Text></View>
        <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
        }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        <KeyboardAvoidingView behavior = 'padding' keyboardVerticalOffset = {15} style = {styles.content}>
          <ScrollView>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Username:</Text>
              <TextInput
                style = {styles.textInput}
                onChangeText={(val) => {this.setState({username: val})}}
                ref='username'
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='Username' />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Email Address:</Text>
              <TextInput
                style = {styles.textInput}
                onChangeText={(val) => this.setState({email: val})}
                ref='email'
                keyboardType='email-address'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='example@example.com' />
            </View>
            <View style={styles.row}>
              <Text style = {styles.description}>Password must be at least 10 characters long, and contain at least 1 letter and 1 number.</Text>
              <Text style={styles.rowLabel}>Password:</Text>
              <TextInput
                style = {styles.textInput}
                onChangeText={(val) => this.setState({password: val})}
                ref='password'
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry = {true}//protect password
                underlineColorAndroid='transparent'
                placeholder='Password' />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Confirm Password:</Text>
              <TextInput
                style = {styles.textInput}
                onChangeText={(val) => this.setState({password_confirmation: val})}
                ref='password_confirmation'
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry = {true} //protect password
                underlineColorAndroid='transparent'
                placeholder='Password' />
            </View>
            <View style = {styles.row}>
              <Text style = {styles.description}>Enter the group ID from your invite, start your own, or leave blank for the Default group.</Text>
              <View style = {styles.switcher}>
                <Text style = {styles.rowLabel}>New Group?</Text>
                <Switcher onChange = {(Value) => {this.setState({group: '', newGroup: Value, groupDetails:{name: 'Default'}})}} value = {this.state.newGroup} defaultSelected = {this.state.newGroup}>
                  <SegmentedControlButton value = 'no' text = 'No' />
                  <SegmentedControlButton value = 'yes' text = 'Yes' />
                </Switcher>
              </View>
              {this.state.newGroup === 'yes' ?
              <View>
                <View style = {{marginTop: '3%'}}>
                  <Text style = {styles.rowLabel}>Group ID:</Text>
                  <Text style = {styles.smallDes}>Not available with new group.</Text>
                  <TextInput
                    style = {[styles.textInput, {backgroundColor: 'lightgrey'}]}
                    onChangeText={(val) => {this.setState({group: val})}}
                    ref='group_id'
                    keyboardType='default'
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    editable = {false}/>
                </View>
                <View style = {{marginTop: '3%'}}>
                  <Text style = {styles.rowLabel}>Group Name:</Text>
                  <Text style = {styles.smallDes}>New group name, do not leave as Default:</Text>
                  <TextInput
                    style = {styles.textInput}
                    onChangeText={(val) => {this.setState({groupDetails:{name: val} })}}
                    ref='new_group_id'
                    keyboardType='default'
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    placeholder='Default' />
                </View>
              </View>
              :
              <View>
                <View style = {{marginTop: '3%'}}>
                  <Text style = {styles.rowLabel}>Group ID:</Text>
                  <Text style = {styles.smallDes}>Set group id from invite email here:</Text>
                  <TextInput
                    style = {styles.textInput}
                    onChangeText={(val) => {this.setState({group: val})}}
                    ref='group_id'
                    keyboardType='default'
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    placeholder='#######' />
                </View>
                <View style = {{marginTop: '3%'}}>
                  <Text style = {styles.rowLabel}>Group Name:</Text>
                  <Text style = {styles.smallDes}>Enter name from invite email here:</Text>
                  <TextInput
                    style = {styles.textInput}
                    onChangeText={(val) => {this.setState({groupDetails:{name: val} })}}
                    ref='new_group_id'
                    keyboardType='default'
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    placeholder='Default' />
                </View>
              </View>
              }
            </View>
            <View style = {styles.row}>
              <TouchableOpacity style ={styles.buttonContainer} onPress={this.onRegisterPressed}>
                <Text style = {styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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

