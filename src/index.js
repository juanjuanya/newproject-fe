import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.less'
// import './socketIO/socket-io-client'
import store from './redux/store'
import Main from './containers/main/main'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Main}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

