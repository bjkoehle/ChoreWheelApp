import React, {PropTypes} from 'react'
import { Modal, Text, ListView, View, TouchableOpacity, StatusBar, Image, TextInput} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/ChoreTaskStyles'

export default class ChoreTask extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
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
  }

  _setModalVisible = (visible) => {
    this.setState({modalDetails:{modalVisible: visible}});
  };

 onTaskPressed = () => {
    this._setModalVisible(true);
 }

 myModal = () => {
   return(
      <View>
        <Modal
          onRequestClose={() => this._setModalVisible(false)}
          visible = {this.state.modalDetails.modalVisible}
        >
          <View style = {{height:'100%'}}>
              <Image source={require('../../App/chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
              <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Edit Chore</Text>
              </View>
               <TextInput style = {styles.inputStyle}
               defaultValue = {this.state.choreObj.choreName}
               onChangeText = {(newName) => this.setState({choreObj:{choreName: newName}})}
               />
               <Text> Time </Text>
               <Text> User </Text>
               <TouchableOpacity onPress = {this._setModalVisible.bind(this,false)}>
                <Text> Cancel </Text>
               </TouchableOpacity>

          </View>
        </Modal>
      </View>
   )
 }

  touchableView = () => {
    return( <View style = {styles.choreRow}>
              <TouchableOpacity style = {styles.touchableView} onPress={this.onTaskPressed}>
              {this.myModal()}
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
                      {this.props.data.userName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
                  {this.props.data.userName}
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
