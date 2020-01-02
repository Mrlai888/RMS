import React, { useState, useEffect } from 'react'

import CollectionsPage from './edit'

import AddItem from './add'

import { Table, Divider, Button ,Modal} from 'antd';


import { findUser, delUser} from '../../../api/userApi';


import './list.scss'


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
        <div style={{display:'flex'}}>
          <div className="edit_page">
          <CollectionsPage _id={record}  fn={(data)=>{return(setPage(data))}}></CollectionsPage>
          </div>
          <Divider type="vertical" />
          <div className="delPage">
          <Button 
          type="danger" 
          icon="delete"
          onClick={()=>{
           return(
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

  /**
   * 页码改变时再执行获取用户列表
   */

  const onChange = (page, pageSize) => {
    getUserList(page)
  }

// 删除
  const handleDel=(id)=> {
    const { confirm } = Modal

    confirm({
      title: '确定要删除选项吗?',
      content: '点击1秒后删除',
      onOk() {
        return new Promise((resolve, reject) => {
          delUser(id)
          console.log(id)
          const newUserList = [...userList]
          let index = newUserList.findIndex(item=>{
            return item.id === id
          })
          newUserList.splice(index,1)
          setUserList(newUserList)
          setTimeout(Math.random() > 0.4 ? resolve : reject, 700);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
      },
    });
  }


 const setPage=(data)=> {
   console.log(data)
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

  const addItems=(data)=>{
    console.log(data)
    setUserList(data)

  }

  return (
    <div className="page_List_page">
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
    <AddItem add={(data)=>{return(addItems(data))}}>
      新增用户
    </AddItem>

    </div>
    
  )

}

export default UserManageList
