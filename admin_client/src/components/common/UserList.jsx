import React from "react";
import ReactTable from "react-table";
import Button from "react-bootstrap/lib/Button";

import "react-table/react-table.css";

class UserList extends React.Component {
  render() {
    const userColumns = [{
        Header: "Username",
        accessor: "username"
      }, {
        Header: "Email",
        accessor: "email"
      }, {
        id: "name",
        Header: "Name",
        accessor: d => `${d.firstName} ${d.lastName}`
      }, {
        Header: "Role",
        accessor: "role"
      }, {
        Header: "Actions",
        Cell: row => (
          <div>
            <Button
              bsStyle="primary"
              bsSize="small"
              onClick={this.props.onEditClick}>
              Edit
            </Button>
            <Button
              bsStyle="danger"
              bsSize="small"
              onClick={this.props.onDeleteClick}>
              Delete
            </Button>
          </div>
        )
      }];

    return (
      <ReactTable
        data={this.props.data}
        columns={userColumns}
        className="-striped -highlight"
      />
    )
  }
}

export default UserList;
