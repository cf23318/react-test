import React, { Component } from 'react'
import Board from '../Board'

export default class Game extends Component{
  state = {
    history: []
  }

  render() {
    return <Board/>
  }
}