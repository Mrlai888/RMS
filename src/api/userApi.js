import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:9090'


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


export const delUser=(params)=>{
  return Axios.delete(`/users/${params}`)
}