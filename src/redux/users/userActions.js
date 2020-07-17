import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./userType";
import axios from "axios";


const featchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  }
}

const featchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users
  }
}

const featchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  }
}

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(featchUserRequest);
    axios.get("http://localhost:2000/users/registration").then(responce => {
      const users = responce.data;
      dispatch(featchUserSuccess(users));
    }).catch(error => {
      const errorMass = error;
      dispatch(featchUserFailure(errorMass));
    })
  }
}