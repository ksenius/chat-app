/**
 * Creates an HTML element.
 * @param {string} tag
 * @param {string} className
 * @param {string} [text]
 */
export function createElement(tag, className, text) {
  const element = document.createElement(tag);

  element.className = className;

  if (text) {
    element.innerHTML = text;
  }

  return element;
}
