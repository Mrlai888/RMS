import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import Auth from '../pages/userManage/auth'

import List from '../pages/userManage/list'

// Router 在入口文件使用一次就够了
import Welcome from '../pages/welcome'

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
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" onClick={() => { this.handleMenuLink('/') }}>
                <Icon type="pie-chart" />
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
                <Menu.Item key="3" onClick={this.handleMenuLink.bind(this, '/user-manage/List')}>用户列表</Menu.Item>
                <Menu.Item key="4" onClick={this.handleMenuLink.bind(this, '/user-manage/auth')}>权限设置</Menu.Item>
              </SubMenu>
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
                    <Menu.Item key="setting:1">个人中心</Menu.Item>
                    <Menu.Item key="setting:2">首页</Menu.Item>
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
                <Route path="/" component={Welcome}></Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>{this.props.footerName}</Footer>
          </Layout>
        </Layout>

      </Fragment>
    )
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
    console.log(state.collapsed)
    return {
      name: state.footerName
    }
  },

)(BaseSidebar)