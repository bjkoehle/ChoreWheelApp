import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  choreRow:{
    flexDirection: 'row',
    flex: 12,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  timesIcon: {
    paddingTop: '2%',
    paddingBottom: '5%',
    paddingLeft: '3%',
    paddingRight: '3%',
    justifyContent: 'center'
  },
  checkIcon: {
    justifyContent: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '3%',
    paddingRight: '3%'
  },
  choreText: {
    justifyContent: 'center'
  },
  choreName: {
    fontSize: 28,
  },
  choreTime: {
    width: 100,
    fontSize: 16
  }
})
