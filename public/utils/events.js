/**
 * Event utility functions
 */

/**
 * Dispatch a custom event
 * @param {string} eventName
 * @param {Object} detail
 * @param {HTMLElement} target
 */
export function dispatchEvent(eventName, detail = {}, target = window) {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    cancelable: true
  });
  target.dispatchEvent(event);
}

/**
 * Add event listener
 * @param {string} eventName
 * @param {Function} handler
 * @param {HTMLElement} target
 * @returns {Function} Cleanup function
 */
export function addEventListener(eventName, handler, target = window) {
  target.addEventListener(eventName, handler);
  return () => target.removeEventListener(eventName, handler);
}

/**
 * Add event listener that only fires once
 * @param {string} eventName
 * @param {Function} handler
 * @param {HTMLElement} target
 */
export function addEventListenerOnce(eventName, handler, target = window) {
  target.addEventListener(eventName, handler, { once: true });
}
