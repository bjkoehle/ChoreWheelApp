import React from 'react'
import { Text, Image, View } from 'react-native'
import HomeScreenButton from './HomeScreenButton'

import styles from './Styles/HomeScreenStyles'

export default class HomeSCreen extends React.Component {
  render(){
    return(
      <View style = {styles.default}>
        <HomeScreenButton />
      </View>
    )
  }
}
