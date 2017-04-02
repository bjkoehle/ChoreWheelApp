import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../chorewheel/LoginScreen'
import HomeScreen from '../chorewheel/HomeScreen'
import ChoreTaskView from '../chorewheel/ChoreTaskView'
import MyTaskView from '../chorewheel/MyTasksView'
import GroupUserView from '../chorewheel/GroupUserView'
import RegisterScreen from '../chorewheel/RegisterScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    //Control flow for main app scene
    return (
      <Router>
        <Scene initial key='launchScreen' component={LaunchScreen} title='LaunchScreen' hideNavBar/>
        <Scene key = 'loginScreen' component={LoginScreen} title = 'Login Screen' hideNavBar />
        <Scene key = 'homeScreen' component={HomeScreen} title = 'Home Screen' hideNavBar />
        <Scene key = 'registerScreen' component={RegisterScreen} title = 'Register Screen' hideNavBar />
        <Scene key = 'choreTaskView' component = {ChoreTaskView} title = 'Task List' hideNavBar />
        <Scene key = 'myTaskView' component = {MyTaskView} title = 'My Tasks' hideNavBar />
        <Scene key = 'groupUserView' component = {GroupUserView} title = 'My Group' hideNavBar />
        <Scene key = 'registerScreen' component = {RegisterScreen} title = 'Register Screen' hideNavBar />
      </Router>
    )
  }
}

export default NavigationRouter
