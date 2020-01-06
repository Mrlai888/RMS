import React ,{useState,useEffect}from 'react'

import { Table, Divider,Badge, Button } from 'antd';

import {findUser} from '../../../api/userApi'

import moment from 'moment'


const Auth =()=>{
  const columns = [
    {
      title: '角色ID',
      dataIndex: 'id',
    },
    {
      title: "角色名称",
      dataIndex: 'username',
      render:(text,recode)=>{
        return(
          <span>经理</span>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'initTime',
      render:(text,recode)=>{
        if(recode.time){
          return(formatTimes(recode.time))
        }else{
          return('2020-1-4 08:30:30')
        }
      }
    },
    {
      title: '使用状态',
      key: 'status',
      render:(text,recode)=>{
        return(
          <Badge status={status} text="启用" />
        )
      }
    },
    {
      title: '授权时间',
      key: 'time',
      dataIndex:'time',
      render:(text,recode)=>{
        return(
        <span>{}</span>
        )
      }
    },
    {
      title: '授权人',
      dataIndex:'username',
    }
  ];

  const formatTimes=(times)=>{
    let time = moment(times).format('YYYY-MM-DD HH:mm:ss')
    return(time)
  }

  useEffect(()=>{
    getUserList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [status,setStatus]=useState("processing")

  const[database,setDatabase]=useState([])

  const[limit,setLimit]=useState(5)

  const[loading,setLoading]=useState(false)

  const [total,setTotal]=useState(1)

const onchange = (page)=>{
  getUserList(page)
}


const getUserList=(page)=>{
  console.log(666)
  findUser({_page:page, _limit: limit}).then((res)=>{
    const {data, headers} =res
    console.log(data,headers)
    setDatabase(data)
    // 获取总条数，后台返回的数据
    setTotal(parseInt(headers['x-total-count']))

  })
}

  

  return(
    <div className="auth_page">
    <h1 style={{paddingTop:"12px",fontWeight:'bold'}}>权限管理</h1>
    <Button style={{background:'yellow',color:'#fff',margin:"10px",fontWeight:'bold'}}>创建角色</Button>
    <Button style={{background:'yellow',color:'#fff',margin:"10px",fontWeight:'bold'}}>设置权限</Button>
    <Button style={{background:'yellow',color:'#fff',margin:"10px",fontWeight:'bold'}}>用户授权</Button>
    <Table
     columns={columns}
      dataSource={database} 
      pagination={{
        onChange:onchange,
        total:total,
        defaultPageSize: limit
      }}/>
    </div>

  )
}

export default Auth