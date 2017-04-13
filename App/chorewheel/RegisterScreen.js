import React, { PropTypes } from 'react'
import { Alert, Text, TextInput, Image, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, AsyncStorage, Switch } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import { SegmentedControlButton, Switcher } from 'nachos-ui'

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
      newGroup: 'no',
      group: '',
      errors: [],
      groupDetails:{name: 'Default', Group_ID: 0}
    }
  }

  //Data hard coded for dev testing
  setData = async () =>{
    let UID_obj = {User_id: 1, admin: true, group_id: 1, email: 'cuck@cuk.com', username: 'bcuk'};
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
  onRegisterPressed= () => {
    let verified =  this.infoVerify(this.state.email,this.state.password, this.state.password_confirmation);
    console.log(verified);
    this.setData();
    Actions.homeScreen({type: ActionConst.RESET});
    if(verified === true){
      // this.setData();
      if(this.state.groupDetails.name === 'Default' && this.state.group === ''){
        console.log('Left default group')
      }
      else if(this.state.newGroup === 'no' && this.state.groupDetails.Group_ID === 0){
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
      this.setState({password: '', password_confirmation: ''})
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
      this.setState({password: '', password_confirmation: ''})
      return false
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
                <Switcher onChange = {(Value) => {this.setState({newGroup: Value})}} value = {this.state.newGroup} defaultSelected = {this.state.newGroup}>
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
      </View>
    )
  }
}

class GroupIdInput extends React.Component {

}
