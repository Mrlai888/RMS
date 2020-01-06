import React, { useState, useEffect } from 'react'

import CollectionsPage from './edit'
import comments from 'moment'

import AddItem from './add'

import { Table, Divider, Button, Modal, input, message } from 'antd';


import { findUser, delUser } from '../../../api/userApi';


import './list.scss'

const { Search } = input


const UserManageList = () => {

  // 在函数组件中使用hook来取代state
  //用户列表
  const [userList, setUserList] = useState([])
  //每页显示条数
  const [limit, setLimit] = useState(5)
  //总条数
  const [total, setTotal] = useState(1)
  //loading
  const [loading, setLoading] = useState(false)


  const columns = [
    {
      title: '用户名ID',
      dataIndex: 'id'
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '注册时间',
      dataIndex: 'time',
      render(text,record){
        console.log(record.time)
        if(record.time){
          return(formatTime(record.time))
        }else{
          return('2020-1-4 08:30:30')
        }
        
      }
    },
    {
      title: '用户性别',
      dataIndex: 'gender',
      render(text, record) {
        // console.log(text,record)
        if (record.gender === 1) {
          return "男"
        }
        else if (record.gender === 2) {
          return "女"
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <div style={{ display: 'flex' }}>
          <div className="edit_page">
            <CollectionsPage _id={record} fn={(data) => { return (setPage(data)) }}></CollectionsPage>
          </div>
          <Divider type="vertical" />
          <div className="delPage">
            <Button
              type="danger"
              icon="delete"
              onClick={() => {
                return (
                  handleDel(record.id)
                )
              }}
            >删除</Button>
          </div>

        </div>
      ),
    },
  ]


  useEffect(() => {
    //默认调用一次
    getUserList(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // 格式化时间
const formatTime=(data)=>{
  console.log(data)
 let times= comments(data).format("YYYY-MM-DD HH:mm:ss")
console.log(times)
  return(times)
}

  /**
   * 页码改变时再执行获取用户列表
   */

  const onChange = (page, pageSize) => {
    getUserList(page)
  }

  // 删除
  const handleDel = (id) => {
    const { confirm } = Modal

    confirm({
      title: '确定要删除选项吗?',
      content: '点击1秒后删除',
      onOk() {
        return new Promise((resolve, reject) => {
          delUser(id)
          // console.log(id)
          const newUserList = [...userList]
          let index = newUserList.findIndex(item => {
            return item.id === id
          })
          newUserList.splice(index, 1)
          setUserList(newUserList)
          setTimeout(Math.random() > 0.4 ? resolve : reject, 700);
        })
      },
      onCancel() {
      },
    });
  }


  const setPage = (data) => {
    // console.log(data)
    setUserList(data)
  }


  /**
    * 获取用户列表
    */

  const getUserList = (page) => {
    //加载中
    setLoading(true)
    findUser({ _page: page, _limit: limit }).then((response) => {
      // console.log(response)

      const { data, headers } = response
      setUserList(data)
      // 获取总条数，后台返回的数据

      setTotal(parseInt(headers['x-total-count']))
      setLoading(false)

    })

  }

  const addItems = (data) => {
    // console.log(data)
    setUserList(data)

  }
  // 精准搜索
  const searchUser=(value)=>{
    setLoading(true)
  let values =value.replace(/(^\s*)|(\s*$)/g, "")
    // setLoading(true)
   let user= userList.find(item=>item.username===values)
  //  console.log(user)
   if(user){
     setUserList([user])
     setLoading(false)
   }else{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
    message.error( '该用户不存在',1);
   }
  }
  // 模糊搜索
  let timer
  const handleChange = (e) => {
    let value = e.target.value.split('.')[0]
    // console.log(e.target.value)
    clearTimeout(timer)
    //防抖节流
    timer=setTimeout(() => {
      findUser().then((res) => {
        const { data } = res
        // console.log(res.status);
        // console.log(data)
        if (res.status === 200) {
          let valueList = []
          const oldList = JSON.parse(JSON.stringify(data))
          const newList = JSON.parse(JSON.stringify(data))
          newList.forEach(item => {
            if (item.username.indexOf(value) >= 0) {
              return valueList.push(item)
            }
          })
          if (valueList) {
            setUserList(valueList)
          } else if (e.target.value === '') {
            setUserList(oldList)
          }
        }
      })
    }, 500);
  }
  return (
    <div className="page_List_page">
      <h1 style={{ fontWeight: "bold", padding: '16px' }}>
        用户列表
       </h1>
       <div className="title_page">
      <div className="search_box" >
        <Search
          placeholder="查询用户"
          enterButton="Search"
          size="large"
          loading={loading}
          onSearch={value =>{
            return(searchUser(value))
          }}
          onChange={(e) => { handleChange(e) }}
        />
      </div>
      <div className="add_box">
      <AddItem add={(data) => { return (addItems(data)) }}>
        新增用户
    </AddItem>
    </div>
    </div>

      <Table
        rowKey='id'
        columns={columns}
        dataSource={userList}
        loading={loading}
        pagination={{
          total: total,
          defaultPageSize: limit,
          onChange: onChange
        }}>
        >
      </Table>

    </div>

  )

}

export default UserManageList
