import React, {PropTypes} from 'react'
import { Text, ListView, View, TouchableOpacity, Alert, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/ChoreTaskStyles'

export default class ChoreTask extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor(props){
    super(props);
    this.state = {color: '',size: 0, icon: '',iconStyle: styles.checkIcon, data: this.props.data};
    this._onPress = this._onPress.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.iconRender = this.iconRender.bind(this);
  }

  componentWillMount(){
    this.iconRender();
  }

  toggleComplete(isDone){
    var newData = this.state.data;
    newData.done = isDone;
    this.setState({data: newData});
    this.iconRender();
    this.setChoreData(isDone);
  }

  setChoreData = async (setDone) =>{
    try{
      let currentData  = JSON.parse(await AsyncStorage.getItem('CHORE_LIST'));
      if(currentData !== null){
        for(let i = 0; i < currentData.length ; i++){
          if(currentData[i].id === this.state.data.id){
            currentData[i].done = setDone;
            break;
          }
        }
        await AsyncStorage.setItem('CHORE_LIST', JSON.stringify(currentData));
      }
      else{
        console.log('No data');
      }
    }
    catch(err){
      console.log(err);
    }
  }

  iconRender(){
    if(this.props.data.done === true){
      this.setState({color: 'forestgreen',size: 70, icon: 'check-square-o', iconStyle: styles.checkIcon});
    }
    else{
      this.setState({color: 'indianred',size: 80, icon: 'times', iconStyle: styles.timesIcon});
    }
  }

  _onPress(){
    Alert.alert(
      this.props.data.choreName,
      this.state.data.done ? 'Would you like to mark this chore INCOMPLETE?':'Would you like to mark this chore COMPLETE?',
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => {this.toggleComplete(!this.state.data.done)}}
      ],
      { cancelable: true }
    )
  }

  render() {
    return (
      <TouchableOpacity onPress = {this._onPress}>
      <View style = {styles.choreRow}>
        <Icon style = {this.state.iconStyle} name = {this.state.icon} color = {this.state.color} size = {this.state.size} />
        <View style = {styles.choreText}>
          <Text style = {styles.choreName}>
            {this.state.data.choreName}
          </Text>
          <Text style = {styles.choreTime}>
            {this.state.data.choreTime}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}
