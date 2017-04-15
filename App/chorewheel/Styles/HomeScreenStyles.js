import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  backgroundImage: {
    flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height:'100%'
  },
  default: {
    margin: '5%',
    alignItems: 'center',
  },
  circleImg: {
    justifyContent: 'space-around',
    width:(Metrics.screenHeight*.375),
    height: (Metrics.screenHeight*.375),
    margin: '2%'
  },
  headerText: {
    fontSize: 34,
    color: 'white',
    position: 'absolute'
  }
})
