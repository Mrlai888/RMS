import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:9090'


// Axios.defaults.baseURL = 'http://212.64.68.222:9090'



/**
 * 注册用户
 * @param {object} data
 */
export const signUp = (data)=>{

  return  Axios.post('/sign-up',data)
}

/**
 * 注册登录
 * @param {object} data
 */
export const signIn = (data)=>{

  return  Axios.post('/sign-in',data)
}


/**
 * 查找用户
 * @param {object} data
 */
export const findUser = (params)=>{

  return  Axios.get('/users',{
    params
  })
}

// 删除
export const delUser=(params)=>{
  return Axios.delete(`/users/${params}`)
}

// 修改 patch
export const changeUsr=(id,data)=>{
  return Axios.patch(`/users/${id}`,data)
}

// 新增 

export const addUser =(data)=>{
  return Axios.post('/users/',data)
}


// axios({
  //     url: 'http://localhost:3000/students',
  //     method: 'post',
  //     data: {
  //       name: userName
  //     }
  //   }).then(res => {
  //     console.log(res)
  //   })
