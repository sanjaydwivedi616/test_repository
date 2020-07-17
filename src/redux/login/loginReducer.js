const loginState = {
  login: false,
}

const logdinUser = (state = loginState, action) => {
  switch (action.type) {
    case "userLogdin": return {
      login: true
    }
    case "userLogout": return {
      login: false
    }
    default: return state
  }
}
export default logdinUser;