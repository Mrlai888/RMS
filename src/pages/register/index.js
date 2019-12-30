import React from 'react'

import { connect } from 'react-redux'

import {signUp } from '../../api/userApi'

import './register.scss'

import { Form, Icon, Input, Button, Checkbox, message, Radio } from 'antd';

class Register extends React.Component {

  state = {
    gender: 1,
    loading: false
  }
  // 转态管理器是存储共享数据connect() state， 但组件内页可以使用私有state (共存时使用this.props调用共享)
  handleSubmit = e => {
    // 阻止默认事件
    e.preventDefault();

    const { from, location, history } = this.props
    // 主动触发表单校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
      }

      signUp(values).then(response => {
        const { data } = response
        console.log((data.data))
        console.log(this.props)
        if (data.code === 0) {
          message.success('注册成功', 1, () => {
            this.props.history.push(('/login'))
          })
        } else {
          message.error(data.msg)
          this.setState({
            loading: false
          })
        }
      })


    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state
    return (
      <div className="register_page">
        <Form onSubmit={this.handleSubmit} className="register-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入用户名' },
                { type: 'email', message: '请输入正确的邮箱地址' }
              ],

            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username/email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' },
                { min: 6, message: '最少6位数' },
                { max: 12, message: '最大12位数' }
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('gender', {
              rules: [
                { required: true, message: 'please select you gender!' },
              ],
              initialValue:this.state.gender
            })(
              <Radio.Group >
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
            )}

          </Form.Item>
          <Form.Item>
            <Button type="primary"
              htmlType="submit"
              className="register-form-button"
              loading={loading}
            >
              注册
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }


}

export default connect()(Form.create()(Register))
