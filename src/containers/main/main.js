import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../header/header'
import { getUser } from '../../redux/actions'
import Post from '../post/post'
import PostLists from '../post/post-lists'
import PostView from '../post/post-view'
// import Picture from '../../components/picture'
import Register from '../register/register'
import Login from '../login/login'
import Game from '../../components/game'
import Personal from '../personal/personal'

class Main extends Component {

  componentDidMount() {
    const userid = Cookies.get('userid')
    const { _id } = this.props.user
    if (userid && !_id) {
      this.props.getUser()
    }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <Header />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path="/post" component={Post} />
          <Route path="/post:_id" component={PostView} /> 
          {/* <Route path="/picture" component={Picture} />  */}
          <Route path="/personal" component={Personal} /> 
          <Route path="/game" component={Game} /> 
          <Route component={PostLists} />
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)
