import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, TouchableOpacity, AsyncStorage, Modal, Switch } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'

import styles from './Styles/RegisterScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'



export default class RegisterScreen extends React.Component {

  constructor () {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      newGroup: false,
      group: '',
      errors: [],
      modalStatus: {isVisable: false, animationType: 'fade', transparent: true, },
      groupDetails:{name: 'Default', Group_ID: 0}
    }
  }

  setData = async () =>{
    let UID_obj = {User: 1};
    let GROUP_obj = {Group_ID: 1, Group_Name: 'Cucks'};
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
  onRegisterPressed= () => {
    let verified =  this.infoVerify(this.state.email,this.state.password, this.state.password_confirmation);
    console.log(verified);
    if(verified === true){
      this.setData();
      this.toggleModal(true);
      while(this.state.modalStatus.isVisable === true){
        //wait
      }
      if(this.state.groupDetails.name === 'Default' && this.state.group === ''){
        console.log('Left default group')
      }
      else if(this.state.newGroup === true && this.state.groupDetails.Group_ID !== 0){
        //Register a new group here

      }
      else{
        //Assume that they entered something for group id

      }
      Actions.homeScreen({type: ActionConst.RESET});
    }
    else{

    }
    //TODO: move data into local
    //Ask the user in an alert if they have a group already
    //When yes is clicked pull up a model and then get the proper info
    //Link them to the group locally then push their new user into the group
    //Pull all new data into the local storage
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
      return false
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
      return false
    }
    if (password == password_confirmation) {
      console.log ('fine')
      return true
    } else {
       Alert.alert(
        'Error',
        'Passwords do not match',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
      return false
    }
  }

  regModal = (<Modal  animationType = {this.state.modalStatus.animationType}
                transparent = {this.state.modalStatus.transparent}
                visible = {this.state.modalStatus.isVisable}
                onRequestClose = {this.toggleModal(false)}
                >
          <View>
            <Text>Enter the group ID from your invite, start your own, or leave blank for the Default group.</Text>
            <Switch onValueChange = {(Value) => {this.setState({newGroup: value})}} value = {this.state.newGroup} />
            {this.state.newGroup ?
              <View>
                <Text>Group Name:</Text>
                <Text>Do not leave as Default</Text>
                <TextInput
                  style = {styles.textInput}
                  onChangeText={(val) => {this.setState({groupDetails:{name: val} })}}
                  ref='new_group_id'
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                  placeholder='Default' />
              </View>
              :
              <TextInput
                style = {styles.textInput}
                onChangeText={(val) => {this.setState({group: val})}}
                ref='group_id'
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='group ID' />
            }
            <TouchableOpacity style ={styles.buttonContainer} onPress = {this.toggleModal(false)}>
              <Text style = {styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>);

  toggleModal = (status)=>{
    this.setState({modalStatus:{isVisable: status}})
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
        {this.regModal}
        <View style = {styles.content}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Username</Text>
            <TextInput
              style = {styles.textInput}
              onChangeText={(val) => {this.setState({username: val})}}
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
              style = {styles.textInput}
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
              style = {styles.textInput}
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
              style = {styles.textInput}
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

class GroupIdInput extends React.Component {

}
