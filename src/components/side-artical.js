import React, { Component } from 'react'
import { Collapse, Calendar } from 'antd'


const Panel = Collapse.Panel
export default class SideArtical extends Component {

  render () {
    return (
      <>
      <div className="sidebar">
        <Calendar fullscreen={false} />
      </div>
      <div className="sideArtical">
          <Collapse defaultActiveKey={['1']}>
          {/* <Collapse> */}
            <Panel header="个人项目" key="1">
              <p><a href="/">俄罗斯方块</a></p>
              <p><a href="/">纯 CSS 仿写小米官网首页</a></p>
              <p><a href="/">夏日绘板</a></p>
              <p><a href="/">行内登高自适应瀑布流</a></p>
              <p><a href="/">移动端 项目仿写</a></p>
              <p><a href="/">PC 端个人博客</a></p>
            </Panel>
            <Panel header="友情链接" key="2">
              <p><a href="/"> QQ 邮箱: 1021255794@qq.com</a></p>
              <p><a href="https://github.com/juanjuanya">Github: https://github.com/juanjuanya</a></p>
              <p><a href="https://juejin.im/user/5d0f78ef51882531b66b2c14">个人博客</a></p>
            </Panel>
            <Panel header="学习网站" key="3">
              <p><a href="https://www.github.com/">大型专业学习交友网站</a></p>
              <p><a href="https://developer.mozilla.org/zh-CN/">MDN Web 文档</a></p>
              <p><a href="https://stackoverflow.com/">Learn Share Build</a></p>
              <p><a href="http://www.ruanyifeng.com">阮一峰的网络日志</a></p>
              <p><a href="https://imququ.com/">Jerry Qu 专注前端开发</a></p>
              <p><a href="https://developers.google.com/web/fundamentals/primers/promises">Promise</a></p>
              <p><a href="https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html" > We have a problem with promises </a></p>
              <p><a href="https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161">Even with async/await, raw promises are still key to writing optimal concurrent javascript</a></p>
              <p><a href="https://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line/">JavaScript template engine in just 20 lines</a></p>
              <p><a href="https://nodejs.org/dist/latest-v11.x/docs/api/">Index | Node.js v11.15.0 Documentation</a></p>
              <p><a href="https://expressjs.com/zh-cn/4x/api.html#req.is">Express 4.x - API 参考</a></p>
              <p><a href="https://github.com/koajs/koa/wiki">Home · koajs/koa Wiki</a></p>
              <p><a href="https://reactjs.org/">React – A JavaScript library for building user interfaces</a></p>
              <p><a href="https://ant.design/docs/react/introduce-cn">Ant Design of React - Ant Design</a></p>
              <p><a href="https://babeljs.io/">Babel · The compiler for next generation JavaScript</a></p>
              <p><a href="http://element.eleme.io/#/zh-CN">Element - 网站快速成型工具</a></p>
              <p><a href="https://redux.js.org/introduction/motivation">Motivation · Redux</a></p>
              <p><a href="https://reacttraining.com/react-router/web/guides/quick-start">React Router: Declarative Routing for React.js</a></p>
            </Panel>
          </Collapse>
        </div>
        </>
    )
  }
} 