import React, { Component } from 'react'
import cs from 'classnames'
import './index.css'
import Board from '../Board'

export default class Game extends Component{
  state = {
    stepNumber: 0,
    reverse: false,
    history: [
      {
        squares: Array(9).fill(null),
        xIsNext: false,
        isWinner: null,
        isEnd: false
      }
    ]
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick (squares) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const newHistory = history.concat([{
      squares,
      xIsNext: !history[history.length - 1].xIsNext,
      isWinner: this.calculateWinner(squares),
      isEnd: false
    }])

    this.setState({
      stepNumber: newHistory.length - 1,
      history: newHistory
    })
  }

  jumpTo (index) {
    this.setState({
      stepNumber: index
    })
  }

  renderHistory() {
    const list = this.state.history.map((info, index) => {
      return (
        <li
          key={index}
          className={cs(['game-history-list-item', index === this.state.stepNumber ? 'active' : ''])}
          onClick={() => this.jumpTo(index)}
        >
          Move # {index} Game start
        </li>
      )
    })

    // 反转列表
    if (this.state.reverse) {
      list.reverse()
    }

    return (
      <ul className="game-history-list">
        {list}
      </ul>
    )
  }

  handleReverse() {
    console.log(this)
    this.setState((prevState) => ({
      reverse: !prevState.reverse
    }))
  }

  render() {
    const { stepNumber, history } = this.state

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={history[stepNumber].squares}
            xIsNext={history[stepNumber].xIsNext}
            isWinner={history[stepNumber].isWinner}
            onClick={(squares) => this.handleClick(squares)}
            calculateWinner={this.calculateWinner}
          />
        </div>

        <div className="game-info">
          <h2 className="game-info__reverse" onClick={() => this.handleReverse()}>reverse</h2>
          {this.renderHistory()}
        </div>
      </div>
    )
  }
}