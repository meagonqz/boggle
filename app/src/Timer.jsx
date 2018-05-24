import React from 'react';
import './Timer.css';

export class Timer extends React.Component {
  constructor() {
    super();
    // Change totalTime here
    this.totalTime = 120;
    this.state = {
      gamesPlayed: 0,
      timer: null,
      time: this.totalTime
    }
  }

  componentDidMount() {
    const timer = null;
    setInterval(() => this.tick(), 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  tick() {
    if (this.state.time === 0) {
      this.setState({
        gamesPlayed: this.state.gamesPlayed + 1,
        board: this.props.refreshBoard(),
        time: this.totalTime
      });
    }
    this.setState({
      time: this.state.time - 1
    });
  }
  
  render() {
    return <div className="Timer">{this.state.time}</div>
  }
}