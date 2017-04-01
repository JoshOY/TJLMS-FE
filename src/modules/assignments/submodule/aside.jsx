import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import Assignment from 'src/datamodels/assignment';

import AuthActions from '../../auth/actions';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class AssignmentsAside extends React.Component {

  static propTypes = {
    // match: P.object.isRequired,
    dispatch: P.func.isRequired,
    assignmentList: P.arrayOf(P.instanceOf(Assignment)),
    currentAssignment: P.instanceOf(Assignment),
  };

  static defaultProps = {
    assignmentList: [],
    currentAssignment: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAssignmentMenuItems = () => {
    const { assignmentList } = this.props;
    return _.map(assignmentList, assignmentObj => (
      <MenuItem key={assignmentObj._id}>
        <Link to={`/assignments/${assignmentObj._id}`} key={assignmentObj._id}>
          {assignmentObj.name}
        </Link>
      </MenuItem>
    ));
  };

  render() {
    return (
      <aside className="assignments-aside">
        <Menu
          defaultSelectedKeys={['a1']}
          defaultOpenKeys={['assignments']}
          theme="dark"
          mode="inline"
          selectedKeys={[
            (this.props.currentAssignment ? this.props.currentAssignment._id : ''),
          ]}
          onSelect={({ key }) => {
            if (key === 'logout') {
              this.props.dispatch(AuthActions.logoutAsync());
            }
          }}
        >
          <SubMenu
            key="assignments"
            title={<span>Assignments</span>}
          >
            {this.renderAssignmentMenuItems()}
          </SubMenu>
          <MenuItem key="changePwd">
            <Link to="/assignments/change-pwd">
              Change password
            </Link>
          </MenuItem>
          <MenuItem key="logout">
            Logout
          </MenuItem>
        </Menu>
      </aside>
    );
  }

}

const mapStateToProps = state => ({
  assignmentList: state.assignments.assignmentList,
  currentAssignment: state.assignments.currentAssignment,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentsAside);
