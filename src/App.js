import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTop: 50,
      playerLeft: 50,
      keysPressed: [false, false, false, false],
      sensitivity: 0.1,
      perc: 90
    };
    this.setKeys = this.setKeys.bind(this);
    this.startGame = this.startGame.bind(this);
    this.cancelKeys = this.cancelKeys.bind(this);
  }

  componentDidMount () {
    this.setState({perc: (((window.innerHeight - (window.innerWidth * 0.0582))  / window.innerHeight) * 100)});
  }

  startGame () {
    this.interval = setInterval(() => {
      let keys = [...this.state.keysPressed];
      let currentTop = this.state.playerTop;
      let currentLeft = this.state.playerLeft;
      if(keys[0] && currentTop > 0){
        this.setState({playerTop: currentTop - this.state.sensitivity});
      }
      if(keys[1] && currentTop < this.state.perc){
        this.setState({playerTop: currentTop + this.state.sensitivity});
      }
      if(keys[2] && currentLeft > 0){
        this.setState({playerLeft: currentLeft - this.state.sensitivity});
      }
      if(keys[3] && currentLeft < 93){
        this.setState({playerLeft: currentLeft + this.state.sensitivity})
      }
    }, 60);
  }

  cancelKeys (e) {
    let keys = [...this.state.keysPressed];
    if(e.key === "ArrowUp"){
      keys[0] = false;
      this.setState({keysPressed: keys});
    };
    if(e.key === "ArrowDown"){
      keys[1] = false;
      this.setState({keysPressed: keys});
    }
    if(e.key === "ArrowLeft"){
      keys[2] = false;
      this.setState({keysPressed: keys});
    };
    if(e.key === "ArrowRight"){
      keys[3] = false;
      this.setState({keysPressed: keys});
    }
  }

  setKeys (e) {
    let keys = [...this.state.keysPressed];
    if(e.key === "ArrowUp"){
      keys[0] = true;
    };
    if(e.key === "ArrowDown"){
      keys[1] = true;
    }
    if(e.key === "ArrowLeft"){
      keys[2] = true;
    };
    if(e.key === "ArrowRight"){
     keys[3] = true;
    }
    this.setState({keysPressed: keys});
    return;
  }

  render () {
    this.startGame();
    window.addEventListener("keydown", this.setKeys);
    window.addEventListener("keyup", this.cancelKeys);
    return (
      <div className="gameContainer">
        <div className="border"></div>
        <div className="game">
          <Player top={this.state.playerTop} left={this.state.playerLeft}/>
        </div>
        <div className="border"></div>
      </div>
    );
  }
}

function Player (props) {
  return (
    

    <div className="playerShip" style={{top: String(props.top) + "%", left: String(props.left) + "%"}}></div>
  );
}

  function Title() {
  return (
    <div></div>
  );
}

export default App;
