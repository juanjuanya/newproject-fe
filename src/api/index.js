import ajax from './ajax'

export const reqRegister = (user) => ajax('/register', user, 'POST')
export const reqLogin = (user) => ajax('/login', user, 'POST')
export const reqUser = () => ajax('/user')
export const reqPost = (post) => ajax('/post', post, 'POST')
export const reqPostList = () => ajax('/postlist')
export const reqViewPost = ({_id}) => ajax('/viewpost', {_id}, 'POST')
export const reqComment = (comment) => ajax('/comment', comment, 'POST') 
export const reqComments = ({_id}) => ajax('/comments', {_id}, 'POST') 
export const reqUpdatePost = (update) => ajax('/updatePost', update, 'POST') 
export const reqUpdateUser = (data) => ajax('/updateUser', data, 'POST') 
export const reqAllComments = () => ajax('/allComments') 
export const reqDeletePost = (data) => ajax('/deletePost', data, 'POST') 
export const reqDeleteComment = (data) => ajax('/deleteComment', data, 'POST') 