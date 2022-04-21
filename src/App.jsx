import './App.css';
import { useTypingText } from './useTypingText';

function App() {
  const { word, stop, start, isStopped } = useTypingText(
    ['fast', 'affordable', 'reliable'],
    130,
    20
  );

  return (
    <article className="container">
      <h1>Our product is {word}</h1>
      <aside className="btn-container">
        {isStopped ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={stop}>Stop</button>
        )}
      </aside>
    </article>
  );
}

export default App;
