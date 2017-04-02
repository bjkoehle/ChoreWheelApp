import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    borderRadius: 25,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    borderWidth: .5,
    borderColor: 'black'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: Fonts.size.h6,
    marginVertical: '3%'
  },
  ico: {
    textAlign: 'center'
  }
})
