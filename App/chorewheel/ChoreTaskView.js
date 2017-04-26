import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions, ActionConst } from 'react-native-router-flux'
import { getGroup, createChore } from '../Services/ChoreWheelApi'

import ChoreTask from '../Components/ChoreTask'
import styles from './Styles/ChoreTaskViewStyles'

export default class ChoreTaskView extends React.Component {

  getData = async ()=>{
    //call to database here for chores
    var userObj = JSON.parse(await AsyncStorage.getItem('UID'));
    var groupObj = JSON.parse(await AsyncStorage.getItem('Group'));
    var auth = await AsyncStorage.getItem('Auth');
    if(userObj !== null && groupObj !== null && groupObj.id === 0){
      this.setState({dataSource: this.ds.cloneWithRows(groupObj.chores)});
      this.setState({user: userObj});
      this.setState({group: groupObj});
    }
    else if(userObj !== null && groupObj !== null && auth !== null){
      let currentData = await getGroup(userObj.groupId, auth).catch((error)=>{console.log(error)});
      let choreList = JSON.parse(currentData._bodyText).chores;
      await AsyncStorage.setItem('Group',currentData._bodyText);
      if(choreList !== []){
        this.setState({dataSource: this.ds.cloneWithRows(choreList)});
        this.setState({user: userObj});
        this.setState({group: groupObj});
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
    this.state = {dataSource: null, user: null, group: null};
  }

  render() {
    return (
      <View style = {{height:'100%'}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Chore List</Text></View>
        <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          marginHorizontal: '5%',
          zIndex: 10
        }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        {(this.state.user !== null && this.state.user.admin === true) ?
          <TouchableOpacity onPress = {()=>{Actions.addChoreScreen({type: ActionConst.REPLACE, user: this.state.user, group: this.state.group})}} style={{
            position: 'absolute',
            paddingTop: '2%',
            marginLeft: '85%',
            zIndex: 10
          }}>
            <Icon name = 'plus' color = 'white' size = {36} />
          </TouchableOpacity>
          : null
        }
        {this.state.group === null ? null :
          <ListView
            style = {styles.choreList}
            dataSource ={this.state.dataSource}
            renderRow = {
              (rowData) =>
                (<ChoreTask
                  data = {rowData}
                  user = {(this.state.user !== null && this.state.user.admin === true)
                          ? this.state.user : null}
                  group = {(this.state.group !== null && this.state.user.admin === true)
                          ? this.state.group : null} />)}
          />
        }
      </View>
    )
  }
}
