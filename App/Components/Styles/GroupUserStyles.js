import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  userRow:{
    flexDirection: 'row',
    flex: 12,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  userIcon: {
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: '3%',
    paddingRight: '3%',
    justifyContent: 'center',
    color: 'black'
  },
  userName: {
    fontSize: 28,
    color: 'black'
  },
  userText: {
    justifyContent: 'center'
  },
  email: {
    fontSize: 14
  }
})
