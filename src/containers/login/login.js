import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../../assets/css/login.less'
import { Form, Icon, Input, Button } from 'antd'
import { login } from '../../redux/actions'

const Item = Form.Item

class Login1 extends Component {
  state = {
    username: '',
    password: '',
  }


  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value     // 属性名不是name，而是name的值
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  login = () => {
    this.props.login(this.state)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { redirectTo } = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="form">
          <Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                  onChange={(e) => {this.handleChange(e, 'username')}}
              />
            )}
          </Item>
          <Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your password!',}],
            })(
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                  onChange={(e) => {this.handleChange(e, 'password')}}
                />
            )}
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="button" onClick={this.login} >
              登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
            </Button>
            <Button type="primary" className="button" onClick={this.toRegister} >
              注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}
const Login = Form.create({ name: 'normal_login' })(Login1)

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)