const controlSection = document.getElementById('controls');
const key = (str) => `lucodear-icons-diff-list-controls-${str}`;
const currentSize =
  parseInt(localStorage.getItem(key('icon-size')), 10) || defaultIconSize;

const setRootCssVar = (size) => {
  document.documentElement.style.setProperty('--icon-size', `${size}px`);
};

setRootCssVar(currentSize);

const changeIconsSizes = (size) => {
  setRootCssVar(size);
  localStorage.setItem(key('icon-size'), size);
};

// for each icon size create a button with the size as the text
// that when clicked will change the size of the icons by calling changeIconsSizes
iconSizes.forEach((size) => {
  const button = document.createElement('button');
  button.innerText = `${size}px`;
  button.onclick = () => changeIconsSizes(size);
  controlSection.appendChild(button);
});

console.log('current size', currentSize);
