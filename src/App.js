import React from 'react'

import {HashRouter as Router, Route ,Switch,Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import PrivateRoute from './utils/privateRoute'

import BaseSidebar from './sidebar/baseSidebar'
import Login from './pages/login'
import Register from './pages/register'

import store from '@/store'



const App = () =>{
  return(
    <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <PrivateRoute path = '/' component={BaseSidebar}></PrivateRoute>
      </Switch>
    </Router>
    </Provider>
  )
}

export default App