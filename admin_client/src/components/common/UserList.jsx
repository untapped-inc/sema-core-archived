import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import Button from "react-bootstrap/lib/Button";

import "react-table/react-table.css";

const propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func
};

const defaultProps = {
  columns: [],
  data: [],
  onDeleteClick: () => {},
  onEditClick: () => {}
}

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
      }
    ];

    return (
      <ReactTable
        data={this.props.data[0]}
        columns={userColumns}
        className="-striped"
      />
    )
  }
}

UserList.propTypes = propTypes;
UserList.defaultProps = defaultProps;

export default UserList;
