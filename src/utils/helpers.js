/**
 * Utility functions for the Page Replacement Simulator
 */

/**
 * Parse a comma-separated string into an array of numbers
 * @param {string} input - Comma-separated string like "7, 0, 1, 2"
 * @returns {number[]} - Array of numbers
 */
export function parseReferenceString(input) {
  return input
    .trim()
    .split(/[,\s]+/)
    .map(s => s.trim())
    .filter(s => s !== '')
    .map(s => parseInt(s, 10))
    .filter(n => !isNaN(n));
}

/**
 * Validate inputs
 * @param {string} refString - Reference string input
 * @param {number} numFrames - Number of frames
 * @returns {object} - {valid: boolean, error: string}
 */
export function validateInputs(refString, numFrames) {
  const refs = parseReferenceString(refString);
  if (refs.length === 0) {
    return { valid: false, error: 'Reference string must contain at least one page number.' };
  }
  if (numFrames < 1 || numFrames > 10) {
    return { valid: false, error: 'Number of frames must be between 1 and 10.' };
  }
  return { valid: true, error: '' };
}