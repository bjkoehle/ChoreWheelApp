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
    marginTop: '20%',
    marginLeft: '10%',
    marginRight: '10%',
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
  }
})
