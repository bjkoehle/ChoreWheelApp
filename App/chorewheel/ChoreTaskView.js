import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

import ChoreTask from '../Components/ChoreTask'
import styles from './Styles/ChoreTaskViewStyles'

export default class ChoreTaskView extends React.Component {

  getData = async ()=>{
    //call to database here for chores
    var result  = await AsyncStorage.getItem('CHORE_LIST');
    var userOBJ = await AsyncStorage.getItem('UID');
    if(result !== null){
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(result))});
      this.render();
    }
    else{console.log('err')}

    if(userOBJ !== null){
      this.setState({user: JSON.parse(userOBJ)});
      this.render();
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
    this.state = {dataSource: null, user: null};
  }

  render() {
    return (
      <View style = {{height:'100%'}}>
        <Image source={require('../chorewheel/Images/General_bg.png')} style={styles.backgroundImage} resizeMode='stretch' resizeMethod = 'scale' />
        <View style = {{alignItems: 'center'}}><Text style = {styles.headerText}>Chore List</Text></View>
        <TouchableOpacity onPress = {Actions.pop} style={{
          position: 'absolute',
          paddingTop: '4%',
          paddingHorizontal: '10%',
          zIndex: 10
        }}>
          <Icon name = 'arrow-left' color = 'white' size = {36} />
        </TouchableOpacity>
        {this.state.dataSource === null ? null : <ListView
          style = {styles.choreList}
          dataSource = {this.state.dataSource}
          renderRow = { (rowData) =>
            <ChoreTask data = {rowData} />}
        />}
      </View>
    )
  }
}
