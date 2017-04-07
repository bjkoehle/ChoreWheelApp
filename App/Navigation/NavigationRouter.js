import React, { Component } from 'react'
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import Styles from './Styles/NavigationContainerStyles'

// screens identified by the router
import LoginScreen from '../chorewheel/LoginScreen'
import HomeScreen from '../chorewheel/HomeScreen'
import ChoreTaskView from '../chorewheel/ChoreTaskView'
import MyTaskView from '../chorewheel/MyTasksView'
import GroupUserView from '../chorewheel/GroupUserView'
import RegisterScreen from '../chorewheel/RegisterScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

//Max chore name char = 20
class NavigationRouter extends Component {

  constructor(props){
    super(props);
    this.initalizeLocal = this.initalizeLocal.bind(this);
    this.state = {isLoggedIn: true};
  }

  //Check for user is logged in here
  async componentWillMount(){
    let UID_obj = {User: 1};
    let GROUP_obj = {Group_ID: 1, Group_Name: 'Cucks'};
    let CHORE_LIST_obj = [{id: 1, choreName: 'Do the Dishes', done: true, userId: 1, groupId: 1},
                          {id: 2, choreName: 'Change the filter', done: false, userId: 1, groupId: 1},
                          {id: 3, choreName: 'Swwp the patio', done: true, userId: 2, groupId: 1},
                          {id: 4, choreName: 'Vacuum the floor', done: true, userId: 2, groupId: 1},
                          {id: 5, choreName: 'Mow the Lawn', done: false, userId: 2, groupId: 1},
                          {id: 6, choreName: 'Pull the weeds', done: false, userId: 1, groupId: 1},
                          {id: 7, choreName: 'Clean the windows', done: true, userId: 2, groupId: 1},
                          {id: 8, choreName: 'Wipe down counters', done: false, userId: 2, groupId: 1}];
    await AsyncStorage.setItem('UID', JSON.stringify(UID_obj));
    await AsyncStorage.setItem('Group', JSON.stringify(GROUP_obj));
    await AsyncStorage.setItem('CHORE_LIST',JSON.stringify(CHORE_LIST_obj));
    // let UID123_object = {
    //   name: 'Chris',
    //   age: 30,
    //   traits: {hair: 'brown', eyes: 'brown'},
    //   };
    //   // You only need to define what will be added or updated
    //   let UID123_delta = {
    //   age: 31,
    //   traits: {eyes: 'blue', shoe_size: 10}
    //   };

    //   AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
    //     AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
    //       AsyncStorage.getItem('UID123', (err, result) => {
    //         console.log(result);
    //       });
    //     });
    //   });
  }

  //Grab the local data, if the user group is 0 then it is local
  //else use the group to get data. if null then we know no local user
  async initalizeLocal(){
    let data = JSON.parse(await AsyncStorage.getItem('Group'));
    console.log(data);
    if(data.Group_ID === null){
      this.setState({isLoggedIn: false});
      return null;
    }
    else if(data.Group_ID === 0){
      //Get all data from local file
      let user = await AsyncStorage.getItem('User');
      let chores = JSON.parse(await AsyncStorage.getItem('Chores'));
      return [user, chores];
    }
    else{
      //Asuming that it is a number, later need to account for possible err
      //fetch user data from online
      let user = await AsyncStorage.getItem('User');
    }
  }

  //Login Check
  componentDidMount(){
    if(this.state.isLoggedIn === false){
      Actions.loginScreen();
    }
    else{
      Actions.homeScreen({type: ActionConst.REPLACE});
    }
  }

  render () {
    //Control flow for main app scene
    return (
      <Router>
        <Scene key = 'root' hideNavBar>
          <Scene key = 'loginScreen' component={LoginScreen} title = 'Login Screen' hideNavBar />
          <Scene key = 'registerScreen' component = {RegisterScreen} title = 'Register Screen' hideNavBar />
          <Scene key = 'homeScreen' component={HomeScreen} title = 'Home Screen' hideNavBar />
          <Scene key ='choreTaskView' component = {ChoreTaskView} title = 'Task List' hideNavBar />
          <Scene key ='myTaskView' component = {MyTaskView} title = 'My Tasks' hideNavBar />
          <Scene key ='groupScreen' component = {GroupUserView} title = 'Group' hideNavBar />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
