import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../chorewheel/HomeScreen'
import RegisterScreen from '../chorewheel/RegisterScreen'
import ChoreTaskView from '../chorewheel/ChoreTaskView'
import MyTaskView from '../chorewheel/MyTasksView'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    //Control flow for main app scene
    return (
      <Router>
        <Scene initial key='launchScreen' component={LaunchScreen} title='LaunchScreen' hideNavBar/>
        <Scene key = 'loginScreen' component={LoginScreen} title = 'Login Screen' hideNavBar type='reset'/>
        <Scene key = 'homeScreen' component={HomeScreen} title = 'Home Screen' hideNavBar />
        <Scene key = 'registerScreen' component={RegisterScreen} title = 'Register Screen' hideNavBar />
        <Scene key = 'choreTaskView' component = {ChoreTaskView} title = 'Task List' hideNavBar />
        <Scene key = 'myTaskView' component = {MyTaskView} title = 'My Tasks' hideNavBar />
      </Router>
    )
  }
}

export default NavigationRouter
