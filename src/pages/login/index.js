import React from 'react'

import { connect } from 'react-redux'

import {signIn} from '../../api/userApi'

import './login.scss'

import { Form, Icon, Input, Button, Checkbox,message } from 'antd';

class Login extends React.Component{

    state ={
      loading:false
    }
  // 转态管理器是存储共享数据connect() state， 但组件内页可以使用私有state (共存时使用this.props调用共享)
  handleSubmit = e => {
    // 阻止默认事件
    e.preventDefault();

    const {handleLogin,from,location,history} = this.props
    // 主动触发表单校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading:true
        })
      }

      signIn(values).then(response=>{
        const{data}=response
        console.log((data.data))
        console.log(this.props)
        if(data.code === 0){
          handleLogin(data.data)

          message.success('登录成功',0.5,()=>{
            let redirect = location.state ? location.state.redirect : '/'
              history.replace(redirect)
          })
        }else{
          message.error(data.msg)
          this.setState({
            loading:false
          })
        }
      })

      
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {loading} = this.state
    return (
      <div className="login_page">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名' },
              {type:'email', message:'请输入正确的邮箱地址'}
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
              {min:6 , message: '最少6位数'},
              {max:12, message: '最大12位数'}
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
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <a className="login-form-forgot" href="">
            忘记密码
          </a>
          <Button type="primary" 
          htmlType="submit"
          className="login-form-button"
          loading={loading}
          >
            登录
          </Button>
          <a onClick={()=>{ this.toRsg() }}>注册登录</a>
        </Form.Item>
      </Form>
      </div>
    );
  }
  toRsg=()=>{
    console.log(this.props)
    // 登录注册
    this.props.history.push('/register')
  }

}

export default connect(
  null,
  (dispatch)=>{
    return{
      handleLogin(user){
        dispatch({
          type:"LOGIN",
          user
        })
      }
    }
  }
)( Form.create()(Login))
