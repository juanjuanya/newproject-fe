import React, { Component } from 'react'
import '../assets/css/game.less'
import {Button, Icon, message} from 'antd'

const info = () => {
  message.info('Game Over')
}

const shapes = 
  [[0x6600],
  [0x2222,0xf00],
  [0xc600,0x2640],
  [0x6c00,0x4620],
  [0x4460,0x2e0,0x6220,0x740],
  [0x2260,0xe20,0x6440,0x4700],
  [0x2620,0x720,0x2320,0x2700]]

let map

let shape, currShapeInfo, bak, run

export default class Game extends Component {

  state = {
    count: 0,
  }

  start = () => {   // 开始
    this.stop()
    shape = shapes[~~(Math.random() * 7)];
    bak = currShapeInfo = {
      fk: [], 
      y: 0, 
      x: 4, 
      s: ~~(Math.random() * 4)
    }
    this.rotate(0)
    run = setInterval(() => this.down(), 300)
  } 

  stop = () => {
    clearInterval(run)
    map = eval("[" + Array(23).join("0x801,") + "0xfff]")
    this.setState({count: 0})
  }

  new = () => {
    shape = shapes[~~(Math.random() * 7)];
    bak = currShapeInfo = {
      fk: [], 
      y: 0, 
      x: 4, 
      s: ~~(Math.random() * 4)
    }
    this.rotate(0)
  }

  over = () => {    // 结束
    map = eval("[" + Array(23).join("0x801,") + "0xfff]")
    clearInterval(run)
    return info()
  }


  rotate = (num) => {   // 翻转
    let flip = shape[currShapeInfo.s = (currShapeInfo.s + num) % shape.length]  // 翻转后的形状
    for(let i = 0; i < 4; i++)
      currShapeInfo.fk[i] = (flip >> (12 - i * 4) & 15) << currShapeInfo.x
    this.update(this.is())
  }

  update = (t) => {   // 显示
    bak = {
      fk: currShapeInfo.fk.slice(0), 
      y: currShapeInfo.y, 
      x: currShapeInfo.x, 
      s: currShapeInfo.s
    }
    if(t) 
      return
    for(var i = 0, a2 = ""; i < 22; i++) {
      a2 += map[i].toString(2).slice(1, -1) + "<br/>"
    }
    for(let i = 0, n; i < 4; i++) {
      if(/([^0]+)/.test(bak.fk[i].toString(2).replace(/1/g, "\u25a1"))) {
        a2 = a2.substr(0, n = (bak.y + i + 1) * 15 - RegExp.$_.length - 4) + RegExp.$1 + a2.slice(n + RegExp.$1.length)
      }
    }
    if (document.getElementById("view")) {
      document.getElementById("view").innerHTML = a2.replace(/1/g, "\u25a0").replace(/0/g, "\u3000")
    }
  }

  is = () => {  
    for(let i = 0; i < 4; i++)
      if((currShapeInfo.fk[i] & map[currShapeInfo.y + i]) !== 0) 
        return currShapeInfo = bak
  }

  down = () => {    // 下移
    ++currShapeInfo.y
    if (this.is()) {
      for(let i = 0; i < 4 && currShapeInfo.y + i < 22; i++)
        if((map[currShapeInfo.y+i] |= currShapeInfo.fk[i]) === 0xfff) {
          map.splice(currShapeInfo.y + i, 1)
          map.unshift(0x801)
          let a = this.state.count + 1
          this.setState({
            count: a,
          })
        }
      if(map[1] !== 0x801) return this.over()
      this.new()
    }
    this.update()
  }

  move = (t = 2, k = 1) => {    // 移动
    currShapeInfo.x += k
    for(let i = 0; i < 4; i++)
      currShapeInfo.fk[i] *= t
    this.update(this.is())
  }

  render() {
    return (
      <div className="game">
        <div id="view"></div>
        <div className="control">
          <Button className="begin" type="primary" onClick={this.start}>开始游戏</Button>
          <Button className="stop" type="primary" onClick={this.stop}>结束游戏</Button>
          <div className="score">
            总得分：<span>{this.state.count}</span>
          </div>
          <Icon className='btn up' theme="filled" onClick={() => this.rotate(1)} type="up-circle"></Icon>
          <Icon className='btn down' theme="filled" onClick={this.down} type="down-circle"></Icon>
          <Icon className='btn left' theme="filled" onClick={() => this.move(2, 1)} type="left-circle"></Icon>
          <Icon className='btn right' theme="filled" onClick={() => this.move(0.5, 1)} type="right-circle"></Icon>
        </div>
      </div>
    )
  }
}