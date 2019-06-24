import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, 
  POST_SUBMIT, RECEIVE_POSTLIST, RECEIVE_POST, SEND_COMMENT, 
  RECEIVE_COMMENTS, RECEIVE_UPDATE_POST, RECEIVE_ALL_COMMENTS, 
  RECEIVE_DELETE_POST, RECEIVE_DELETE_COMMENT } from './action-types'
import { reqLogin, reqRegister, reqUser, reqPost, reqPostList, 
  reqViewPost, reqComment, reqComments, reqUpdatePost, reqUpdateUser, 
  reqAllComments, reqDeletePost, reqDeleteComment } from '../api'

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
const postSuccess = (post) => ({type: POST_SUBMIT, data: post})
const receivePostList = (posts) => ({type: RECEIVE_POSTLIST, data: posts})
const receivePost = (post) => ({type: RECEIVE_POST, data: post})
const sendComment = (comment) => ({type: SEND_COMMENT, data: comment})
const receiveComments = (id) => ({type: RECEIVE_COMMENTS, data: id})
const receiveUpdatePost = (post) => ({type: RECEIVE_UPDATE_POST, data: post})
const receiveAllComments = (comments) => ({type: RECEIVE_ALL_COMMENTS, data: comments})  
const receiveDeletePost = (id) => ({type: RECEIVE_DELETE_POST, data: id})  
const receiveDeleteComment = (id) => ({type: RECEIVE_DELETE_COMMENT, data: id})  
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

// 注册
export const register = ({username, password, email, avatar}) => {
  return async dispatch => {
    const response = await reqRegister({username, password, email, avatar})
    const result = response.data
    if (result.code === 0) {
      dispatch(authSuccess(result.data))
    } else if (result.code === 1) {
      dispatch(errorMsg(result.msg))
    }
  }
}
// 登录
export const login = ({username, password}) => {
  return async dispatch => {
    const response = await reqLogin({username, password})
    const result = response.data
    if (result.code === 0) {
      dispatch(authSuccess(result.data))
    } else if (result.code === 1) {
      dispatch(errorMsg(result.msg))
    }
  }
}
// 获取用户信息
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else if (result.code === 1) {
      dispatch(resetUser(result.msg))
    }
  }
}
// 发帖
export const postSubmit = ({title, content, posterId, html}) => {
  return async dispatch => {
    const response = await reqPost({title, content, posterId, html})
    const result = response.data
    if (result.code === 0) {
      dispatch(postSuccess(result.data))
    } 
  }
}
// 获取帖子列表
export const getPostList = () => {
  return async dispatch => {
    const response = await reqPostList()
    const result = response.data
    if (result.code === 0) {
      dispatch(receivePostList(result.data))
    }
  }
}
// 获取帖子
export const viewPost = ({_id}) => {
  return async dispatch => {
    const response = await reqViewPost({_id})
    const result = response.data
    if (result.code === 0) {
      dispatch(receivePost(result.data))
    }
  }
}
// 发表评论
export const comment = ({val, time, to, who, len, postTitle}) => {
  return async dispatch => {
    const response = await reqComment({val, time, to, who, len, postTitle})
    const result = response.data
    if (result.code === 0) {
      dispatch(sendComment(result.data))
    }
  }
}
// 获取评论列表
export const getComments = ({_id}) => {
  return async dispatch => {
    const response = await reqComments({_id})
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveComments(result.data))
    }
  }
}

// 更新star和like
export const updatePost = (update) => {
  return async dispatch => {
    const response = await reqUpdatePost(update)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUpdatePost(result.data))
    }
  }
}

// 更新用户评论数
  export const updateUser = (data) => {
    return async dispatch => {
      const response = await reqUpdateUser(data)
      const result = response.data
      if (result.code === 0) {
        dispatch(receiveUser(result.data))
      }
    }
  }

// 获取所有评论
export const getAllComments = () => {
  return async dispatch => {
    const response = await reqAllComments()
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveAllComments(result.data))
    }
  }
}
// 删除帖子及帖子相关的评论
export const deletePost = (_id) => {
  return async dispatch => {
    const response = await reqDeletePost({_id})
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveDeletePost(result.data))
    }
  }
}

// 删除评论
export const deleteComment = (_id) => {
  return async dispatch => {
    const response = await reqDeleteComment({_id})
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveDeleteComment(result.data))
    }
  }
}