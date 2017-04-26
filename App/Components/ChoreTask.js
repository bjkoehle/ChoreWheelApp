import React, {PropTypes} from 'react'
import { Picker, BackAndroid, Text, ListView, View, TouchableOpacity, StatusBar, Image, TextInput, TouchableWithoutFeedback} from 'react-native'
import Modal from 'react-native-root-modal'
import { updateChore, deleteChore } from '../Services/ChoreWheelApi'

const Item = Picker.Item;

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/ChoreTaskStyles'
import { Metrics } from '../Themes'

export default class ChoreTask  extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    group: PropTypes.object,
    data: PropTypes.object,
    user: PropTypes.object
  }

  constructor(props){
    super(props);
    this.state = {color: '',size: 0, icon: '',iconStyle: styles.checkIcon, choreObj: this.props.data,
                  modalDetails: {
                    animationType: 'fade',
                    modalVisible: false,
                    transparent: false,
                    selectedSupportedOrientation: 0,
                    currentOrientation: 'unknown',}};
  }

  componentWillMount(){
    if(this.props.data.done == true){
      this.setState({color: 'forestgreen',size: 70, icon: 'check-square-o', iconStyle: styles.checkIcon});
    }
    else{
      this.setState({color: 'indianred',size: 80, icon: 'times', iconStyle: styles.timesIcon});
    }
    BackAndroid.addEventListener('hardwareBackPress', ()=>{
      if(this.state.modalDetails.modalVisible){
        this._setModalVisible(false);
        return true
      }
      else{
        return false
      }
    });
  }

  componentWillUnmount(){
     BackAndroid.removeEventListener('hardwareBackPress', ()=>{
      if(this.state.modalDetails.modalVisible){
        this._setModalVisible(false);
        return true
      }
      else{
        return false
      }
    });
  }


  _setModalVisible = (visible) => {
    this.setState({modalDetails:{modalVisible: visible}});
  };

 onTaskPressed = () => {
   this._setModalVisible(true);
 }

 deleteChorePressed = () => {

 }

 saveChorePressed = () => {

 }

 renderItems = ()=>{
  return this.props.group.users.map( (user, i) => {return <Item key = {i} value = {user.userId} label = {user.username} />})
 }

 getUserName = ()=>{
   for(let i = 0; i < this.props.group.users.length; i++){
     if(this.props.data.userId === this.props.group.users[i].id){
       return this.props.group.users[i].userName;
     }
   }
 }

 myModal = () => {
   return(
        <Modal
          transparent = {true}
          animationType = 'slide'
          visible = {this.state.modalDetails.modalVisible}
          onRequestClose = {()=>{this._setModalVisible(false)}}
        >
          <TouchableWithoutFeedback onPress = {()=>{this._setModalVisible(false)}}>
            <View style  = {styles.modalBackground} />
          </TouchableWithoutFeedback>
          <View style = {styles.modalContent}>
            <View style = {styles.row}>
              <Text style = {[styles.rowLabel, {alignSelf: 'center'}]}>Chore Name:</Text>
              <TextInput
                style = {styles.textInput}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder='Username'
                defaultValue = {this.state.choreObj.choreName}
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
            <View style = {[styles.buttonsView, {marginHorizontal: '25%',marginBottom: '3%'}]}>
              <TouchableOpacity style = {[styles.cancelButton, {marginRight: '0%'}]} onPress = {()=>{this.deleteChorePressed(),this._setModalVisible(false)}}>
                <Text style  = {{fontSize: 24, alignSelf: 'center',color:'black'}}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.buttonsView}>
              <TouchableOpacity style = {[styles.cancelButton, {backgroundColor: 'rgba(255,204,0,.8)'}]} onPress = {()=>{this._setModalVisible(false)}}>
                <Text style  = {{fontSize: 24, alignSelf: 'center',color:'black'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.doneButton} onPress = {()=>{this.saveChorePressed(),this._setModalVisible(false)}}>
                <Text style  = {{fontSize: 24, alignSelf: 'center',color:'black'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
   )
 }

  touchableView = () => {
    return(
          <View>
            <View style = {{}}>
              {this.myModal()}
            </View>
            <View style = {[styles.choreRow]}>
              <TouchableOpacity style = {styles.touchableView} onPress={()=>{this.onTaskPressed()}}>
                <Icon style = {this.state.iconStyle} name = {this.state.icon} color = {this.state.color} size = {this.state.size} />
                <View style = {styles.choreText}>
                  <Text style = {styles.choreName}>
                    {this.props.data.choreName}
                  </Text>
                  <View style = {{flexDirection: 'row'}}>
                    <Text style = {styles.choreTime}>
                      {this.props.data.choreTime}
                    </Text>
                    <Text style = {styles.choreTime}>
                      {this.getUserName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          );
  }

  untouchableView = () => {
    return(<View style = {styles.choreRow}>
            <Icon style = {this.state.iconStyle} name = {this.state.icon} color = {this.state.color} size = {this.state.size} />
            <View style = {styles.choreText}>
              <Text style = {styles.choreName}>
                {this.props.data.choreName}
              </Text>
              <View style = {{flexDirection: 'row'}}>
                <Text style = {styles.choreTime}>
                  {this.props.data.choreTime}
                </Text>
                <Text style = {styles.choreTime}>
                  {this.getUserName}
                </Text>
              </View>
            </View>
          </View>
        );
  }

  render() {
    return (
        this.props.user !== null && this.props.user.admin === true ? this.touchableView() : this.untouchableView()
    )
  }
}


