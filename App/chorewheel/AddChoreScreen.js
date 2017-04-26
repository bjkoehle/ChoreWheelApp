import React, { PropTypes } from 'react'
import { Text, TextInput, Image, View, KeyboardAvoidingView, ScrollView, TouchableOpacity, AsyncStorage, Picker } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'
import Modal from 'react-native-modalbox'
import * as Progress from 'react-native-progress'

Item = Picker.Item;

import { createChore } from '../Services/ChoreWheelApi'

import styles from './Styles/SettingScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Metrics } from '../Themes'

'use strict';

export default class AddChoreScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      waiting: false,
      groupDetails:{name: 'Default', Group_ID: 0},
      choreObj: {id: null, choreName: '', done: false, choreTime: 'Daily', userId: this.props.user.id, groupId: this.props.user.groupId},
      errors: {number: null, message: ''}
    }
  }

  toggleLoader = (tf) =>{
    this.setState({waiting: tf});
  }

  static propTypes = {
    user: PropTypes.object,
    group: PropTypes.object
  }

  renderItems = ()=>{
    return this.props.group.users.map( (user, i) => {return <Item key = {i} value = {user.userId} label = {user.username} />})
  }

  onSaveChorePress = async () => {
    let auth = await AsyncStorage.getItem('Auth').catch((error)=>{console.log(error)});
    let groupObj = JSON.parse(await AsyncStorage.getItem('Group').catch((error)=>{console.log(error)}));
    if(groupObj.id === 0){
      this.setState({choreObj:{...this.state.choreObj, id: groupObj.chores.length}});
      groupObj.chores.push(this.state.choreObj);
      AsyncStorage.setItem('Group', JSON.stringify(groupObj))
      .done(()=>{this.toggleLoader(false),Actions.choreListScreen({type: ActionConst.REPLACE})});
    }
    else{
      createChore(this.state.choreObj, this.props.user.groupId, auth)
      .then((result)=>{
        if(result.ok === true){
          AsyncStorage.setItem('Group', result._bodyText).catch((error)=>{console.log(error)})
          .done(()=>{this.toggleLoader(false),Actions.choreListScreen({type: ActionConst.REPLACE})});
        }
      })
    .catch((error)=>{console.log(error)});
   }
 }

  render(){
    return(
      <View style = {{height: '100%'}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Create Chore</Text></View>
        <TouchableOpacity onPress = {()=>{Actions.choreListScreen({type: ActionConst.REPLACE})}} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
        }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        <View style = {styles.container}>
        <KeyboardAvoidingView behavior = 'padding' keyboardVerticalOffset = {15} style = {styles.content}>
          <ScrollView>
            <View style = {styles.row}>
              <Text style = {[styles.rowLabel, {alignSelf: 'center'}]}>Chore Name:</Text>
              <TextInput
                style = {styles.textInput}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='Name'
                onChangeText = {(newName) => {this.setState({choreObj:{...this.state.choreObj, choreName: newName}})}}
              />
            </View>
            <View style = {styles.row}>
              <Text style = {[styles.rowLabel, {alignSelf: 'center'}]}>Frequency:</Text>
              <Picker
                style = {[styles.textInput]}
                mode = 'dropdown'
                selectedValue = {this.state.choreObj.choreTime}
                onValueChange = {(value)=>{this.setState({choreObj:{...this.state.choreObj, choreTime: value}})}}>
                <Item label = 'Daily' value = 'Daily'/>
                <Item label = 'Every Other Day' value = 'Every Other Day'/>
                <Item label = 'Twice Weekly' value = 'Twice Weekly'/>
                <Item label = 'Weekly' value = 'Weekly'/>
                <Item label = 'Monthly' value = 'Monthly'/>
              </Picker>
            </View>
            <View style = {styles.row}>
              <Text style = {[styles.rowLabel, {alignSelf: 'center'}]}>User:</Text>
              <Picker
                style = {styles.textInput}
                mode = 'dropdown'
                selectedValue = {this.state.choreObj.userId}
                onValueChange = {(value)=>{this.setState({choreObj:{...this.state.choreObj, userId: value}})}}>
                {this.renderItems()}
              </Picker>
            </View>
            <View style = {styles.buttonsView}>
              <TouchableOpacity style = {[styles.cancelButton, {backgroundColor: 'rgba(255,204,0,.8)'}]} onPress = {()=>{Actions.choreListScreen({type: ActionConst.REPLACE})}}>
                <Text style  = {{fontSize: 24, alignSelf: 'center',color:'black'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.doneButton} onPress = {()=>{this.toggleLoader(true),this.onSaveChorePress()}}>
                <Text style  = {{fontSize: 24, alignSelf: 'center',color:'black'}}>Save</Text>
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
      </View>
      </View>
    )
  }
}
