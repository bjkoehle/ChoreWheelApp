import React from 'react'
import { ListView, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native'
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
    this.state = {
      dataSource: 1,
      choreList: null
    };
    console.log('here');
  }

  newData(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(this.state.choreList)});
  }

  async _init(){
    await AsyncStorage.getItem('CHORE_LIST', (err,result)=>{this.setState({choreList: JSON.parse(result)})});
    console.log('now here')
  }

  async componentWillMount(){
    await this._init();
    this.newData();
  }

  // async componentWillMount(){
  //   await AsyncStorage.getItem('CHORE_LIST', (err,result)=>{this.setState({choreList: JSON.parse(result)})});
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.setState({dataSource: ds.cloneWithRows(this.state.choreList)});
  //   console.log(this.state.dataSource);
  // }


  render() {
    console.log(this.state.dataSource);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
        <ListView
          style = {styles.choreList}
          dataSource = {ds.cloneWithRows([{
            choreName: 'Vacuuming',
            isDone: false,
            choreTime: 'weekly',
            user: 'Brendan',
            userId: 0
          }])}
          renderRow = { (rowData) =>
            <ChoreTask data = {rowData} />}
        />
      </View>
    )
  }
}
