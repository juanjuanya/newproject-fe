import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import '../../assets/css/personal.less'
import { Button, List, BackTop } from 'antd'
import { getAllComments } from '../../redux/actions'
import MyPostsList from './my-posts-list'
import MyCommentsList from './my-comments-list'

const Item = List.Item

class Personal extends Component {

  componentDidMount() {
    this.props.getAllComments()
  }

  render() {
    const {user} = this.props
    return (
      <div className="personal">
        <div className="sideBar">
          <div className="info">
            <div>
              <img className="avatar" src={user.avatar} alt="user'avatar"/>
            </div>
            <p className="u">User: {user.username}</p>
            <p className="u">E-mail: {user.email}</p>
          </div>
          <div className="line"></div>
          <div className="bar">
            <List
              size="large"
              bordered
              style={{border: 0}}
            >
              <Item style={{padding: 0}}>
                <Button type="ghost" className="barBtn"><Link to="/personal/myPostsList">我的帖子</Link></Button>
              </Item>
              <Item style={{padding: 0}}>
                <Button type="ghost" className="barBtn"><Link to="/personal/myCommentsList">我的评论</Link></Button>
              </Item>
            </List>
          </div>
          <div className="line"></div>
        </div>
        <BackTop />
        <div className="view">
          <Switch>
            <Route path='/personal/myCommentsList' component={MyCommentsList} />
            <Route path='/personal' component={MyPostsList} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, posts: state.posts, comments: state.comments}),
  {getAllComments}
)(Personal)