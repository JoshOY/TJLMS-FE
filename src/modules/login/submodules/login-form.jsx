import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import LoginActions from '../actions';

const FormItem = Form.Item;

/**
 * module styles
 */
class LoginForm extends React.Component {

  static propTypes = {
    form: P.object.isRequired,
    dispatch: P.func,
  };

  static defaultProps = {
    dispatch: () => {},
  };

  static rules = {
    username: {
      rules: [
        { required: true, message: 'Please input your student ID.' },
      ],
    },
    password: {
      rules: [
        { required: true, message: 'Please input your password.' },
      ],
    },
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line no-console
        console.log('Received values of form: ', values);
        this.props.dispatch(LoginActions.login(values));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login__form" onSubmit={this.handleSubmit}>
        <FormItem>
          {
            getFieldDecorator(
              'username',
              LoginForm.rules.username,
            )(
              <Input
                size="large"
                placeholder="Your student ID"
                type="text"
                className="login__form__username"
                prefix={<Icon type="user" />}
              />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator(
              'password',
              LoginForm.rules.password,
            )(
              <Input
                size="large"
                placeholder="Your password"
                type="password"
                className="login__form__pwd"
                prefix={<Icon type="lock" />}
              />,
            )
          }
        </FormItem>
        <FormItem className="m-t-lg">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login__form__submit-btn"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  userStatus: state.auth.userStatus,
});

const mapDispatchesToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchesToProps,
)(Form.create()(LoginForm));
