import React, {PropTypes} from 'react'
import { Text, ListView, View, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/ChoreTaskStyles'

export default class ChoreTask extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.object
  }

  constructor(){
    super();
    this.state = {color: '',size: 0, icon: '',iconStyle: styles.checkIcon};
  }

  componentWillMount(){
    if(this.props.data.isDone == true){
      this.setState({color: 'forestgreen',size: 70, icon: 'check-square-o', iconStyle: styles.checkIcon});
    }
    else{
      this.setState({color: 'indianred',size: 80, icon: 'times', iconStyle: styles.timesIcon});
    }
  }

  render() {
    return (
      <TouchableOpacity onPress = {this.props.onPress}>
      <View style = {styles.choreRow}>
        <Icon style = {this.state.iconStyle} name = {this.state.icon} color = {this.state.color} size = {this.state.size} />
        <View style = {styles.choreText}>
          <Text style = {styles.choreName}>
            {this.props.data.choreName}
          </Text>
          <Text style = {styles.choreTime}>
            {this.props.data.choreTime}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }
}