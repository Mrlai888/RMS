import {createStore, applyMiddleware,compose} from 'redux'

import thunk from 'redux-thunk'

import logger from 'redux-logger'//用于监听事件函数，控制台返回事件对象

import Reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(Reducer,composeEnhancers(
  applyMiddleware(thunk)
))

export default store