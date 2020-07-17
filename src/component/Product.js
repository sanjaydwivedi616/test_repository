import React, { Component } from "react";
import { Redirect } from "react-router-dom"

class Product extends Component {

  state = {
    name: "sanjay",
    referrer: null
  }

  changeState = () => {
    this.setState({
      name: "mohan"
    })
  }

  onclickHa = () => {
    this.setState({
      referrer: "/Users"
    })
  }

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;

    return (
      <>
        <p>{this.state.name}</p>
        <button onClick={this.onclickHa}>Redirect me!!!</button>
      </>
    )
  }
}

export default Product;
