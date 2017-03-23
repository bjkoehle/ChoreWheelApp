import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    borderRadius: 25,
    margin: '5%',
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  ico: {
    textAlign: 'center'
  }
})
