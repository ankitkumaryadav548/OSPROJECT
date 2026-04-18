import React, { useState, useRef, useEffect } from 'react';
import InputForm from './components/InputForm.jsx';
import SimulationTable from './components/SimulationTable.jsx';
import Charts from './components/Charts.jsx';
import { simulateFIFO } from './algorithms/fifo.js';
import { simulateLRU } from './algorithms/lru.js';
import { simulateOptimal } from './algorithms/optimal.js';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const resultsRef = useRef(null);

  const handleSimulate = (refs, numFrames, algorithm) => {
    const fifoResult = simulateFIFO(refs, numFrames);
    const lruResult = simulateLRU(refs, numFrames);
    const optimalResult = simulateOptimal(refs, numFrames);
    const allResults = [fifoResult, lruResult, optimalResult];

    if (algorithm === 'all') {
      setResults(allResults);
    } else {
      const algoIndex = { 'fifo': 0, 'lru': 1, 'optimal': 2 };
      const selectedResult = allResults[algoIndex[algorithm]];
      setResults(selectedResult ? [selectedResult] : []);
    }
  };

  const handleReset = () => {
    setResults([]);
  };

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  return (
    <div className="app">
      <h1 className="main-title">Memory Page Replacement Simulator</h1>
      <p className="sub-title">FIFO · LRU · Optimal</p>
      <InputForm onSimulate={handleSimulate} onReset={handleReset} />
      <div className="info-section card fade-in">
        <h2>About Algorithms</h2>
        <div className="algorithm-cards">
          <div className="algorithm-card">
            <h3>FIFO</h3>
            <p>First In, First Out. Removes the page that has been in memory the longest. Simple to understand and implement, but may not always be the most efficient.</p>
          </div>
          <div className="algorithm-card">
            <h3>LRU</h3>
            <p>Least Recently Used. Removes the page that hasn't been accessed for the longest time. Adapts well to changing access patterns and performs better in practice.</p>
          </div>
          <div className="algorithm-card">
            <h3>Optimal</h3>
            <p>Optimal Replacement. Removes the page that will be needed farthest in the future. Provides the best possible performance but requires knowing future accesses.</p>
          </div>
        </div>
      </div>
      {results.length > 0 && (
        <div ref={resultsRef} className="results-container fade-in">
          <SimulationTable results={results} />
          <Charts results={results} />
        </div>
      )}
    </div>
  );
}

export default App;
