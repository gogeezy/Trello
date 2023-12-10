import { clockElement } from './dom.js';
function clock() {
  setInterval(() => {
    const now = new Date();
    clockElement.innerHTML = now.toLocaleTimeString();
  }, 1000);
}
export { clock };
