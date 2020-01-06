import React from 'react'

import { Descriptions, Badge } from 'antd';

const Welcomes =()=>{
  return(
    <div className="welcomes_page" style={{overflowY:'auto'}}>
    <Descriptions title="首页" layout="vertical" bordered style={{paddingTop:'16px',overflowY:'auto'}} size='small'>
    <Descriptions.Item label="Product">后台管理系统</Descriptions.Item>
    <Descriptions.Item label="项目成员">Mrlai</Descriptions.Item>
    <Descriptions.Item label="项目难度评估">中</Descriptions.Item>
    <Descriptions.Item label="项目开始时间">2020-12-30 8:00:00</Descriptions.Item>
    <Descriptions.Item label="项目结束时间" span={2}>
      2020-01-04 18:00:00
    </Descriptions.Item>
    <Descriptions.Item label="项目bug" span={3}>
      <Badge status="processing" text="1,user/list下的查询用户模块可以查询到数据并渲染到当前页，但是分页器的页数不会发生改变" />
    </Descriptions.Item>
    <Descriptions.Item label="相关技术" >
      数据库: json-server
      <br />
      前端框架:react
      <br />
      后端框架:express json-server
      <br />
      canvas//画布
      <br/>
       "antd": "^3.26.5",//ui设计语言
       <br/>
       "axios": "^0.19.0",//请求数据
       <br/>
       "node-sass": "^4.13.0",//css框架<br/>
       "react-app-rewired": "^2.1.5",//antd 配置项<br/>
       "react-redux": "^7.1.3",//状态管理器<br/>
       "react-router-dom": "^5.1.2",//路由模块<br/>
       "redux": "^4.0.5",//状态管理器<br/>
       "redux-logger": "^3.0.6",//输出日志模块<br/>
       "redux-thunk": "^2.3.0"//基于react-redux封装的模块<br/>
      <br/>
    </Descriptions.Item>
  </Descriptions>,
      
      
      </div>
  )
}

export default Welcomes