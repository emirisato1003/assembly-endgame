import { useState } from 'react';
import { languages } from './languages';
import clsx from 'clsx';
import { getFarewellText, getRandomWord } from './utils';

import './App.css';

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(letter =>
    !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;

  const mostRecentLetter = guessedLetters[guessedLetters.length - 1];
  const isFarewell = wrongGuessCount && !currentWord.includes(mostRecentLetter) && !isGameLost;

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

  const languageElements = languages.map((lang, index) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };

    const isLost = index < wrongGuessCount;
    const className = clsx('chip', isLost && 'lost');
    return (
      <span
        key={lang.name}
        className={className}
        style={styles}
      >
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>);
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
        aria-label={`letter ${letter}`}
        className={className}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
      >
        {letter.toLocaleUpperCase()}
      </button>
    );
  });

  const gameStatesClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: isFarewell
  });


  function renderGameStatus() {
    if (isFarewell) {
      return (
        <h2>"{getFarewellText(languages[wrongGuessCount - 1].name)}"</h2>
      );
    }
    if (!isGameOver) {
      return null;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  function resetGame() {
    setCurrentWord(() => getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>


      <section
        aria-live='polite'
        role='status'
        className={gameStatesClass}
      >
        {renderGameStatus()}
      </section>


      <section className='language-chips'>
        {languageElements}
      </section>

      <section className='letters-container'>
        {letterElements}
      </section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        <p>
          {currentWord.includes(mostRecentLetter) ? `Correct! The letter ${mostRecentLetter} is in the word.` : `Sorry, the letter ${mostRecentLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>Current word: {currentWord.split("").map(letter =>
          guessedLetters.includes(letter) ? letter + "." : "blank.")
          .join(" ")}</p>

      </section>

      <section className='keyboard-container'>
        {keyboardElements}
      </section>

      {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
    </main>
  );
}

export default App;

