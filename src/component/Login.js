import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Users from './users/Users';
import { connect } from "react-redux"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMsg: "",
    }
  }

  changeUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  userLoginValidetion = (e) => {
    e.preventDefault()
    const userCredential = {
      email: this.state.email,
      password: this.state.password,
    }
    if (userCredential.email === "") {
      this.setState({
        errorMsg: "Fill email Id"
      })
      return false;
    }
    if (userCredential.password === "") {
      this.setState({
        errorMsg: "Fill password"
      })
      return false;
    }
    axios.post("http://localhost:2000/users/login", userCredential).then(responce => {
      this.setState({
        errorMsg: responce.data.message
      })
      if (responce.data.message === undefined) {
        localStorage.setItem(`userLoginToken`, responce.data.token);
        localStorage.setItem(`expiresIn`, responce.data.expiresIn);
        this.loginUserRedirect();
      }
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.loginUserRedirect()
  }

  loginUserRedirect = () => {
    if (localStorage.getItem('userLoginToken')) {
      this.props.userLoginStatusTrue();
      //.context.router.history.push('/users');
      this.props.history.push('/user-list');
    }
  }

  render() {
    const { email, password, errorMsg, loggedIn } = this.state;
    return (
      <>
        {!loggedIn ?
          <div className="login-form">
            <form className="form-horizontal" onSubmit={this.userLoginValidetion}>
              <span className="error-msg">{errorMsg}</span>
              <div className="form-group">
                <label className="control-label ">Email</label>
                <input type="email" className="form-control" placeholder="Email" name="email"
                  value={email} onChange={this.changeUserInput} />
              </div>
              <div className="form-group">
                <label className="control-label ">Password</label>
                <input type="password" className="form-control" placeholder="Password" name="password"
                  value={password} onChange={this.changeUserInput} />
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2">
                  <div className="checkbox">
                    <label><input type="checkbox" name="remember" /> Remember me</label>
                  </div>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-5">
                  <button type="submit">Submit</button>
                </div>
                <div className="col-sm-5">
                  <Link to="/Users">Sign Up User</Link>
                </div>
              </div>
            </form>
          </div> : <Users />
        }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    userLoginState: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLoginStatusTrue: () => dispatch({ type: 'userLogdin' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);