import axios from 'axios';
import {Alert} from 'react-native'
import { post, put, get, destroy, getResponseData, getErrorMessage, API_BASE} from '../libs/http'

import {
    AUTH_FAIL,
    AUTH_USER,
    AUTH_PASSWORD,
    AUTH_DESTROY,
    RESET_PASSWORD,
    GET_RETREIVE_DATA,
    GET_EMAIL,
    REGISTER_DEVICE,
    STORE_DEVICE,
    AUTH_SIGN_UP,
    DELETE_DEVICE,
    LOG_OUT_FACEBOOK,
    LOG_OUT_APPLE,
    FORGOT_PASSWORD,
    ADD_LOCAL_DEVICE
  } from '../constants'

  export  function authenticationsUser  ({ username, password }) {
    console.log('esta es la api:', API_BASE)   
  console.log('ESTOS SON LOS DATOS', username, password)
    return{ 
   type: AUTH_USER,
   payload:  axios.post(`${API_BASE}/wp-json/jwt-auth/v1/token/`,
   {
    username,
    password
  }  
  
   )
      .then(getResponseData)
      .catch(function(error) {
      console.log(error);
      })
      
  
     }
   }
  export function authSignOut (auth){
    return{
        type:AUTH_DESTROY,
        payload:auth.token
    }
  }