import React from 'react'
import { Result, Button } from 'antd';

const Four =({history})=>{

  const toHome=()=>{
   history.push('/')
  }

  return(
    <div className="four_page">
       <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={()=>{
      return(
        toHome()
      )
    }}>Back Home</Button>}
  />
    </div>
  )
}

export default Four
