import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, } from "react-router-dom";
import Loading from "../Loading";
const PageNotFound = lazy(() => import("../Page-Not-Found"));
const TestMovieList = lazy(() => import("../TestMovieList"));
const TestMoviewDetails = lazy(() => import("../TestMovieDetails"));


class Router extends Component {

  render() {
    return (
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={TestMovieList}></Route>
          <Route path="/test-movie-details" component={TestMoviewDetails}></Route>
          <Route component={PageNotFound} ></Route >
        </Switch>
      </Suspense >
    )
  }
}

export default Router;