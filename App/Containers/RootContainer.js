import React, { Component } from 'react'
import { View, StatusBar, Image } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'

// Styles
import styles from './Styles/RootContainerStyles'

export default class RootContainer extends Component {
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar hidden={true} barStyle='light-content' />
        <View style = {{position: 'absolute', flex: 1,height: '100%',width: '100%', backgroundColor: 'forestgreen'}} />
        <NavigationRouter />
      </View>
    )
  }
}
