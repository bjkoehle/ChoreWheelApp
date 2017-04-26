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
  settingList:{
    marginTop: '15%',
    marginBottom: '5.5%'
  },
  headerText: {
    fontSize: 34,
    color: 'white',
    position: 'absolute'
  },
  settingRow:{
    flexDirection: 'row',
    flex: 12,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontSize: 28
  },
  default: {
    margin: '5%',
    alignItems: 'center'
  },
  groupModal: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    backgroundColor: 'white',
    borderRadius: 15
  },
  rowLabel: {
    color: '#000000',
    fontSize: 24
  },
  textInput:{
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  smallDes: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  switcher: {
    paddingTop: '4%',
    alignItems: 'center'
  },
  description: {
    paddingTop: 20
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
  },
  container:{
    marginTop: '30%',
    marginBottom: '5.5%',
    marginHorizontal: '10%',
    paddingHorizontal: '10%',
    paddingVertical: '10%',
    borderRadius: 15,
    backgroundColor: 'rgba(240,240,240,1)'
  }
})
