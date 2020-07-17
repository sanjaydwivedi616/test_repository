
const logdinUserRequest = () => {
  return {
    type: "userLogdin"
  }
}

export const logdin = () => {
  return (dispatch) => {
    dispatch(logdinUserRequest);
  }
}