import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { getGroup } from '../Services/ChoreWheelApi'

import ChoreTask from '../Components/MyChoreTask'
import styles from './Styles/ChoreTaskViewStyles'

export default class ChoreTaskView extends React.Component {

  getData = async ()=>{
    //call to database here for chores
    let userObj = JSON.parse(await AsyncStorage.getItem('UID'));
    let groupObj = JSON.parse(await AsyncStorage.getItem('Group'));
    let auth = await AsyncStorage.getItem('Auth');
    if(groupObj !== null && userObj !== null && groupObj.id === 0){
      this.setState({dataSource: this.ds.cloneWithRows(groupObj.chores)});
      this.setState({user: userObj});
    }
    else if(groupObj !== null && userObj !== null && auth !== null){
      let currentData = await getGroup(groupObj.id, auth).catch((error)=>{console.log(error)});
      let choreList = JSON.parse(currentData._bodyText).chores;
      await AsyncStorage.setItem('Group', currentData._bodyText);
      if(choreList !== []){
        this.setState({dataSource: this.ds.cloneWithRows(choreList)});
        this.setState({user: userObj});
      }
    }
    else{console.log('error setting data.')}
  }

  componentWillMount(){
    this.getData().done();
  }

  constructor(props){//to remove later when data is implemented
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.getData = this.getData.bind(this);
    this.state = {dataSource: null, user: null};
  }

  //Check if the chore is for thsi user and render accordingly
  createRow = (rowData)=>{
    //
    // Get user id from storage
    //
    if(this.state.user !== null && rowData.userId === this.state.user.id){
      return (<ChoreTask data = {rowData} />);
    }
    else{
      return null;
    }
  }

  render() {
    return (
      <View style = {{height:'100%'}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>My Tasks</Text></View>
        <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
        }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        {false ? <Icon name = 'user'color = 'red' size = {80}/> : null}
        {this.state.user !== null ? <ListView
          style = {styles.choreList}
          dataSource = {this.state.dataSource}
          renderRow = {this.createRow}
        />
        : null}
      </View>
    )
  }
}
