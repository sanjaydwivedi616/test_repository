import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUsers } from '../../redux';
import { connect } from "react-redux";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      NewUserDOB: "",
      fromDate: new Date(),
      newUserGender: "",
      newUserNationality: "",
      states: "",
      city: "",
      street: "",
      zipCode: "",
      idProof: "",
      editing: false,
      fields: {},
      errors: {},
      errorsRespo: ""
    };
  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let users = [...this.state.users];
    users[i] = { ...users[i], [name]: value };
    this.setState({ users });
  }


  formValidation = () => {
    let errors = {};
    let formIsValid = true;

    const user = this.state;
    if (user.newUserName === "") {
      formIsValid = false;
      errors["newUserName"] = "Fill User Name";
    }
    if (user.newUserEmail === "") {
      formIsValid = false;
      errors["newUserEmail"] = "Fill User Email";
    }
    if (user.newUserMobile === "") {
      formIsValid = false;
      errors["newUserMobile"] = "Fill User Mobile";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  addUserInTheList = (event) => {
    event.preventDefault();

    if (this.formValidation()) {
      let UserDOB = (this.state.fromDate.getMonth() + 1) + "/" + this.state.fromDate.getDate() + "/" + this.state.fromDate.getFullYear();
      const users = {
        _id: Math.random(),
        name: this.state.newUserName,
        email: this.state.newUserEmail,
        password: "sanjay@123",
        mobile: this.state.newUserMobile,
        DOB: UserDOB,
        gender: this.state.newUserGender,
        address: {
          nationality: this.state.newUserNationality,
          states: this.state.states,
          city: this.state.city,
          street: this.state.street,
          zipCode: this.state.zipCode,
        },
        idProof: this.state.idProof,
        edited: false,
      }
      axios.post("http://localhost:2000/users/registration", users).then(result => {

        if (result.data.msg) {
          this.setState({
            errorsRespo: result.data.msg,
          })
        } else {
          this.setState({
            newUserName: "",
            newUserEmail: "",
            newUserMobile: "",
            NewUserDOB: "",
            newUserGender: "",
            newUserNationality: "",
            states: "",
            city: "",
            street: "",
            zipCode: "",
            idProof: "",
            errorsRespo: ""
          })
          this.props.fetchUsers();
        }
      })
    }
  }

  changeUserInput = (e) => {
    const stringValidetion = /^[a-zA-Z\b]+$/;
    const numberValidetion = /^[0-9\b]+$/;
    let feildName = [e.target.name]
    if (feildName === "newUserName") {
      if (e.target.value === '' || stringValidetion.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value.substr(0, 10)
        })
      }
    } else if (feildName === "newUserMobile") {
      if (e.target.value === '' || numberValidetion.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value.substr(0, 10)
        })
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  DOBChange = fromDate => {
    this.setState({
      NewUserDOB: fromDate,
      fromDate: fromDate,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addUserInTheList}>
          {this.state.errorsRespo ?
            <div className="alert alert-danger">
              <span>{this.state.errorsRespo}</span>
            </div> : null
          }
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <span><b>Name:</b></span>
                  <input className="form-control" type="text" name="newUserName" value={this.state.newUserName}
                    onChange={this.changeUserInput} placeholder="Name" autoComplete="off"
                  />
                  <span className="error-msg">{this.state.errors["newUserName"]}</span>
                </td>
                <td>
                  <span><b>Email:</b></span>
                  <input className="form-control" type="Email" name="newUserEmail" value={this.state.newUserEmail}
                    onChange={this.changeUserInput} placeholder="Email" autoComplete="off" />
                  <span className="error-msg">{this.state.errors["newUserEmail"]}</span>
                </td>
                <td>
                  <span><b>Mobile:</b></span>
                  <input className="form-control" type="text" name="newUserMobile" value={this.state.newUserMobile}
                    onChange={this.changeUserInput} placeholder="Mobile" autoComplete="off" />
                  <span className="error-msg">{this.state.errors["newUserMobile"]}</span>
                </td>
                <td>
                  <span><b>DOB:</b></span>
                  <DatePicker className="form-control" dateFormat="MM/dd/yyyy"
                    selected={this.state.NewUserDOB}
                    onChange={this.DOBChange} maxDate={new Date()}
                    placeholderText="MM/DD/YYYY"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </td>
                <td>
                  <span><b>Gender:</b></span>
                  <select className="form-control" name="newUserGender"
                    value={this.state.newUserGender}
                    onChange={this.changeUserInput}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
                <td>
                  <span><b>Nationality:</b></span>
                  <select className="form-control" name="newUserNationality"
                    value={this.state.newUserNationality}
                    onChange={this.changeUserInput}>
                    <option value=""></option>
                    <option value="Indian">Indian</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <span><b>State:</b></span>
                  <select className="form-control" name="states"
                    value={this.state.states}
                    onChange={this.changeUserInput}>
                    <option value=""></option>
                    <option value="Indian">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </td>
                <td>
                  <span><b>City:</b></span>
                  <select className="form-control" name="city"
                    value={this.state.city}
                    onChange={this.changeUserInput}>
                    <option value=""></option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Ranchi">Ranchi</option>
                    <option value="Deharadun">Deharadun</option>
                    <option value="Sirsha">Sirsha</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </td>
                <td>
                  <span><b>Street:</b></span>
                  <input className="form-control" type="text" name="street" value={this.state.street}
                    onChange={this.changeUserInput} placeholder="Street" autoComplete="off"
                  />
                </td>
                <td>
                  <span><b>Zipe Code:</b></span>
                  <input className="form-control" type="text" name="zipCode" value={this.state.zipCode}
                    onChange={this.changeUserInput} placeholder="Zip Code" autoComplete="off"
                  />
                </td>
                <td>
                  <span><b>ID Proof:</b></span>
                  <input className="form-control" type="text" name="idProof" value={this.state.idProof}
                    onChange={this.changeUserInput} placeholder="ID Proof" autoComplete="off"
                  />
                </td>
                <td>
                  <button type="submit">Add User</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userData: state.user,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
