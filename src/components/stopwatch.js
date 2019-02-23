import React, { Component } from 'react';
import { connect } from 'react-redux';

// watch better solution here : https://codepen.io/seoh/pen/PPZYQy?q=stopwatch&order=popularity&depth=everything&show_forks=false

class Stopwatch extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      seconds: 0,
      incrementer: null,
      initialIncrementor: null,
      lap: []
     };
  }

  getSeconds() {
    return ('0' + this.state.seconds % 60).slice(-2);
  }

  getMinutes() {
    return (Math.floor(this.state.seconds / 60));
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
            <div className = "main">
                <div className = "head">
                    <h1>
                        {totalMinutes}:{totalseconds}
                    </h1>
                </div>
                <div className = "buttons">
                    {button}{button2}
                </div>
                <div className = "lap">
                <ul>
                    { this.state.lap.map((lap, index) =>
                        <li key= {index + 1}><strong>Lap {index + 1}  </strong>{timer(lap)}</li>)
                    }
                    
                </ul>
                </div>
            </div>
        )
    }
    
}
function Startbutton (props) {
    return (
      <div>
          <button className = "green button1" onClick={props.onClick}>Start</button>
      </div>
    )
  }
  function Stopbutton (props) {
    return (
      <div>
          <button className = "red button1" onClick={props.onClick}>Stop</button>
      </div>
    )
  }
  function Lapbutton (props) {
    return (
      <div>
          <button className = "green button2" onClick={props.onClick}>Lap</button>
      </div>
    )
  }

  function Resetbutton (props) {
    return (
      <div>
          <button className = "red button2" onClick={props.onClick}>Reset</button>
      </div>
    )
  }

export default connect()(Stopwatch)