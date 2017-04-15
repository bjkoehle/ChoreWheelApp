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
  modalButton: {
     marginTop: 10
  },
  modalBackground:{
    backgroundColor: 'rgba(0,0,0,.5)',
    height: '100%',
    width:'100%',
    flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  modalContent: {
    height: '75%',
    width: '80%',
    borderRadius:15,
    backgroundColor:'rgb(240,240,240)',
    marginHorizontal:'10%',
    marginVertical:'15%'
  },
  textInput:{
    borderWidth: 1,
    borderColor: 'black'
  },
  row: {
    marginTop: '3%',
    marginLeft: '15%',
    marginRight: '15%',
  },
  rowLabel: {
    color: '#000000',
    fontSize: 24
  },
  buttonsView:{
    marginHorizontal: '10%',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  cancelButton:{
    borderRadius:15,
    backgroundColor: '#ff1c1cf0',
    paddingVertical: 10,
    marginRight:'10%',
    flex: 1
  },
  doneButton:{
    borderRadius: 15,
    backgroundColor: '#32cd329f',
    paddingVertical: 10,
    flex: 1
  }
})
