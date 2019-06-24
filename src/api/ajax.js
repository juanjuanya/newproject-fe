import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
  if (type === 'GET') {
    let urlStr = ''
    Object.keys(data).forEach(key => {
      urlStr += key + '=' + data[key] + '&'
    })
    if(urlStr) {
      urlStr = urlStr.substring(0, urlStr.length - 1)
      url = url + '?' + urlStr
    }
    return axios.get(url)
  } else if (type === 'POST'){
    return axios.post(url, data)
  }
}