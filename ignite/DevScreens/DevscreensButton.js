import React from 'react'
import { View, Modal, Text } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'
import PresentationScreen from './PresentationScreen'

import { Actions } from 'react-native-router-flux'
import Styles from './Styles/DevscreensButtonStyles'

export default class DevscreensButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  navOurApp = () => {
    Actions.homeScreen()
  }

  navTestOne = () => {
    Actions.choreTaskView()
  }

  navTestTwo = () => {
    Actions.myTaskView()
  }

  navTestThree = () => {
    Actions.registerScreen()
  }

  navTestFour = () => {
    Actions.loginScreen()
  }

  navTestFive = () => {
    Actions.settingScreen()
  }

  render () {
    if (DebugConfig.showDevScreens) {
      return (
        <View style={{margin: '5%'}}>
          <RoundedButton onPress={this.toggleModal}>
            Open Ignite test screens
          </RoundedButton>
          <Modal visible={this.state.showModal} onRequestClose={this.toggleModal} >
            <PresentationScreen screenProps={{toggle: this.toggleModal}} />
          </Modal>
          <RoundedButton onPress={this.navOurApp}>
            Start App
          </RoundedButton>
          <Text style = {Styles.text}>Test your pages here:</Text>
          <RoundedButton onPress = {this.navTestOne}>
            One
          </RoundedButton>
          <RoundedButton onPress = {this.navTestTwo}>
            Two
          </RoundedButton>
          <RoundedButton onPress = {this.navTestThree} >
            Register
          </RoundedButton>
          <RoundedButton onPress = {this.navTestFour} >
            Login
          </RoundedButton>
          <RoundedButton onPress = {this.navTestFive} >
            Settings
          </RoundedButton>
        </View>
      )
    } else {
      return (<View />)
    }
  }
}
