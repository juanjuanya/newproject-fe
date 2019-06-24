import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../../assets/css/register.less'
import { Upload, message, Form, Icon, Input, Button } from 'antd'
import { register } from '../../redux/actions'

const Item = Form.Item

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 1
  if (!isLt2M) {
    message.error('Image must smaller than 1MB!')
  }
  return isJPG && isLt2M
}

class Register1 extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    email: '',
    avatar: '',
    loading: false,
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value     // 属性名不是name，而是name的值
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  register = () => {
    this.props.register(this.state)
  }

  handleAvatar = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          avatar: imageUrl,
          loading: false,
        }),
      )
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <span className="ant-upload-text">上传头像</span>
      </div>
    )
    const imageUrl = this.state.avatar
    const { getFieldDecorator } = this.props.form
    const {redirectTo} = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div className="register">
        <Form className="form">
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
          <Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                  onChange={(e) => {this.handleChange(e, 'password')}}
                />
            )}
          </Item>
          <Item hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请确认密码"
                  onChange={(e) => {this.handleChange(e, 'password2')}}
                />
            )}
          </Item>
          <Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="email"
                  placeholder="请输入 E-mail"
                  onChange={(e) => {this.handleChange(e, 'email')}}
                />
            )}
          </Item>
          <Item>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleAvatar}
            >
              {imageUrl ? <img className="ant-img" src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="button" onClick={this.register} >
              注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
            </Button>
            <Button type="primary" className="button" onClick={this.toLogin} >
              登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}
const Register = Form.create({ name: 'normal_login' })(Register1)
export default connect(
  state => ({user: state.user}),
  {register}
)(Register)