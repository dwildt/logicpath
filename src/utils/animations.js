/**
 * Animation utility functions
 */

/**
 * Wait for specified milliseconds
 * @param {number} ms
 * @returns {Promise}
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Animate element with CSS class
 * @param {HTMLElement} element
 * @param {string} animationClass
 * @param {number} duration
 * @returns {Promise}
 */
export async function animateWithClass(element, animationClass, duration = 500) {
  element.classList.add(animationClass);
  await wait(duration);
  element.classList.remove(animationClass);
}

/**
 * Transition element to new position
 * @param {HTMLElement} element
 * @param {{x: number, y: number}} newPosition
 * @param {number} duration
 * @returns {Promise}
 */
export function transitionTo(element, newPosition, duration = 300) {
  return new Promise(resolve => {
    element.style.transition = `transform ${duration}ms ease-in-out`;
    element.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;

    const handleTransitionEnd = () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
      resolve();
    };

    element.addEventListener('transitionend', handleTransitionEnd);
  });
}

/**
 * Rotate element to angle
 * @param {HTMLElement} element
 * @param {number} degrees
 * @param {number} duration
 * @returns {Promise}
 */
export function rotateTo(element, degrees, duration = 300) {
  return new Promise(resolve => {
    element.style.transition = `transform ${duration}ms ease-in-out`;
    element.style.transform = `rotate(${degrees}deg)`;

    const handleTransitionEnd = () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
      resolve();
    };

    element.addEventListener('transitionend', handleTransitionEnd);
  });
}
