import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

/**
 * module styles
 */
class LoginForm extends React.Component {

  static propTypes = {
    form: P.object.isRequired,
  };

  static rules = {
    username: [
      { required: true, message: 'Please input your student ID.' },
    ],
    password: [
      { required: true, message: 'Please input your password.' },
    ],
    remember: [
      { valuePropName: 'checked', initialValue: true },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {};

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
          {
            getFieldDecorator(
              'remember',
              LoginForm.rules.remember,
            )(
              <Checkbox>
                保持登录
              </Checkbox>,
            )
          }
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

export default connect()(Form.create()(LoginForm));
