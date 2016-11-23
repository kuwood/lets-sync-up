import fetch from 'isomorphic-fetch'

export const USER_LOGIN = 'USER_LOGIN'

export const userLogin = (data) => {
  return {
    type: USER_LOGIN,
    username: data.user,
    password: data.password
  }
}

export const requestLogin = (data) => {
  return function(dispatch) {
    let url = '/login'
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(user) {
        console.log(user, 'logged in');
      })
  }
}
