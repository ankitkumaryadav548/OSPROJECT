/**
 * Optimal Page Replacement Algorithm
 * @param {number[]} referenceString - Array of page references
 * @param {number} numFrames - Number of memory frames
 * @returns {object} - Simulation results with steps, faults, and hits
 */
export function simulateOptimal(referenceString, numFrames) {
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
        // Memory is full, find optimal page to replace
        // Find the page that will be used farthest in the future (or never used again)
        let pageToRemove = 0;
        let farthestUse = -1;

        for (let j = 0; j < frames.length; j++) {
          let nextUse = -1;
          
          // Find next use of frames[j] after current position
          for (let k = i + 1; k < referenceString.length; k++) {
            if (referenceString[k] === frames[j]) {
              nextUse = k;
              break;
            }
          }
          
          // If page is never used again, replace it immediately
          if (nextUse === -1) {
            pageToRemove = j;
            break;
          }
          
          // Otherwise, keep track of the page used farthest in future
          if (nextUse > farthestUse) {
            farthestUse = nextUse;
            pageToRemove = j;
          }
        }
        
        frames[pageToRemove] = page;
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

  // return {
  //   algorithm: 'Optimal',
  //   steps,
  //   totalFaults: faults,
  //   totalHits: hits,
  };
// }