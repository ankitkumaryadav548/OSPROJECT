import React from 'react';

const SimulationTable = ({ results }) => {
  const renderTable = (result, index) => {
    const frameCount = result.steps?.[0]?.frames.length || 0;

    return (
      <div key={result.algorithm} className="algorithm-result card fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
        <h3 className="algorithm-title">{result.algorithm} Algorithm</h3>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total Faults:</span>
            <span className="stat-value fault-count">{result.totalFaults}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Hits:</span>
            <span className="stat-value hit-count">{result.totalHits}</span>
          </div>
        </div>
        <div className="table-container">
          <table className="simulation-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Reference Page</th>
                {Array.from({ length: frameCount }, (_, idx) => (
                  <th key={`frame-header-${idx}`}>Frame {idx}</th>
                ))}
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {result.steps.map((step, stepIndex) => (
                <tr key={step.step} className="table-row" style={{ animationDelay: `${stepIndex * 0.05}s` }}>
                  <td>{step.step}</td>
                  <td className="reference-cell">
                    <span className="reference-chip">{step.reference}</span>
                  </td>
                  {step.frames.map((frame, idx) => (
                    <td
                      key={`frame-${idx}`}
                      className={`frame-item ${frame === null ? 'empty' : ''} ${step.fault === false && step.hitFrameIndex === idx ? 'hit-frame' : ''}`}
                    >
                      <span className="frame-chip">{frame !== null ? frame : '-'}</span>
                    </td>
                  ))}
                  <td className={`result ${step.fault ? 'fault' : 'hit'}`}>
                    <span className="result-chip">{step.fault ? 'Page Fault' : 'Page Hit'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="simulation-tables">
      {Array.isArray(results) ? results.map((result, index) => renderTable(result, index)) : renderTable(results, 0)}
    </div>
  );
};

export default SimulationTable;