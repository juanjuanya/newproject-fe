import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/comment.less'
import { comment, getComments, updateUser } from '../../redux/actions'
import { Comment, Avatar, Form, Button, List, Input, message } from 'antd'
import moment from 'moment'
import Cookies from 'js-cookie'

const { TextArea } = Input

const info = () => {
  message.info('评论内容不能为空！')
}

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
    pagination={{
      pageSize: 5,
    }}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit}>
        Add Comment
      </Button>
    </Form.Item>
  </div>
)

let a

class SendComment extends Component {
  state = {
    submitting: false,
    value: '',
  }

  componentDidMount() {
    a = setInterval(() => {
      const {_id} = this.props.postview
      this.props.getComments({_id})
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(a)
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return info()
    }
    
    this.setState({
      submitting: true,
    })
    
    setTimeout(() => {
      const who = this.props.user._id  // 自己
      const to = this.props.postview._id   // 帖子
      const time = moment().format('L') // 评论时间
      const val = this.state.value   // comment内容
      const len = this.props.comments.length + 1    // 所有评论数
      const postTitle = this.props.postview.title   // 帖子标题
      this.props.comment({val, time, to, who, len, postTitle})
      this.setState({
        submitting: false,
        value: ''
      })
      const count = this.props.user.userComments + 1  // 用户总评论数+1
      this.props.updateUser({_id: who, count})
    }, 500)
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { submitting, value } = this.state
    const { username, avatar } = this.props.user
    const { comments } = this.props
    const userid = Cookies.get('userid')
    return (
      <div className="comment">
        {userid && 
          <Comment
            avatar={
              <Avatar
              src={avatar}
              alt={username}
              />
            }
            content={
              <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              />
            }
          />}
        {comments.length > 0 && <CommentList comments={comments} />}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, comments: state.comments, postview: state.postview}),
  {comment, getComments, updateUser}
)(SendComment)