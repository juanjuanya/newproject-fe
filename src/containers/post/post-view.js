import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/postview.less'
import { BackTop } from 'antd'
import { viewPost } from '../../redux/actions'
import 'braft-editor/dist/output.css'
import SideBar from '../../components/side-bar'
import SendComment from '../comment/comment'


class PostView extends Component {
  
  componentDidMount() {
    const _id = this.props.match.params._id.slice(1)
    this.props.viewPost({_id})
  }

  render() {
    const post = this.props.postview
    const outputContent = post.html
    return (
      <div className="postview">
        <BackTop />
        <SideBar post={post} />
        <div className="artical">
          <h1>{post.title}</h1>
          <div className="braft-output-content" dangerouslySetInnerHTML={{__html: outputContent}}></div>
        </div>
        <SendComment />
      </div>
    )
  }
}

export default connect(
  state => ({postview: state.postview}),
  {viewPost}
)(PostView)