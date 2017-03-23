import React from 'react'
import { View } from 'react-native'

import styles from './Styles/HomeScreenButtonStyles'
import LargeRoundedButton from '../Components/LargeRoundedButton'

export default class HomeScreenButton extends React.Component {
  render(){
    return(
      <View>
        <View style={styles.view}>
          <LargeRoundedButton text = 'Group' icon='user-o' size = {50} />
          <LargeRoundedButton text='Settings' icon='cog' size = {55} />
        </View>
        <View style={styles.view}>
          <LargeRoundedButton text='Chore List' icon = 'list-alt' size = {60} />
          <LargeRoundedButton text='My Tasks' icon = 'check-square-o' size = {60} />
        </View>
      </View>
    )
  }
}
