import React from "react";
import "./stylesheets/Timer.css";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.totalTime = this.props.totalTime;
    this.state = {
      gamesPlayed: 0,
      timer: null,
      time: this.totalTime
    };
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
      window.alert(`Your final score was ${this.props.score}`);
      this.setState((prevState, props) => ({
        gamesPlayed: prevState.gamesPlayed + 1,
        board: props.refreshBoard(),
        time: this.totalTime
      }));
    }
    this.setState(prevState => ({
      time: prevState.time - 1 })
    );
  }

  render() {
    return <div className="Timer">{this.state.time}</div>;
  }
}
