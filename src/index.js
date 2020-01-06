import React from 'react'
import ReactDom from 'react-dom'
import Axios from 'axios'

// import {Provider} from 'react-redux'

import {HashRouter as Router} from 'react-router-dom'

import App from './App'

Axios.defaults.baseURL = 'http://localhost:9090'


// Axios.defaults.baseURL = 'http://212.64.68.222:9090'

ReactDom.render(
  // <Provider store={store}>
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
)

