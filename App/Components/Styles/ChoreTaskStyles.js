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
  },
  touchableView: {
    flexDirection: 'row',
    flex: 12,
  },
  headerText: {
    fontSize: 34,
    color: 'white',
    position: 'absolute'
  },
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
  inputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1
  },
  modalButton: {
     marginTop: 10
  }
})
