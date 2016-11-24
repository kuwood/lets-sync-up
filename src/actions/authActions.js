import axios from 'axios'
import * as userActions from './userActions'

export const AUTH_USER = 'AUTH_USER'

export const authUser = (bool) => {
  return {
    type: AUTH_USER,
    isAuthenticated: bool
  }
}

export const requestLogin = (data) => {
  return function(dispatch) {
    let url = '/login'
    axios({
        method: 'post',
        url: url,
        data: JSON.stringify({
          username: data.username,
          password: data.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        dispatch(authUser(true))
        localStorage.setItem('auth', true)
        dispatch(userActions.alias(response.data.alias))
        return response;
      })
      .catch(function (error) {
        alert(`${error}`)
      })
  }
}

export const checkAuth = () => {
  return function(dispatch) {
    let url = '/auth'
    axios({
      method: 'get',
      url: url
    })
      .then(function(response) {
        if (response.data._id) {
          dispatch(authUser(true))
          dispatch(userActions.alias(response.data.alias))
        }
        return response
      })
      .catch(function(error) {
        alert(`Uh oh! ${error}`)
      })
  }
}

export const requestProfile = () => {
  return function(dispatch) {
    let url = '/getprofile'
    axios({
      method: 'get',
      url: url
    })
      .then(function(response) {
        if (response.status >= 500) {
          throw new Error(response.status)
        } else if ((response.status >= 400) && (response.status < 500)) {
          console.log(response.status);
        }
        if (response.data._id) {
          dispatch(authUser(true))
          dispatch(userActions.alias(response.data.alias))
        }
        // dispatch favorites
        // dispatch username
        return response
      })
      .catch(function(error) {
        console.log(`Oh no! we have an error. ${error}`);
      })
  }
}
