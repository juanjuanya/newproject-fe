import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPostList, updatePost } from '../../redux/actions'
import '../../assets/css/post-list.less'
import { List, Avatar, Icon, BackTop, message } from 'antd'
import moment from 'moment'
import Cookies from 'js-cookie'
import SideArtical from '../../components/side-artical'

let a  //定时器

const info = () => {
  message.info('请先登录！')
}

class PostLists extends Component {

  componentDidMount() {
    a = setInterval(() => {
      this.props.getPostList()
    }, 1000)
  }
  
  componentWillUnmount() {
    clearInterval(a)
  }

  handleUpdate = ({type, count, _id}) => {
    return () => {
      const userid = Cookies.get('userid')
      if(!userid) {
        return info()
      }
      if (type === 'star-o') {
        count += 1
        this.props.updatePost({type, count, _id})
      } else if (type === 'like-o') {
        count += 1
        this.props.updatePost({type, count, _id})
      }
    }
  }

  render() {
    const {posts} = this.props
    return (
      <div className="post-list">
        <BackTop />
        <div className="postid">
          <List 
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 10,
            }}
            dataSource={posts}
            footer={
              <div>
                <b>前端渣渣的个人博客网站</b>
                <br /><br />
                欢迎参观！！！
              </div>
            }

            renderItem={item => (
              <List.Item 
                key={item.title}
                actions={[
                  <span onClick={this.handleUpdate({type:"star-o", count: item.star, _id: item._id})}>
                    <Icon type="star-o" style={{ marginRight: 8 }} /> 
                    {item.star}
                  </span>,
                  <span onClick={this.handleUpdate({type:"like-o", count: item.zan, _id: item._id})}>
                    <Icon type="like-o" style={{ marginRight: 8 }} />
                    {item.zan}
                  </span>,
                  <span>
                    <Icon type="message" style={{ marginRight: 8 }} />
                    {item.commentCount}
                  </span>,
                ]}
                extra={moment(+item.postTime).fromNow()}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.posterAvatar} />}
                  title={<Link to={`/post:${item._id}`} className="title">{item.title}</Link>}
                  description={item.posterName}
                />
                <div className="content">{item.content}</div>
              </List.Item>
            )}
          />
        </div>
        <SideArtical />
      </div>
    )
  }
} 

export default connect(
  state => ({posts: state.posts, user: state.user}),
  {getPostList, updatePost}
)(PostLists)  