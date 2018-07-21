import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Form, Input, notification } from 'antd';

const FormItem = Form.Item;

export class DefaultPage extends Component {
  static propTypes = {
    signUp: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { signUp } = this.props.actions;
    const { showNotification } = this;

    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
      const { name, email, passwd, rePasswd } = values;
      const reqData = {
        userName: name,
        email: email,
        password: passwd,
        confirmPassword: rePasswd,
      };

      signUp(reqData).then(res => {
        console.log(res.data);
        showNotification(res.data);
      });
    });
  }

  showNotification(data) {
    if (data.success) {
      notification.success({
        message: 'Register Success',
      });
    } else {
      if (data.message !== '') {
        notification.error({
          message: data.message,
        });
      }
    }
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  handleCPCC() {
    return false;
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists.bind(this) },
      ],
    });
    const emailProps = getFieldProps('email', {
      validate: [
        {
          rules: [{ required: true }],
          trigger: 'onBlur',
        },
        {
          rules: [{ type: 'email', message: '请输入正确的邮箱地址' }],
          trigger: ['onBlur', 'onChange'],
        },
      ],
    });
    const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass.bind(this) },
      ],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '请再次输入密码',
        },
        {
          validator: this.checkPass2.bind(this),
        },
      ],
    });

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      <div className="sign-up-default-page">
        <div className="form-wrap">
          <Form horizontal="true">
            <FormItem
              {...formItemLayout}
              label="用户名"
              hasFeedback
              help={
                isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')
              }
            >
              <Input {...nameProps} placeholder="用户名" />
            </FormItem>

            <FormItem {...formItemLayout} label="邮箱" hasFeedback>
              <Input {...emailProps} type="email" placeholder="邮箱" />
            </FormItem>

            <FormItem {...formItemLayout} label="密码" hasFeedback>
              <Input
                {...passwdProps}
                type="password"
                autoComplete="off"
                onContextMenu={this.handleCPCC.bind(this)}
                onPaste={this.handleCPCC.bind(this)}
                onCopy={this.handleCPCC.bind(this)}
                onCut={this.handleCPCC.bind(this)}
              />
            </FormItem>

            <FormItem {...formItemLayout} label="确认密码" hasFeedback>
              <Input
                {...rePasswdProps}
                type="password"
                autoComplete="off"
                placeholder="两次输入密码保持一致"
                onPaste={this.handleCPCC.bind(this)}
                onCopy={this.handleCPCC.bind(this)}
                onCut={this.handleCPCC.bind(this)}
              />
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 7 }}>
              <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                确定
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="ghost" onClick={this.handleReset.bind(this)}>
                重置
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    signUp: state.signUp,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}
DefaultPage = Form.create()(DefaultPage);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
