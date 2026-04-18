import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { getFaultsChartConfig, getHitsFaultsChartConfig } from '../visualization/chart.js';

const Charts = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="charts">
      {results.length > 1 && (
        <div className="chart-container card fade-in">
          <h3 className="chart-title">Page Faults Comparison</h3>
          <Bar {...getFaultsChartConfig(results)} />
        </div>
      )}
      {results.length === 1 && (
        <div className="chart-container card fade-in">
          <h3 className="chart-title">{results[0].algorithm} - Hits vs Faults</h3>
          <Pie {...getHitsFaultsChartConfig(results[0])} />
        </div>
      )}
    </div>
  );
};

export default Charts;