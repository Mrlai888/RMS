import React, { useState, useEffect } from 'react'


import { Table, Divider, Button } from 'antd';
import { findUser, delUser} from '../../../api/userApi';





const UserManageList = () => {
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
      title: '用户性别',
      dataIndex: 'gender',
      render(text,record) {
        // console.log(text,record)
        if(record.gender === 1){
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
        <span>
          <Button 
          type="primary" 
          icon="edit"
          // onClick={()=>{
  
          // }}
          >编辑</Button>
          <Divider type="vertical" />
          <Button 
          type="danger" 
          icon="delete"
          onClick={()=>{
           return(
           handleDel(record.id)
           )
          }}
          >删除</Button>
        </span>
      ),
    },
  ]


  useEffect(() => {
    //默认调用一次
    getUserList(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 页码改变时再执行获取用户列表
   */

  const onChange = (page, pageSize) => {
    getUserList(page)
  }

// 删除
  const handleDel=(id)=> {
    delUser(id)
    console.log(id)
    const newUserList = [...userList]
    let index = newUserList.findIndex(item=>{
      return item.id === id
    })
    newUserList.splice(index,1)
    setUserList(newUserList)
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
  return (
    <div className="page_user_list">
      <h1>
        用户列表
       </h1>
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
