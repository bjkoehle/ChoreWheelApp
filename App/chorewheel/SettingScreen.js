import React from 'react'
import { View, Text, TextInput, Image, Button, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import RoundedButton from '../../App/Components/myRoundedButton'
import { SegmentedControlButton, Switcher } from 'nachos-ui'
import Modal from 'react-native-modalbox'

import { Actions, ActionConst } from 'react-native-router-flux'
import styles from './Styles/SettingScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SettingScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      newGroup: 'no',
      group: '',
      errors: [],
      groupDetails:{name: 'Default', Group_ID: 0},
      modalProperties: {isVisibleJoin: false,isVisibleUser: false, isVisibleGroup: false, isVisibleList: false}
    };
  }

  getUser = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('UID'));
    this.setState({user: user});
  }

  componentWillMount(){
    this.getUser();
  }

  toggleModal = (request) => {
    this.setState({modalProperties: request});
  }

  onLogoutPress = async () => {
    await AsyncStorage.multiRemove(['UID', 'Group', 'CHORE_LIST']);
    Actions.loginScreen({type: ActionConst.RESET});
  }

  onJoinGroupPress = () => {
    this.setState({modalProperties:{isVisibleJoin: true}});
  }

  onLeaveGroupPress = ()=>{
    this.state.user.group_id = 0;
    console.log('reached');
    console.log(this.state.user.group_id)
    this.setState({user: {...this.state.user, group_id: 0, admin:true}});
    this.revertDefault();
  }

  revertDefault = async () => {
    let default_list = [{id: 1, choreName: 'Example chores', choreTime: 'Time Frame appears here', done: true, userName: this.state.user.username, userId: this.state.user.User_id, groupId: 0},
                          {id: 2, choreName: 'Put away dishes', choreTime: 'Daily', done: false, userName: this.state.user.username, userId: this.state.user.User_id, groupId: 0},
                          {id: 3, choreName: 'Vaccum living-room', choreTime: 'Weekly', done: false, userName: this.state.user.username, userId: this.state.user.User_id, groupId: 0}];
    let default_group = {Group_ID: 1, Group_Name: 'Cucks', user_list: [this.state.user]};
    await AsyncStorage.setItem('UID', JSON.stringify(this.state.user));
    await AsyncStorage.setItem('Group', JSON.stringify(default_group));
    await AsyncStorage.setItem('CHORE_LIST', JSON.stringify(default_list));
  }

  joinModal = () =>{
    return(
      <Modal
            animationDuration = {400}
            backButtonClose = {true}
            backdrop = {true}
            backdropOpacity = {.5}
            position = 'top'
            style = {{height:'80%',width: '90%',borderRadius:15}}
            isOpen = {this.state.modalProperties.isVisibleJoin}
          >
            <View>
            <View style = {[styles.groupModal]}>
              <Text style = {styles.description}>Enter the group ID from your invite, or start your own.</Text>
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
                    onChangeText={(val) => {this.setState({groupDetails:{Group_ID: val}})}}
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
            <View style = {styles.buttonsView}>
              <TouchableOpacity style = {styles.cancelButton} onPress = {()=>{this.toggleModal({isVisibleJoin: false})}}>
                <Text style  = {{fontSize: 24, alignSelf: 'center'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.doneButton}>
                <Text style  = {{fontSize: 24, alignSelf: 'center'}}>{this.state.newGroup === 'yes'?'Create':'Join'}</Text>
              </TouchableOpacity>
            </View>
            </View>
          </Modal>

    );
  }

  render () {
      return (
        <View style={{height: '100%'}}>
          <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
          <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Settings</Text></View>
          <TouchableOpacity onPress = {()=>{
              if(!this.state.modalProperties.isVisible){Actions.pop()}
              else{this.toggleModal({isVisibleJoin: false})}
            }
          } style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%'
          }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        <View style={styles.settingList}>
          <RoundedButton onPress={this.onLogoutPress}>
            Logout
          </RoundedButton>
          {this.state.user !== null && this.state.user.admin === true ? <RoundedButton onPress={this._onPress}>
            Group Settings
          </RoundedButton> : null}
          {this.state.user !== null && this.state.user.admin === true ? <RoundedButton onPress={this._onPress}>
            Chore List Settings
          </RoundedButton> : null}
          <RoundedButton>
            Invite Group Memebers
          </RoundedButton>
          {this.state.user !== null && this.state.user.group_id === 0 ? <RoundedButton onPress = {this.onJoinGroupPress}>
            Join Group
          </RoundedButton>
          :
          <RoundedButton onPress = {()=>{
            Alert.alert(
              'Leave Group',
              'Are you sure you want to leave your group?',
              [
                {text: 'No'},
                {text: 'Yes', onPress: ()=>{this.onLeaveGroupPress()}}

              ],
              { cancelable: true }
            )}}>
            Leave Group
          </RoundedButton>}
          <RoundedButton>
            Edit User Settings
          </RoundedButton>
          </View>
          {this.joinModal()}
        </View>
      )
  }
}
