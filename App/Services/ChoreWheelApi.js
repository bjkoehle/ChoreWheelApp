import {AsyncStorage} from 'react-native'

export function login(credentials) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
}

export function register(user) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });
}

export function getUser(userId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/user/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    });
}

export function updateUser(user, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(user)
    });
}

export function createGroup(group, userId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/group/create/'+ userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(group)
    });
}

export function getGroup(groupId, auth) {
  if(groupId !== 0){
    return fetch('https://chorewheelandroid.herokuapp.com/api/group/' + groupId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + auth
        },
      });
  }
  else{
    return AsyncStorage.getItem('Group');
  }
}

export function joinGroup(groupId, userId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/group/add/' + groupId + '/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    });
}

export function leaveGroup(groupId, userId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/group/remove/' + groupId + '/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    });
}

export function createChore(chore, groupId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/chore/create/' + groupId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(chore)
    });
}

export function getChore(choreId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/chore/' + choreId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    });
}

export function updateChore(chore, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/chore/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(chore)
    });
}

export function deleteChore(choreId, auth) {
  return fetch('https://chorewheelandroid.herokuapp.com/api/chore/' + choreId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    });
}
