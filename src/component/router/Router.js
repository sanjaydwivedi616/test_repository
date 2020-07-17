import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import TestMoviewDetails from "../TestMovieDetails";
const Users = lazy(() => import("../users/Users"));
const CovideIndiaCase = lazy(() => import("../covid_cases_india/CovideIndiaCase"));
const Userpost = lazy(() => import("../posts/Userpost"));
const Login = lazy(() => import("../Login"));
const Product = lazy(() => import("../Product"));
const PageNotFound = lazy(() => import("../Page-Not-Found"));
const TestMovieList = lazy(() => import("../TestMovieList"));


class Router extends Component {
  UNSAFE_componentWillMount() {
    if (localStorage.getItem('userLoginToken')) {
      this.props.userLoginStatusTrue();
    }
  }

  render() {
    return (
      <Suspense fallback={<Loading />}>
        {
          this.props.userLoginState.login ?
            <Switch>
              <Route exact path="/user-list" component={Users}></Route>
              <Route path="/user-post" component={Userpost}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/covide-cases-india" component={CovideIndiaCase}></Route>
              <Route component={PageNotFound} ></Route >
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Login}></Route>
              <Route exact path="/test-movie-list" component={TestMovieList}></Route>
              <Route exact path="/test-movie-details" component={TestMoviewDetails}></Route>
              <Route component={PageNotFound} ></Route >
            </Switch>
        }

      </Suspense >
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
  mapStateToProps, mapDispatchToProps)(Router);