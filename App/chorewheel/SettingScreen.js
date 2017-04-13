import React from 'react'
import { View, Modal, Text, TextInput, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import RoundedButton from '../../App/Components/myRoundedButton'
import { SegmentedControlButton, Switcher } from 'nachos-ui'

import { Actions, ActionConst } from 'react-native-router-flux'
import styles from './Styles/SettingScreenStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SettingScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newGroup: 'no',
      group: '',
      errors: [],
      groupDetails:{name: 'Default', Group_ID: 0},
      modalProperties: {isVisible: false}
    };
  }

  onLogoutPress = async () => {
    await AsyncStorage.multiRemove(['UID', 'Group', 'CHORE_LIST']);
    Actions.loginScreen({type: ActionConst.RESET});
  }

  toggleModal = (request) => {
    this.setState({modalProperties:{isVisible: request}});
  }

  onJoinGroupPress = () => {
    this.toggleModal(true);
  }

  render () {
      return (
        <View style={{height: '100%'}}>
          <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
          <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Settings</Text></View>
          <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
          }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        <View style={styles.settingList}>
          <RoundedButton onPress={this.onLogoutPress}>
            Logout
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Group Settings
          </RoundedButton>
          <RoundedButton onPress={this._onPress}>
            Chore List Settings
          </RoundedButton>
          <RoundedButton>
            Invite Group Memebers
          </RoundedButton>
          <RoundedButton onPress = {this.onJoinGroupPress}>
            Join Group
          </RoundedButton>
          </View>
          <Modal
            animationType = 'slide'
            transparent = {true}
            onRequestClose = {() => {this.toggleModal(false)}}
            visible = {this.state.modalProperties.isVisible}
          >
            <View style = {{backgroundColor: 'hsla(0, 0%, 0%, 0.5)', height: '100%'}}>
            <View style = {styles.groupModal}>
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
                    style = {styles.textInput}
                    onChangeText={(val) => {this.setState({group: val})}}
                    ref='group_id'
                    keyboardType='default'
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    placeholder='-------------------------------'
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
            </View>
          </Modal>
        </View>
      )
  }
}
