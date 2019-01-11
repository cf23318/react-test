import React, { Component}  from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.svg';
import './index.css'

export default class PublicHeader extends Component{
  static propTypes = {
    record: PropTypes.any,
    title: PropTypes.string.isRequired,
    confirm: PropTypes.any,
  }

  state = {
    title2: 'false',
    seconds: 0
  };

  tick() {
    this.setState((prevState) => ({
      seconds: prevState.seconds + 1
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render(){
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{this.props.title}</div>
        <div>{this.state.title2}</div>
        <div>Seconds: {this.state.seconds}</div>
      </header>
    );
  }
}
