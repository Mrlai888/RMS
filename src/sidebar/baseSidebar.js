import React, { Fragment } from 'react'
// Router 在入口文件使用一次就够了
import { connect } from 'react-redux'

import Auth from '../pages/userManage/auth'
import List from '../pages/userManage/list'
import Set from '../pages/set/index'
import Welcome from '../pages/welcome'
import Four from '../pages/other/404'
import Canvas from '../pages/other/canvas '

import { Route, Switch } from 'react-router-dom'

import './baseSidebar.scss'

import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class BaseSidebar extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    // react的属性是在this对象里，通过this.props可以全局调用
    return (
      <Fragment>
        <Layout style={{ minHeight: '100vh' }} className='layout_page'>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" title="后台管理系统" >
            <Icon type="sketch" style={{fontSize:"22px",color:"blue",fontWeight:'bold'}} />
              <span>后台管理系统</span>
              </div>
            {/* //返回一个数组[''] */}
            <Menu theme="dark" defaultSelectedKeys={this.getKey()} mode="inline">
              <Menu.Item key="/" onClick={() => { this.handleMenuLink('/') }}>
                <Icon type="home" />
                <span>welcome</span>
              </Menu.Item>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="team" />
                    <span>user</span>
                  </span>
                }
              >
                <Menu.Item key='/user-manage/List' onClick={this.handleMenuLink.bind(this, '/user-manage/List')}>用户列表</Menu.Item>
                <Menu.Item key='/user-manage/auth' onClick={this.handleMenuLink.bind(this, '/user-manage/auth')}>权限设置</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="team" />
                    <span>其他</span>
                  </span>
                }
              >
                <Menu.Item key='/other/four' onClick={this.handleMenuLink.bind(this, '/other/four')}>404</Menu.Item>
                <Menu.Item key='/other/canvas' onClick={this.handleMenuLink.bind(this, '/other/canvas')}>Canvas</Menu.Item>
              </SubMenu>

              <Menu.Item key='/set' onClick={this.handleMenuLink.bind(this, '/set')}>
                <Icon type="setting"></Icon>
                <span>设置</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0,height:"64px", }}>
              <Menu onClick={this.handleClick}
               selectedKeys={[this.state.current]}
                mode="horizontal" 
                style={{height:"100%", marginLeft:"1200px"}}>
                <SubMenu style={{height:"60px",marginTop: "8px"}}
                  title={
                    <span style={{ marginRight: "24" ,height:"64px"}}>
                      <Badge count={"99+"}>
                        <Avatar src="./item.gif" shape="square" icon="user" size='large' />
                      </Badge>
                        <Icon type="caret-down" style={{position:"relative",top:"15px",left:"5px"}}/>
                    </span>
                  }
                >
                  <Menu.ItemGroup style={{width:'120px'}}>
                  <Menu.Item key="setting:2" onClick={()=>{this.handleToTarget('/')}}>首页</Menu.Item>
                    <Menu.Item key="setting:1" onClick={()=>{this.handleToTarget('/user-manage/List')}}>我的用户</Menu.Item>
                    <Menu.Item key="setting:3">
                      <a href="https://github.com/Mrlai888/RMS.git" target="_blank"></a>
                      项目地址</Menu.Item>
                    <Menu.Item key="setting:4">
                      <a href="https://mrlai888.github.io/WeiBo/" target="_blank"></a>
                      docs</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="——————">
                    <Menu.Item 
                    key="setting:5"
                    onClick={()=>{
                      this.singOut()
                    }}
                    >退出登录</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Switch>
                <Route path="/user-manage/list" component={List}></Route>
                <Route path="/user-manage/auth" component={Auth}></Route>
                <Route path='/other/four' component={Four}></Route>
                <Route path='/other/canvas' component={Canvas}></Route>
                <Route path='/set' component={Set}></Route>
                <Route path="/" component={Welcome}></Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>{this.props.footerName}</Footer>
          </Layout>
        </Layout>

      </Fragment>
    )
  }
  handleToTarget(params){
    this.props.history.push(params)
  }

getKey(){
  const {pathname}=this.props.location
  // console.log(pathname)
return [pathname]
}

  handleMenuLink(path) {
    console.log(this.props)
    // 编程式导航push用法 this.props.history.push()
    this.props.history.push(path)
  }
  singOut(){
    window.sessionStorage.setItem('user',null)
    this.props.history.go()
  }
}



export default connect(

  (state, ownProps) => {
    // console.log(state.collapsed)
    return {
      name: state.footerName
    }
  },

)(BaseSidebar)