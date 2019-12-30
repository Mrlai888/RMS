
const user = window.sessionStorage.getItem('user')

const initState = {
  footerName:"后台管理系统",
  user: user? JSON.parse(user): null
}

export default (state = initState,action)=>{
  
  if(action.type ==='LOGIN'){
    window.sessionStorage.setItem('user',JSON.stringify(action.user))
    return{
      ...state,
      user: action.user
    }
  }
  return state
}

