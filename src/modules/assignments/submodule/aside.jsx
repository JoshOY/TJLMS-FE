import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class AssignmentsAside extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

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
            <MenuItem key="a1">
              Assignment 1
            </MenuItem>
            <MenuItem key="a2">
              Assignment 2
            </MenuItem>
            <MenuItem key="a3">
              Assignment 3
            </MenuItem>
          </SubMenu>
          <MenuItem key="logout">
            Logout
          </MenuItem>
        </Menu>
      </aside>
    );
  }

}

const mapStateToProps = () => ({});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(AssignmentsAside);
