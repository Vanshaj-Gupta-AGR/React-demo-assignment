import { APIUrls } from "../helpers/url";
import { LOGIN_FAILED, CLEAR_AUTH_STATE,LOGIN_START, LOGIN_SUCCESS,SIGNUP_START,SIGNUP_FAILED,SIGNUP_SUCCESS,AUTHENTICATE_USER,LOG_OUT } from "./actionTypes";
import { getFormBody, gettoken } from "../helpers/utils";

export function startLogin(){
    return {
        type: LOGIN_START
    }
}
export function loginFailed(erroMessage){
    return {
        type: LOGIN_FAILED,
        error: erroMessage
    }
}
export function loginSuccess(user){
    return {
        type: LOGIN_SUCCESS,
        user
       
    }
}

export function login(email, password) {
    return (dispatch) => {
      dispatch(startLogin());
      const url = APIUrls.login();
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: getFormBody({ email, password }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log('data', data);
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
            console.log(data)
            await dispatch(loginSuccess(data.user));
            return ;
          }
          dispatch(loginFailed(data.message));
        });
    };
  }
  export function authenticateUser(user) {
    return {
      type: AUTHENTICATE_USER,
      user,
    };
  }
  
  export function logoutUser() {
    return {
      type: LOG_OUT,
    };
  }
  
  export function signup(email, password,firstname,lastname,phoneno,address) {
    return (dispatch) => {
      const url = APIUrls.signup();
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: getFormBody({
          email,
          password,
          address,
          phoneno,
          firstname,
          lastname,
         
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data);
          if (data.data.user) {
            // do something
            dispatch(signupSuccessful(data.data.user));
            return;
          }
          dispatch(signupFailed(data.message));
        });
    };
  }
  
  export function startSignup() {
    return {
      type: SIGNUP_START,
    };
  }
  
  export function signupFailed(error) {
    return {
      type: SIGNUP_FAILED,
      error,
    };
  }
  
  export function signupSuccessful(user) {
    return {
      type: SIGNUP_SUCCESS,
      user,
    };
  }

  export function clearAuthState() {
    return {
      type: CLEAR_AUTH_STATE,
    };
  }

 

  