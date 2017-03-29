import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

import ChoreTask from '../Components/ChoreTask'
import styles from './Styles/ChoreTaskViewStyles'

export default class ChoreTaskView extends React.Component {

  getData(){
    //call to database here for chores
  }

  constructor(props){//to remove later when data is implemented
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var choreSample = [
      {
        choreName: 'Dishes',
        isDone: true,
        choreTime: 'daily',
        user: 'Brendan',
        userId: 1
      },
      {
        choreName: 'Sweep the court-yard',
        isDone: false,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 1
      },
      {
        choreName: 'Pool Filter',
        isDone: false,
        choreTime: 'daily',
        user: 'Brendan',
        userId: 0
      },
      {
        choreName: 'Mow the lawn',
        isDone: true,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 1
      },
      {
        choreName: 'Pull the weeds',
        isDone: false,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 0
      },
      {
        choreName: 'Clean the windows',
        isDone: false,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 0
      },
      {
        choreName: 'Clean the counters',
        isDone: false,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 0
      },
      {
        choreName: 'Mop the floors',
        isDone: false,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 0
      },
      {
        choreName: 'Vacuuming',
        isDone: false,
        choreTime: 'weekly',
        user: 'Brendan',
        userId: 0
      }
    ];
    this.state = {
      userID: 1,
      dataSource: ds.cloneWithRows(
         choreSample
        )
    };
  }

  //Check if the chore is for thsi user and render accordingly
  createRow(rowData){
    if(rowData.userId == 1){
      return <ChoreTask data = {rowData}
      onPress = {() => {console.log('Pressed!')}} />
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
        <ListView
          style = {styles.choreList}
          dataSource = {this.state.dataSource}
          renderRow = {this.createRow}
        />
      </View>
    )
  }
}
