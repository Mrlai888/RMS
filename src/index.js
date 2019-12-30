import React from 'react'
import ReactDom from 'react-dom'

// import {Provider} from 'react-redux'

import {HashRouter as Router} from 'react-router-dom'

import App from './App'


ReactDom.render(
  // <Provider store={store}>
    <Router>
      <App />
    </Router>,
  document.getElementById('root')
)

