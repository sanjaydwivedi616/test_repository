import { combineReducers } from 'redux'
import userReducer from './users/userReducer'
import loginReducer from './login/loginReducer'

const rootReducer = combineReducers({ user: userReducer, login: loginReducer })

export default rootReducer
