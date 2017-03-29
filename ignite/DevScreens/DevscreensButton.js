import React from 'react'
import { View, Modal } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'
import PresentationScreen from './PresentationScreen'

import { Actions } from 'react-native-router-flux'

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
    Actions.loginScreen()
  }

  navTestOne = () => {
    Actions.homeScreen()
  }
  navTestTwo = () => {
    Actions.registerScreen()
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
          <RoundedButton onPress={this.navTestOne}>
            Example tester 1
          </RoundedButton>
          <RoundedButton onPress={this.navTestTwo} >
           Register CUCK
          </RoundedButton>
          <RoundedButton >
            3
          </RoundedButton>
        </View>
      )
    } else {
      return (<View />)
    }
  }
}
