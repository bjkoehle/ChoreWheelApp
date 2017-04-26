import React, { Component } from 'react'
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'

// screens identified by the router
import SplashScreen from '../chorewheel/SplashScreen'
import LoginScreen from '../chorewheel/LoginScreen'
import HomeScreen from '../chorewheel/HomeScreen'
import ChoreTaskView from '../chorewheel/ChoreTaskView'
import MyTaskView from '../chorewheel/MyTasksView'
import GroupUserView from '../chorewheel/GroupUserView'
import RegisterScreen from '../chorewheel/RegisterScreen'
import SettingScreen from '../chorewheel/SettingScreen'
import AddChoreScreen from '../chorewheel/AddChoreScreen'

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
    let data = JSON.parse(await AsyncStorage.getItem('UID'));//User in local
    if(data === null){
      setTimeout(function(){Actions.loginScreen({type: ActionConst.REPLACE})}, 1500);
    }
    else{
      setTimeout(function(){Actions.homeScreen({type: ActionConst.REPLACE})}, 1500);
    }
  }

  render () {
    //Control flow for main app scene
    return (
      <Router>
        <Scene key = 'root' hideNavBar>
          <Scene key = 'splashScreen' component = {SplashScreen} title = 'Spash' hideNavBar initial/>
          <Scene key = 'loginScreen' component = {LoginScreen} title = 'Login Screen' hideNavBar />
          <Scene key = 'registerScreen' component = {RegisterScreen} title = 'Register Screen' hideNavBar />
          <Scene key = 'homeScreen' component = {HomeScreen} title = 'Home Screen' hideNavBar />
          <Scene key = 'choreListScreen' component = {ChoreTaskView} title = 'Task List' hideNavBar />
          <Scene key = 'myTasksScreen' component = {MyTaskView} title = 'My Tasks' hideNavBar />
          <Scene key = 'groupScreen' component = {GroupUserView} title = 'Group' hideNavBar />
          <Scene key = 'settingsScreen' component = {SettingScreen} title = 'Settings' hideNavBar />
          <Scene key = 'addChoreScreen' component = {AddChoreScreen} title = 'Add Chore' hideNavBar />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
