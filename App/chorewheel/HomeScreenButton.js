import React from 'react'
import { View } from 'react-native'

import styles from './Styles/HomeScreenButtonStyles'
import LargeRoundedButton from '../Components/LargeRoundedButton'

export default class HomeScreenButton extends React.Component {
  render(){
    return(
      <View style={styles.default}>
        <View style={styles.view}>
          <LargeRoundedButton text = 'Group' icon='group' size = {70} />
          <LargeRoundedButton text='Settings' icon='cog' size = {75} />
        </View>
        <View style={styles.view}>
          <LargeRoundedButton text='Chore List' icon = 'list-alt' size = {80} />
          <LargeRoundedButton text='My Tasks' icon = 'check-square-o' size = {80} />
        </View>
      </View>
    )
  }
}
