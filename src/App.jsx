import { useState } from 'react';
import { nanoid } from 'nanoid';
import { languages } from './languages';
import clsx from 'clsx';
import './App.css';

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter =>
    !currentWord.includes(letter)
  ).length

  console.log(wrongGuessCount);



  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters => {
      const setLetters = new Set(prevLetters);
      setLetters.add(letter);
      return Array.from(setLetters);
    }
    );

  }

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };

    return (
      <span
        key={lang.name}
        className='chip'
        style={styles}
      >
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split('').map((letter, index) => {
    const showLetter = guessedLetters.includes(letter);
    return (
      <span key={index} className='letter'>{showLetter && letter.toLocaleUpperCase()}</span>
    );
  }
  );

  const keyboardElements = alphabet.split('').map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      'correct': isCorrect,
      'wrong': isWrong

    });
    return (
      <button
        onClick={() => addGuessedLetter(letter)}
        key={letter}
        aria-label={letter}
        className={className}
      >
        {letter.toLocaleUpperCase()}
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

