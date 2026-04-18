import React, { useState } from 'react';
import { parseReferenceString, validateInputs } from '../utils/helpers.js';

const InputForm = ({ onSimulate, onReset }) => {
  const [refString, setRefString] = useState('7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1');
  const [numFrames, setNumFrames] = useState(3);
  const [algorithm, setAlgorithm] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateInputs(refString, numFrames);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }
    const refs = parseReferenceString(refString);
    onSimulate(refs, numFrames, algorithm);
  };

  const handleReset = () => {
    setRefString('7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1');
    setNumFrames(3);
    setAlgorithm('all');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="input-form card">
      <h2 className="form-title">Configuration</h2>

      {/* Reference String Section */}
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="refString">Reference String</label>
          <input
            type="text"
            id="refString"
            value={refString}
            onChange={(e) => setRefString(e.target.value)}
            placeholder="e.g., 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7 0 1"
          />
          <p className="helper-note">Space-separated page numbers</p>
        </div>
      </div>

      {/* Simulation Parameters Section */}
      <div className="form-section simulation-params">
        <div className="params-grid">
          <div className="form-group">
            <label htmlFor="numFrames">Number of Frames</label>
            <select
              id="numFrames"
              value={numFrames}
              onChange={(e) => setNumFrames(parseInt(e.target.value, 10))}
              className="frame-select"
            >
              <option value="1">1 Frame</option>
              <option value="2">2 Frames</option>
              <option value="3">3 Frames</option>
              <option value="4">4 Frames</option>
              <option value="5">5 Frames</option>
              <option value="6">6 Frames</option>
              <option value="7">7 Frames</option>
              <option value="8">8 Frames</option>
              <option value="9">9 Frames</option>
              <option value="10">10 Frames</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="algorithm">Algorithm</label>
            <select
              id="algorithm"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="algorithm-select"
            >
              <option value="all">Compare All Algorithms</option>
              <option value="fifo">FIFO (First In First Out)</option>
              <option value="lru">LRU (Least Recently Used)</option>
              <option value="optimal">Optimal Page Replacement</option>
            </select>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">Run Simulation</button>
        <button type="button" onClick={handleReset} className="btn-secondary">Reset</button>
      </div>
    </form>
  );
};

export default InputForm;