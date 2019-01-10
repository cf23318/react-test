import React, { Component } from 'react'
import Square from '../Square'
import './index.css'

export default class Board extends Component{
  handleClick(i) {
    const squares = this.props.squares.slice()

    if (squares[i] || this.props.calculateWinner(squares)) {
      return;
    }

    squares[i] = this.props.xIsNext ? 'X' : 'O'
    this.props.onClick(squares)
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    const winner = this.props.isWinner
    let status = ''

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}