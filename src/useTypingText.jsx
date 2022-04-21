import React, { useState, useEffect, useRef } from 'react';

const FORWARD = 'forward';
const BACKWARD = 'backward';

export const useTypingText = (
  words = [],
  keySpeed = 1000,
  maxPauseAmount = 10
) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex].split(''));
  const [isStopped, setIsStopped] = useState(false);

  const direction = useRef(BACKWARD);
  const typingInterval = useRef();
  const letterIndex = useRef();

  const stop = () => {
    clearInterval(typingInterval.current);
    setIsStopped(true);
  };

  useEffect(() => {
    let pauseCounter = 0;

    if (isStopped) {
      return;
    }

    const backspace = () => {
      if (letterIndex.current === 0) {
        const isOnLastWord = wordIndex === words.length - 1;
        setWordIndex(isOnLastWord ? 0 : wordIndex + 1);
        direction.current = FORWARD;
        return;
      }

      const segment = currentWord.slice(0, -1);
      setCurrentWord(segment);
      letterIndex.current = currentWord.length - 1;
    };

    const typeLetter = () => {
      if (letterIndex.current >= words[wordIndex].length) {
        direction.current = BACKWARD;
        pauseCounter = maxPauseAmount;
        return;
      }

      const segment = words[wordIndex].split('');
      setCurrentWord(currentWord.concat(segment[letterIndex.current]));
      letterIndex.current = letterIndex.current + 1;
    };

    typingInterval.current = setInterval(() => {
      if (pauseCounter > 0) {
        pauseCounter -= 1;
        return;
      }
      if (direction.current === FORWARD) {
        typeLetter();
      } else {
        backspace();
      }
    }, keySpeed);

    return () => {
      clearInterval(typingInterval.current);
    };
  }, [words, keySpeed, maxPauseAmount, wordIndex, currentWord, isStopped]);

  return {
    word: (
      <span className={`word ${currentWord.length ? 'full' : 'empty'}`}>
        <span>{currentWord.length ? currentWord.join('') : '0'}</span>
      </span>
    ),
    start: () => setIsStopped(false),
    stop,
    isStopped,
  };
};
