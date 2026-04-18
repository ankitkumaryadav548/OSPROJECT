# Efficient Page Replacement Algorithm Simulator

A React-based web application that simulates and compares page replacement algorithms used in operating systems: FIFO, LRU, and Optimal.

## Features

- **Step-by-step simulation** of page replacement algorithms
- **Visual comparison** using Chart.js
- **Interactive input** for reference strings and frame counts
- **Educational tool** for OS students

## Algorithms Implemented

1. **FIFO (First In First Out)**: Replaces the oldest page in memory
2. **LRU (Least Recently Used)**: Replaces the least recently accessed page
3. **Optimal**: Replaces the page that will not be used for the longest time in the future

## Technologies Used

- **Frontend**: React.js, HTML, CSS
- **Visualization**: Chart.js with react-chartjs-2
- **Build Tool**: Vite
- **Styling**: Custom CSS

## Project Structure

```
src/
├── algorithms/
│   ├── fifo.js
│   ├── lru.js
│   └── optimal.js
├── components/
│   ├── InputForm.jsx
│   ├── SimulationTable.jsx
│   └── Charts.jsx
├── utils/
│   └── helpers.js
├── visualization/
│   └── chart.js
├── App.jsx
├── App.css
└── main.jsx
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. Enter a reference string (comma-separated page numbers)
2. Set the number of memory frames
3. Select an algorithm or choose "Compare All"
4. Click "Run Simulation" to see the results

## Example

- Reference String: `7, 0, 1, 2, 0, 3, 0, 4`
- Frames: `3`
- Algorithm: `Compare All`

This will show step-by-step execution for each algorithm along with comparison charts.

## Contributing

Feel free to contribute by adding more algorithms or improving the UI/UX.
