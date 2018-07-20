import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';

const FormItem = Form.Item;

export class DefaultPage extends Component {
  static propTypes = {
    signIn: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSubmit(e) {
    const { actions } = this.props;
    const { showNotification } = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        actions.postSignIn(values).then(function(res) {
          showNotification(res.data);
        });
      }
    });
  }

  showNotification(data) {
    if (data.success) {
      notification.success({
        message: 'Login Success',
      });
    } else {
      if (data.message !== '') {
        notification.error({
          message: data.message,
        });
      }
    }
  }

  render() {
    const { postSignInPending } = this.props.signIn;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="sign-in-default-page">
        <div className="form-wrap">
          <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input addonBefore={<Icon type="user" />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input addonBefore={<Icon type="key" />} type="password" placeholder="Password" />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
            </FormItem>
            <div className="btn-wrap">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={postSignInPending}
              >
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    signIn: state.signIn,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

const WrapFormDP = Form.create()(DefaultPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrapFormDP);
