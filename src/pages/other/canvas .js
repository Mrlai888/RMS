import React from 'react'

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './canvas.scss'

import Can from './canBg'

class Canvas extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Canvas_page">
        <div className="header" id="demo">
          <div className="canvas_wrap">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              
              <Button type="primary" htmlType="submit" className="login-form-button" style={{marginBottom:"24px"}}>
                Log in
          </Button>
          <Button type="primary" htmlType="submit" className="login-form-button">
                注册登录
          </Button>
             
            </Form.Item>
          </Form>
          
          </div>
          <Can id="canvas"></Can>
        </div>
      </div>
    )
  }
}
const CanvasLoginForm = Form.create({ name: 'normal_login' })(Canvas);

export default CanvasLoginForm