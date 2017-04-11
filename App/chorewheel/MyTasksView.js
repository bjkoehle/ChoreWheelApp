import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

import ChoreTask from '../Components/MyChoreTask'
import styles from './Styles/ChoreTaskViewStyles'

export default class ChoreTaskView extends React.Component {

  getData = async ()=>{
    //call to database here for chores
    var result  = await AsyncStorage.getItem('CHORE_LIST');
    if(result !== null){
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(result))});
    }
    else{console.log('err')}
  }

  componentWillMount(){
    this.getData().done();
  }

  constructor(props){//to remove later when data is implemented
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.getData = this.getData.bind(this);
    this.state = {dataSource: this.ds.cloneWithRows([{this: null}])};
  }

  //Check if the chore is for thsi user and render accordingly
  createRow(rowData){
    //
    // Get user id from storage
    //
    if(rowData.userId == 1){
      return <ChoreTask data = {rowData} />
    }
    else{
      return null
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
        <ListView
          style = {styles.choreList}
          dataSource = {this.state.dataSource}
          renderRow = {this.createRow}
        />
      </View>
    )
  }
}
