import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Avatar, Skeleton, Badge } from 'antd'
import { getPostList, deletePost } from '../../redux/actions'
import moment from 'moment'

class MyPostsList extends Component {

  componentDidMount() {
    this.props.getPostList()
  }

  deletePost = (_id) => {
    console.log(_id)
    this.props.deletePost(_id)
  }

  render() {
    const { user } = this.props
    const posts = this.props.posts.filter(post => post.posterId === user._id)
    return (
      <div className="mypostlist">
        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={item => (
            <List.Item actions={[<span style={{color: '#6290ff'}}>edit</span>, <span style={{color: '#6290ff'}} onClick={() => this.deletePost(item._id)}>delete</span>]} style={{position: 'relative'}}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={item.posterAvatar} />
                  }
                  title={<Link to={`/post:${item._id}`}>TITLE: {item.title}</Link>}
                  description={<div style={{width: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>CONTENT: {item.content}</div>}
                />
              </Skeleton>
              <div style={{position: 'absolute', top: 1, right: 7}}>{moment(+item.postTime).fromNow()}</div>
              <div>
                <Link to={`/post:${item._id}`}>
                  <Badge count={item.commentCount} style={{ backgroundColor: '#52c41a' }} />
                </Link>
              </div>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, posts: state.posts}),
  {getPostList, deletePost}
)(MyPostsList)