// @flow
import axios from 'axios';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import path from 'ramda/es/path';
// import {
//   BASE_URL,
//   SOCKET_BASE
  
// } from 'react-native-dotenv'
const BASE_URL = 'https://sociosporcolombia.com'
export const API_BASE = BASE_URL
export const getResponseData: (item: Object) => any = path(['data']);

export const getErrorMessage: (item: Object) => any = path(['response', 'errors', 'data']);

