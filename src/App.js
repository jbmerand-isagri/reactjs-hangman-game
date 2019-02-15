import React, { Component } from 'react';
import './App.css';

const words = [
  'MAISON', 'SOLDAT', 'AMBULANCE', 'POLITIQUE', 
  'SOLEIL', 'WAGON', 'OPENCLASSROOMS', 'APPRENTISSAGE'
];
const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: `${words[0]}`,
      maxNumberOfGames: 8,
      usedLetters: [],
      numberOfGamesFinished: 0
    }
  }

  isWinner() {
    if (this.state.word === this.computeDisplay(this.state.word)) {
      return true;
    } else {
      return false;
    }
  }

  computeDisplay() {
    return this.state.word.replace(/\w/g,
      (letter) => (this.isKeyDisabled(letter) ? letter : '_')
    )
  }

  onKeyClick = (event) => {
    this.setState({
      usedLetters: [...this.state.usedLetters, event.target.value]
    });
  }

  newGame = () => {
    var newNumberOfGames = this.state.numberOfGamesFinished + 1;
    this.setState({
      word: `${words[newNumberOfGames]}`,
      usedLetters: [],
      numberOfGamesFinished: newNumberOfGames,
    });
  }

  isKeyDisabled(letter) {
    if (this.state.usedLetters.includes(letter)) {
      return true;
    }
  }

  render() {
    const { maxNumberOfGames, numberOfGamesFinished } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Le jeu du pendu : version 1</h1>
        </header>
        <main>
          <div>{numberOfGamesFinished !== maxNumberOfGames && (
            <div>
              <p>Objectif : trouver le mot masqué par un minimum d'essai de lettres.</p>
              <p>Modalité : cliquez sur la lettre que vous souhaitez tester.</p>
              <div>{!this.isWinner() ? (
                <div className="keyboard">
                  {letters.map((letter) => (
                    this.isKeyDisabled(letter) ? (
                      <button 
                        className="key disabledKey"
                        key={letter}
                        disabled
                      >
                        {letter}
                      </button>
                    ) : (
                      <button 
                        onClick={this.onKeyClick}
                        className="key"
                        key={letter}
                        value={letter}
                      >
                        {letter}
                      </button>)
                    )
                  )}
                </div>
              ) : (
                <button 
                  className="againBtn"
                  onClick={this.newGame}
                >
                  Recommencer une partie
                </button>
              )}</div>
              <div>
                <p className="word">{this.computeDisplay()}</p>
                <div>{this.isWinner() && (
                  <p>Bravo, vous avez trouvé le mot !</p>
                )}</div>
              </div>
            </div>
          )}</div>
        </main>
      </div>
    );
  }
}

export default App;