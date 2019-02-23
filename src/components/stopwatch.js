import React, { Component } from 'react';
class Stopwatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
           seconds: 0,
           incrementer: null,
           initialIncrementor: null,
           lap: []
        }
      }
     handleStartClick() {
        this.incrementer = setInterval( () =>
        this.setState({
            seconds: this.state.seconds + 1
        }), 1000);
     }

     handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            initialIncrementor: this.incrementer
          });
     }    
     handleLapClick(){
         this.setState ({
             lap: this.state.lap.concat([this.state.seconds])
         })
         console.log(this.state.lap)
     }

     handleResetClick(){
        clearInterval(this.incrementer);
        this.setState({
            seconds: 0,
            incrementer: this.initialIncrementor,
            lap: []
            });
     }
    render() {
        const totalseconds =  ("0" + this.state.seconds % 60).slice(-2);
        const totalMinutes = Math.floor(this.state.seconds / 60);
        let button;
        let button2;
        function timer(counting) {
            return Math.floor(counting / 60) +
            ':' +
            ('0' + counting % 60).slice(-2)
        }

        if (this.state.seconds === 0 || this.state.incrementer === this.initialIncrementor) {
            button2 = null;
            button = <Startbutton onClick = {this.handleStartClick.bind(this)}/>
            
        } 
        if(this.state.seconds !== 0 && this.incrementer !== this.initialIncrementor) {
            button = <Stopbutton onClick = {this.handleStopClick.bind(this)}/>
            button2 = <Lapbutton onClick = {this.handleLapClick.bind(this)}/>
        }

        if(this.state.seconds !== 0 && this.incrementer === this.state.initialIncrementor) {
            button = <Startbutton onClick = {this.handleStartClick.bind(this)}/>
            button2 = <Resetbutton onClick = {this.handleResetClick.bind(this)}/>
        }
        return (
            <div>
                <h1>Stopwatch:
                    {totalMinutes}:{totalseconds}
                </h1>
                {button}{button2}
                <ul>
                    { this.state.lap.map((lap, index) =>
                        <li><strong>Lap {index + 1}  </strong>{timer(lap)}</li>)
                    }
                </ul>
            </div>
        )
    }
}

function Startbutton (props) {
    return (
      <div>
          <button onClick={props.onClick}>Start</button>
      </div>
    )
  }
  function Stopbutton (props) {
    return (
      <div>
          <button onClick={props.onClick}>Stop</button>
      </div>
    )
  }
  function Lapbutton (props) {
    return (
      <div>
          <button onClick={props.onClick}>Lap</button>
      </div>
    )
  }

  function Resetbutton (props) {
    return (
      <div>
          <button onClick={props.onClick}>Reset</button>
      </div>
    )
  }

export default Stopwatch;