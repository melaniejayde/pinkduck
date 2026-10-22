import QuackDuck from './QuackDuck';
import './App.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <main className="app">
      <QuackDuck />
      <Analytics />
    </main>
  );
}

export default App;
