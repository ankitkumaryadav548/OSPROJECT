/**
 * FIFO (First In First Out) Page Replacement Algorithm
 * @param {number[]} referenceString - Array of page references
 * @param {number} numFrames - Number of memory frames
 * @returns {object} - Simulation results with steps, faults, and hits
 */
export function simulateFIFO(referenceString, numFrames) {
  const frames = [];
  const steps = [];
  let faults = 0;
  let hits = 0;

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageIndex = frames.indexOf(page);

    if (pageIndex !== -1) {
      // Page hit - page already in memory
      hits++;
      const displayFrames = [...frames].concat(new Array(Math.max(0, numFrames - frames.length)).fill(null));
      steps.push({
        step: i + 1,
        reference: page,
        frames: displayFrames,
        fault: false,
        hitFrameIndex: displayFrames.indexOf(page),
      });
    } else {
      // Page fault - page not in memory
      faults++;
      
      if (frames.length < numFrames) {
        // Memory has space, just add the page
        frames.push(page);
      } else {
        // Memory is full, remove oldest (first added - FIFO principle)
        frames.shift();
        frames.push(page);
      }
      
      const displayFrames = [...frames].concat(new Array(Math.max(0, numFrames - frames.length)).fill(null));
      steps.push({
        step: i + 1,
        reference: page,
        frames: displayFrames,
        fault: true,
      });
    }
  }

  return {
    algorithm: 'FIFO',
    steps,
    totalFaults: faults,
    totalHits: hits,
  };
}