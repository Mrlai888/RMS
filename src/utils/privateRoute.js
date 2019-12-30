import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
//私有  路由拦截
//component:Component 别名操作
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        (props) => {
          // 判断本地存储里是否有user 没有跳到登录模块 
          if (user) {
            return <Component {...props}></Component>
          } else {
            return <Redirect to={{
              pathname: '/login',
              state: {
                redirect: props.match.url
              }
            }}></Redirect>
          }
        }
      }
    ></Route>
  )
}

export default connect(
  (state)=>({
    user:state.user
  })
)(PrivateRoute)