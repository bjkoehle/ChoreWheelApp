import React from 'react'
import { View, Image } from 'react-native'
import { Metrics } from '../Themes'

export default class SplashScreen extends React.Component {
  render(){
    return(
      <View style = {{alignItems: 'center',justifyContent:'center',flex:1,backgroundColor:'forestgreen'}}>
        <Image  source= {require('./Images/ChoreWheelMock.png')}
                style = {{justifyContent: 'space-around', width:(Metrics.screenWidth*.96), height: (Metrics.screenWidth*.96), margin: '2%'}}
                resizeMode='contain'  />
      </View>
    )
  }
}
