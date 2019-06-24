import React, { Component } from 'react'
import { Button } from 'antd'

export default class SideBar extends Component {
  render () {
    return (
      <div className="sidebar">
        <div className="avatar">
          <img src={this.props.post.posterAvatar} alt="avatar"/>
          <p>用户名：{this.props.post.posterName}</p>
          <p>邮箱：{this.props.post.posterEmail}</p>
          <Button className="btn">关注</Button>
        </div>
      </div>
    )
  }
}