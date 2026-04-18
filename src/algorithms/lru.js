/**
 * LRU (Least Recently Used) Page Replacement Algorithm
 * @param {number[]} referenceString - Array of page references
 * @param {number} numFrames - Number of memory frames
 * @returns {object} - Simulation results with steps, faults, and hits
 */
export function simulateLRU(referenceString, numFrames) {
  const frames = []; // Ordered by recency: least recent at index 0, most recent at last index
  const steps = [];
  let faults = 0;
  let hits = 0;

  for (let i = 0; i < referenceString.length; i++) {
    const page = referenceString[i];
    const pageIndex = frames.indexOf(page);

    if (pageIndex !== -1) {
      // Page hit - page already in memory
      hits++;
      // Mark as recently used by moving to end
      frames.splice(pageIndex, 1);
      frames.push(page);
      
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
        // Memory is full, remove least recently used (first element)
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
    algorithm: 'LRU',
    steps,
    totalFaults: faults,
    totalHits: hits,
  };
}