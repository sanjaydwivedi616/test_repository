import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { connect } from "react-redux"
import { fetchUsers } from '../../redux'
import AddUser from "./AddUser"
import UserDetails from "./UserDetails"

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      NewUserDOB: "",
      updatedDOBnew: "",
      newUserGender: "",
      newUserNationality: "",
      newUserStates: "",
      newUserCity: "",
      newUserStreet: "",
      newUserZipCode: "",
      newUserIdProof: "",
      editing: false,
      openModel: false,
      selectedUserId: "",
    };
  }
  getUserList() {
    this.props.fetchUsers();
  }
  viewUserDetails = (id) => {
    this.setState({
      openModel: true,
      selectedUserId: id
    })
  }

  deleteUserToList = (id) => {
    const userDelete = window.confirm("Do you want to Delete this user?");
    if (userDelete === true) {
      axios.delete(`http://localhost:2000/users/registration/${id}`).then(result => {
        this.setState({
          newUserName: "",
          newUserEmail: "",
          newUserMobile: "",
          NewUserDOB: "",
          newUserGender: "",
          newUserNationality: "",
          newUserStates: "",
          newUserCity: "",
          newUserStreet: "",
          newUserZipCode: "",
          newUserIdProof: "",
          UpdateId: "",
          editing: false
        })
        this.getUserList();
      })
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userData.users.length !== this.props.userData.users.length) {
      this.props.fetchUsers();
    } else {
      return
    }
  }

  editUserToList = (id) => {
    this.props.userData.users.map(user => {
      if (id === user._id) {
        this.setState({
          editing: true,
          newUserName: user.name,
          newUserEmail: user.email,
          newUserMobile: user.mobile,
          NewUserDOB: user.DOB,
          newUserGender: user.gender,
          newUserNationality: user.address.nationality,
          newUserStates: user.address.states,
          newUserCity: user.address.city,
          newUserStreet: user.address.street,
          newUserZipCode: user.address.zipCode,
          newUserIdProof: user.idProof,
          UpdateId: user._id,
        })
      }
    })
  }

  cancleEditUser = () => {
    this.setState({
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      NewUserDOB: "",
      newUserGender: "",
      newUserNationality: "",
      newUserStates: "",
      newUserCity: "",
      newUserStreet: "",
      newUserZipCode: "",
      newUserIdProof: "",
      editing: false,
    })
  }

  EditUserInTheList = (event) => {
    event.preventDefault();
    let id = this.state.UpdateId;

    axios.put(`http://localhost:2000/users/registration/${id}`, {
      name: this.state.newUserName,
      email: this.state.newUserEmail,
      mobile: this.state.newUserMobile,
      DOB: this.state.NewUserDOB,
      gender: this.state.newUserGender,
      address: {
        nationality: this.state.newUserNationality,
        states: this.state.newUserStates,
        city: this.state.newUserCity,
        street: this.state.newUserStreet,
        zipCode: this.state.newUserZipCode
      },
      idProof: this.state.newUserIdProof,
      edited: true,
    }).then(result => {
      this.setState({
        newUserName: "",
        newUserEmail: "",
        newUserMobile: "",
        NewUserDOB: "",
        newUserGender: "",
        newUserNationality: "",
        newUserStates: "",
        newUserCity: "",
        newUserStreet: "",
        newUserZipCode: "",
        newUserIdProof: "",
        UpdateId: "",
        editing: false,
      })
      this.getUserList()
    })
  }

  changeUserInput = (e) => {
    const stringValidetion = /^[a-zA-Z\b]+$/;
    const numberValidetion = /^[0-9\b]+$/;
    let feildName = [e.target.name]
    if (feildName == "newUserName") {
      if (e.target.value === '' || stringValidetion.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value.substr(0, 10)
        })
      }
    } else if (feildName == "newUserMobile") {
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

    let UpadtedDOB = (fromDate.getMonth() + 1) + "/" + fromDate.getDate() + "/" + fromDate.getFullYear();

    this.setState({
      NewUserDOB: UpadtedDOB,
    });
  }

  componentDidMount() {
    this.getUserList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userData.users.length !== this.props.userData.users.length) {
      this.props.fetchUsers();
    }
  }

  render() {
    const { editing } = this.state;
    const { userData } = this.props;
    return (
      <div className="container-fluid">
        {editing ?
          <form onSubmit={this.EditUserInTheList}>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <span><b>Name:</b></span>
                    <input className="form-control" type="text" name="newUserName" value={this.state.newUserName}
                      onChange={this.changeUserInput} placeholder="Name" autoComplete="off"
                    />
                  </td>
                  <td>
                    <span><b>Email:</b></span>
                    <input className="form-control" type="Email" name="newUserEmail" value={this.state.newUserEmail}
                      onChange={this.changeUserInput} placeholder="Email" autoComplete="off" />
                  </td>
                  <td>
                    <span><b>Mobile:</b></span>
                    <input className="form-control" type="text" name="newUserMobile" value={this.state.newUserMobile}
                      onChange={this.changeUserInput} placeholder="Mobile" autoComplete="off" />
                  </td>
                  <td>
                    <span><b>DOB:</b>(MM/DD/YYYY)</span>
                    <DatePicker className="form-control" dateFormat="MM/dd/yyyy"
                      selected={new Date(this.state.NewUserDOB)}
                      onChange={this.DOBChange} maxDate={new Date()}
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
                    <select className="form-control" name="newUserStates"
                      value={this.state.newUserStates}
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
                    <select className="form-control" name="newUserCity"
                      value={this.state.newUserCity}
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
                    <input className="form-control" type="text" name="newUserStreet" value={this.state.newUserStreet}
                      onChange={this.changeUserInput} placeholder="Street" autoComplete="off"
                    />
                  </td>
                  <td>
                    <span><b>Zipe Code:</b></span>
                    <input className="form-control" type="text" name="newUserZipCode" value={this.state.newUserZipCode}
                      onChange={this.changeUserInput} placeholder="Zip Code" autoComplete="off"
                    />
                  </td>
                  <td>
                    <span><b>ID Proof:</b></span>
                    <input className="form-control" type="text" name="newUserIdProof" value={this.state.newUserIdProof}
                      onChange={this.changeUserInput} placeholder="ID Proof" autoComplete="off"
                    />
                  </td>
                  <td>
                    <button type="submit" >Update User</button>
                    <button className="delete" onClick={this.cancleEditUser}>Cancle</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          :
          <AddUser userlist={userData} />
        }
        <table className="table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Nationality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.users.length > 0 ? userData.users.map((user, index) => {
              return (
                <>
                  <tr key={user._id}>
                    <td>{index + 1}.</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.DOB}</td>
                    <td>{user.gender}</td>
                    <td>{user.address.nationality}</td>
                    <td>
                      <button data-toggle="modal" data-target="#myModal" onClick={() => this.viewUserDetails(user._id)}>View Details</button>
                      <button disabled={user.edited} onClick={() => this.editUserToList(user._id)}>Edit</button>
                      <button className="delete" onClick={() => this.deleteUserToList(user._id)}>X</button>
                    </td>
                  </tr>
                </>
              )
            }) :
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No recored found</td>
              </tr>
            }
          </tbody>
        </table>
        <UserDetails selectedUserId={this.state.selectedUserId} userData={userData} />
      </div>
    );
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
)(Users);
