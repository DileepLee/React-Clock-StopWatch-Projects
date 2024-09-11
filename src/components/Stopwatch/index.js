import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    timeElapsedInSeconds: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    const {isTimerRunning} = this.state // Destructure state here
    if (!isTimerRunning) {
      this.timerId = setInterval(this.incrementTime, 1000)
      this.setState({isTimerRunning: true})
    }
  }

  incrementTime = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  stopTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false})
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({timeElapsedInSeconds: 0, isTimerRunning: false})
  }

  renderSeconds = () => {
    const {timeElapsedInSeconds} = this.state // Destructure state here
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    return seconds < 10 ? `0${seconds}` : seconds
  }

  renderMinutes = () => {
    const {timeElapsedInSeconds} = this.state // Destructure state here
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    return minutes < 10 ? `0${minutes}` : minutes
  }

  render() {
    const {isTimerRunning} = this.state // Destructure state here
    return (
      <div className="stopwatch-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-timer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            alt="stopwatch"
            className="stopwatch-icon"
          />
          <h1 className="timer">
            {this.renderMinutes()}:{this.renderSeconds()}
          </h1>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="start-button"
            onClick={this.startTimer}
            disabled={isTimerRunning}
          >
            Start
          </button>
          <button
            type="button"
            className="stop-button"
            onClick={this.stopTimer}
            disabled={!isTimerRunning}
          >
            Stop
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={this.resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }
}

export default Stopwatch
