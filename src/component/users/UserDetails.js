import React from "react";

function UserDetails(props) {
  const { userData, selectedUserId } = props;
  return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h6 style={{ color: "#FFF" }}>USER INFO</h6>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            {userData.users.filter(users => users._id === selectedUserId).map(filteredPerson => (
              <table className="table" key={filteredPerson.id}>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{filteredPerson.name}</td>
                    <td>Email</td>
                    <td>{filteredPerson.email}</td>
                    <td>Gender</td>
                    <td>{filteredPerson.gender}</td>
                  </tr>
                  <tr>
                    <td>DOB</td>
                    <td>{filteredPerson.DOB}</td>
                    <td>Mobile</td>
                    <td>{filteredPerson.mobile}</td>
                    <td>Country</td>
                    <td>{filteredPerson.address.nationality}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{filteredPerson.address.states}</td>
                    <td>City</td>
                    <td>{filteredPerson.address.city}</td>
                    <td>Street</td>
                    <td>{filteredPerson.address.street}</td>
                  </tr>
                  <tr>
                    <td>Zip</td>
                    <td>{filteredPerson.address.zipCode}</td>
                    <td>ID Proof</td>
                    <td>{filteredPerson.idProof}</td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default UserDetails;