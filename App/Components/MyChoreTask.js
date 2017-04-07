import React, {PropTypes} from 'react'
import { Text, ListView, View, TouchableOpacity, Alert} from 'react-native'
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
    this.toggleIncomplete = this.toggleIncomplete.bind(this);
    this.iconRender = this.iconRender.bind(this);
  }

  componentWillMount(){
    this.iconRender();
  }

  toggleComplete(){
    var newData = this.state.data;
    newData.isDone = true;
    this.setState({data: newData});
    this.iconRender();
  }

  toggleIncomplete(){
    var newData = this.state.data;
    newData.isDone = false;
    this.setState({data: newData});
    this.iconRender();
  }

  iconRender(){
    if(this.state.data.isDone === true){
      this.setState({color: 'forestgreen',size: 70, icon: 'check-square-o', iconStyle: styles.checkIcon});
    }
    else{
      this.setState({color: 'indianred',size: 80, icon: 'times', iconStyle: styles.timesIcon});
    }
  }

  _onPress(){
    Alert.alert(
      this.props.data.choreName,
      this.state.data.isDone ? 'Would you like to mark this chore INCOMPLETE?':'Would you like to mark this chore COMPLETE?',
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => {if(this.state.data.isDone === false){this.toggleComplete()}else{this.toggleIncomplete()}}}
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
