import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, POST_SUBMIT, 
  RECEIVE_POSTLIST, RECEIVE_POST, SEND_COMMENT, RECEIVE_COMMENTS, 
  RECEIVE_UPDATE_POST, RECEIVE_ALL_COMMENTS, RECEIVE_DELETE_POST, 
  RECEIVE_DELETE_COMMENT } from './action-types'

const initUser = {redirectTo: ''}

// 产生user状态的reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: 
      return {...action.data, redirectTo: '/'}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER: 
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default: 
      return state
  }
}

const initPost = {}

function post(state = initPost, action) {
  switch (action.type) {
    case POST_SUBMIT:
      return {...action.data}
    case RECEIVE_UPDATE_POST:
      return {...action.data}
    default:
      return state
  }
}

const initPosts = []
function posts(state = initPosts, action) {
  switch (action.type) {
    case RECEIVE_POSTLIST:
      return action.data
    case RECEIVE_DELETE_POST: 
      return action.data
    default:
      return state
  }
}

const initViewPost = {}
function postview(state = initViewPost, action) {
  switch(action.type) {
    case RECEIVE_POST: 
      return action.data
    default: 
      return state
  }
}

const initComment = {}
function comment(state = initComment, action) {
  switch(action.type) {
    case SEND_COMMENT:
      return action.data
    default:
      return state
  }
}

const initComments = {}
function comments(state = initComments, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return action.data
    default:
      return state
  }
}

const initAllComments = {}
function allComments(state = initAllComments, action) {
  switch(action.type) {
    case RECEIVE_ALL_COMMENTS:
      return action.data
    case RECEIVE_DELETE_COMMENT: 
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  user, post, posts, postview, comment, comments, allComments
})