import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'
import '../../assets/css/header.less'
import { Drawer, Button } from 'antd'
import moment from 'moment'

class Header extends Component {

  state = { 
    visible: false,
    visible1: false,
  }

  handleLogout = () => {
    Cookies.remove('userid')
    this.props.resetUser()
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  showDrawer1 = () => {
    this.setState({
      visible1: true,
    })
  }

  onClose1 = () => {
    this.setState({
      visible1: false,
    })
  }

  render() {
    const userid = Cookies.get('userid')
    const { user } = this.props
    const postCount = this.props.posts.reduce((prev, cur) => {
      if (cur.posterId === user._id) {
        prev += 1
      }
      return prev
    }, 0)
    if (userid) {
      return (
        <div className="header">
          <div className="headerBar">
            <ul className="headerList">
              <li><Link to="/">首页</Link></li>
              <li><Link to="/personal">个人中心</Link></li>
              <li><Link to="/post">我要发帖</Link></li>
              {/* <li><Link to="/picture">超清图库</Link></li> */}
              <li><Link to="/game">小游戏</Link></li>
            </ul>
            {/* <div className="drawer">
              <span type="primary" onClick={this.showDrawer1}>
                <Icon style={{fontSize: '40px', backgroundColor: '#333', marginTop: 8, margin: 8}} type="menu-fold"></Icon>
              </span>
              <Drawer
                title={user.username}
                placement="right"
                closable={false}
                onClose={this.onClose1}
                maskClosable={true}
                visible={this.state.visible1}
                width='300px'
                bodyStyle={{padding: 0}}
              >
                
                <List
                  size="large"
                  bordered
                  dataSource={links}
                  style={{border: 0}}
                  renderItem={item => <List.Item style={linkStyle}>{item}</List.Item>}
                />
                <Button style={layout} type="primary" onClick={this.handleLogout}>退出登陆</Button>
              </Drawer>
            </div> */}
            <div className="headerRight">
              <div className="name">{user.username}</div>
              <div className="drawer">
                <span onClick={this.showDrawer} className="avatar" style={{backgroundImage: `url(${user.avatar})`}}></span>
                <Drawer
                  title="用户信息"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                  width="390px"
                >
                  <div style={{textAlign: 'center', fontSize: '20px'}}>
                    <br/><br/><br/>
                    <div>
                      <img style={{maxWidth: 100}} src={user.avatar} alt="avatar"/>
                    </div>
                    <br/><br/><br/>
                    <div>
                      <div>用户名: {user.username}</div><br/>
                      <div>邮箱: {user.email}</div><br/>
                      <div>帖子: {postCount}</div><br/>
                      <div>评论: {user.userComments}</div><br/>
                      <div>blog 龄: {moment(+user.registerTime).fromNow()}</div><br/>
                    </div>
                    <br/><br/><br/>
                    <div>
                      <Button style={{width: '200px', height: 50, fontSize: 20, padding: 10}} onClick={this.handleLogout}>退出登陆</Button>
                    </div>
                  </div>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="header">
          <div className="headerBar">
            <ul className="headerList">
              <li><Link to="/">首页</Link></li>
              <li><Link to="/picture">超清图库</Link></li>
              <li><Link to="/game">小游戏</Link></li>
            </ul>
            <ul className="headerList2">
              <li><Link to="/login">登录</Link></li>
              <li><Link to="/register">注册</Link></li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default connect(
  state => ({user: state.user, posts: state.posts}), 
  {resetUser}
)(Header)