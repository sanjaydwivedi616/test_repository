import React from "react";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "../src/component/router/Router"

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <Router />
      <Footer></Footer>
    </div>
  );
}

export default App;
