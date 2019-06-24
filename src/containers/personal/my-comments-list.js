import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllComments, deleteComment } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { List, Avatar, Skeleton } from 'antd'

class MyCommentsList extends Component {

  deleteComment = (_id, to) => {
    console.log(_id, to)
    this.props.deleteComment({_id, to})
  }

  render() {
    const { user, allComments } = this.props
    if (user && allComments) {
      return (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={allComments}
            renderItem={item => (
              <List.Item actions={[<span style={{color: '#6290ff'}}>edit</span>, <span style={{color: '#6290ff'}} onClick={() => this.deleteComment(item._id, item.to)}>delete</span>]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={user.avatar} />
                    }
                    title={<Link to={`/post:${item.to}`}>POST-TITLE: {item.postTitle}</Link>}
                    description={<div style={{width: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>COMMENT: {item.content}</div>}
                  />
                </Skeleton>
                <div>{item.datetime}</div>
              </List.Item>
            )}
          />
        </div>
      )
    } else {
      return (
        <div>fdaslk</div>
      )
    }
    
  }
}

export default connect(
  state => ({user: state.user, allComments: state.allComments}),
  {getAllComments, deleteComment}
)(MyCommentsList)