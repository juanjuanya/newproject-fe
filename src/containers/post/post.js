import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../../assets/css/post.less'
import { Input, Button, message } from 'antd'
import { postSubmit } from '../../redux/actions'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

const info = () => {
  message.info('标题及内容不能为空！');
}

class Post extends Component {
  state = {
    title: '',
    content: '',
    editorState: null,
    html: '',
    posterId: '',
  }

  handleTitle = (event) => {
    const title = event.target.value.trim()
    if (title === '') {
      return info()
    }
    this.setState({title})
  }

  handleContent = (editorState) => {
    if (this.state.posterId === '') {
      this.setState({posterId: this.props.user._id})
    }
    this.setState({
      content: JSON.stringify(editorState),
      html: editorState.toHTML(),
      editorState,
    })
  }

  handleSubmit = () => {
    if (!this.state.content) {
      return info()
    }
    const a = JSON.parse(this.state.content)._immutable.currentContent
    const b = a.selectionAfter.anchorKey
    const c = a.blockMap
    const d = c[b].text.trim()
    if(!d || !this.state.title || !this.state.content) {
      return info()
    }
    this.setState({content: d})
    setTimeout(()=> {
      if (this.state.title && this.state.content) {
        this.props.postSubmit(this.state)
      }
      this.props.history.push('/')
    }, 500)
  }

  render() {
    return (
      <div className="outer">
        {/* <h1>探索黑科技</h1> */}
        <div className="inter">
          <div className="title">帖子标题：
            <Button className="button" onClick={this.handleSubmit}>发布</Button>
          </div>
          <br/>
          <Input className="input" type="text" placeholder="请输入帖子标题！" onChange={this.handleTitle}></Input>
          <br/><br/>
          <div className="title">帖子内容：</div>
          <br/>
          <div className="content">
            <BraftEditor onChange={this.handleContent}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, post: state.post}),
  {postSubmit}
)(Post)