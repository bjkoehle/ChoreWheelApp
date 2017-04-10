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
    this.checkLogin();
  }

  async checkLogin(){
    //await AsyncStorage.multiRemove(['UID', 'Group', 'CHORE_LIST']); //This is for reseting hard coded data
    let data = JSON.parse(await AsyncStorage.getItem('Group'));
    console.log(data)
    if(data === null){
      console.log('1')
      Actions.loginScreen({type: ActionConst.REPLACE});
    }
    else if(data.Group_ID === 0){
      console.log('2')
      //Local Storage only?? how to set this up
      Actions.homeScreen();
    }
    else{
      console.log('3')
      //Asuming that it is a number, later need to account for possible err
      //fetch user data from online
      let user = await AsyncStorage.getItem('UID');
      Actions.homeScreen();
      // this.setState({isLoggedIn: true});
    }
  }

  render () {
    //Control flow for main app scene
    return (
      <Router>
        <Scene key = 'root' hideNavBar>
          <Scene key = 'loginScreen' component={LoginScreen} title = 'Login Screen' hideNavBar />
          <Scene key = 'registerScreen' component = {RegisterScreen} title = 'Register Screen' hideNavBar />
          <Scene key = 'homeScreen' component={HomeScreen} title = 'Home Screen' hideNavBar initial/>
          <Scene key = 'choreTaskView' component = {ChoreTaskView} title = 'Task List' hideNavBar />
          <Scene key = 'myTaskView' component = {MyTaskView} title = 'My Tasks' hideNavBar />
          <Scene key = 'groupScreen' component = {GroupUserView} title = 'Group' hideNavBar />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
