import { StyleSheet } from 'react-native'

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
  content: {
    marginTop: '15%',
    marginBottom: '5.5%'
  },
  headerText: {
    fontSize: 34,
    color: 'white',
    position: 'absolute'
  },
  container: {
    flex :1
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
  buttonContainer: {
    backgroundColor: '#32cd329f',
    paddingVertical: 10,
    borderRadius: 25
  },
  buttonText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 24
  },
  textInput:{
    backgroundColor: 'ghostwhite',
    borderRadius: 20
  }
})
