import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
      super(props)
      this.state = {
         seconds: 0
      }
    }
    componentWillMount() {
        this.interval = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1
            })
        }, 1000);
    }
    render() {
        const {seconds} = this.state;
        return (
            <div>
                <h1>{seconds}</h1>
            </div>
        )
    }
}
export default Timer;