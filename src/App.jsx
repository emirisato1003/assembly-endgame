import { useState } from 'react';
import { nanoid } from 'nanoid';
import { languages } from './languages';
import './App.css';

function App() {

  const [currentWord, setCurrentWord] = useState("react");

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const letterElements = currentWord
    .split('')
    .map((letter, index) => <span key={index} className='letter'>{letter.toLocaleUpperCase()}</span>);

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };

    return (
      <span key={lang.name} className='chip' style={styles}>
        {lang.name}
      </span>
    );
  });

  const keyboardElements = alphabet.split('').map(tab => {

    return (
      <button key={tab} aria-label={tab} className='keyboard'>
        {tab.toLocaleUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done!🎉</p>
      </section>

      <section className='language-chips'>
        {languageElements}
      </section>

      <section className='letters-container'>
        {letterElements}
      </section>

      <section className='keyboard-container'>
        {keyboardElements}
      </section>

      <button className="new-game">New Game</button>
    </main>
  );
}

export default App;

