import React from 'react'
import { View } from 'react-native'
import {Actions} from 'react-native-router-flux'

import styles from './Styles/HomeScreenButtonStyles'
import LargeRoundedButton from '../Components/LargeRoundedButton'

export default class HomeScreenButton extends React.Component {

  constructor(props){
    super(props);
  }

  navSettingsPage(){
    Actions.settingsScreen();
  }

  navGroupPage = ()=>{
    Actions.groupScreen();
  }

  navChoreList = ()=>{
    Actions.choreListScreen();
  }

  navMyTasks = ()=>{
    Actions.myTasksScreen();
  }

  render(){
    return(
      <View style={styles.default}>
        <View style={styles.view}>
          <LargeRoundedButton text = 'Group' icon='group' size = {70} onPress = {this.navGroupPage} />
          <LargeRoundedButton text='Settings' icon='cog' size = {75} onPress = {this.navSettingsPage} />
        </View>
        <View style={styles.view}>
          <LargeRoundedButton text='Chore List' icon = 'list-alt' size = {80} onPress = {this.navChoreList} />
          <LargeRoundedButton text='My Tasks' icon = 'check-square-o' size = {80} onPress = {this.navMyTasks} />
        </View>
      </View>
    )
  }
}
