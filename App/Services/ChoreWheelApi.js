export async function login(credentials, user) {
  var value = await fetch('https://chorewheelandroid.herokuapp.com/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    .catch(error => {console.log(error)});
    user = value;
    return user
}

export function register(user) {
  fetch('https://chorewheelandroid.herokuapp.com/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function getUser(userId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/user/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function updateUser(user, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(user)
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function createGroup(group, userId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/group/create/'+ userId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(group)
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function getGroup(groupId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/group/' + groupId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function updateGroup(groupId, userId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/group/add/' + groupId + '/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function createChore(chore, groupId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/chore/create/' + groupId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(chore)
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function getChore(choreId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/chore/' + choreId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function updateChore(chore, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/chore/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
      body: JSON.stringify(chore)
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}

export function deleteChore(choreId, auth) {
  fetch('https://chorewheelandroid.herokuapp.com/api/chore/' + choreId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + auth
      },
    })
    .then(response => {console.log(JSON.parse(response._bodyInit))})
    .catch(error => {console.log(error)})
}
