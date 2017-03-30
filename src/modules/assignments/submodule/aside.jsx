import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import _ from 'lodash';
import Assignment from 'src/datamodels/assignment';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class AssignmentsAside extends React.Component {

  static propTypes = {
    // match: P.object.isRequired,
    assignmentList: P.arrayOf(P.instanceOf(Assignment)),
  };

  static defaultProps = {
    assignmentList: [],
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
        >
          <SubMenu
            key="assignments"
            title={<span>Assignments</span>}
          >
            {this.renderAssignmentMenuItems()}
          </SubMenu>
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
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentsAside);
