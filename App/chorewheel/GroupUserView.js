import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

import GroupUser from '../Components/GroupUser'
import styles from './Styles/GroupUserViewStyles'

export default class GroupUserView extends React.Component {

  getData(){
    //call to database here for chores
  }

  constructor(props){//to remove later when data is implemented
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var userSample = [
      {
        firstName: 'Jaime',
        lastName: 'Romero',
        userId: 0
      },
      {
        firstName: 'Tik',
        lastName: 'Aw',
        userId: 1
      },
      {
        firstName: 'Brendan',
        lastName: 'Koehler',
        userId: 2
      },
      {
        firstName: 'Mik',
        lastName: 'Odom',
        userId: 3
      },
      {
        firstName: 'Ab',
        lastName: 'Dullah',
        userId: 4
      },
      {
        firstName: 'Cuk',
        lastName: 'Boi',
        userId: 5
      }
    ];
    this.state = {
      dataSource: ds.cloneWithRows(
         userSample
        )
    };
  }


  render() {
    return (
      <View style = {{height:'100%'}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>User List</Text></View>
        <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
        }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        <ListView
          style = {styles.userList}
          dataSource = {this.state.dataSource}
          renderRow = { (rowData) =>
            <GroupUser data = {rowData} />}
        />
      </View>
    )
  }
}
