import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Button from 'react-bootstrap/lib/Button';

import 'react-table/react-table.css';

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
};

class UserList extends React.Component {
  renderButtons(row) {
    const userId = row.original.id;
    const { onEditClick, onDeleteClick } = this.props;
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={e => onEditClick(userId)}
        >
          Edit
        </Button>
        <Button
          bsStyle="danger"
          bsSize="small"
          onClick={e => onDeleteClick(userId)}
        >
          Delete
        </Button>
      </div>
    );
  }

  render() {
    const userColumns = [
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        id: 'name',
        Header: 'Name',
        accessor: d => `${d.firstName} ${d.lastName}`
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Actions',
        Cell: row => this.renderButtons(row)
      }
    ];

    return (
      <ReactTable
        data={this.props.data[0]}
        columns={userColumns}
        className="-striped"
      />
    );
  }
}

UserList.propTypes = propTypes;
UserList.defaultProps = defaultProps;

export default UserList;
