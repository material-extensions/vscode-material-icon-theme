const addControls = () => {
  const controlSection = document.getElementById('controls');

  const setRootCssVar = (size) => {
    document.documentElement.style.setProperty('--icon-size', `${size}px`);
  };

  const changeIconsSizes = (size) => {
    setRootCssVar(size);
  };

  [16, 24, 30, 32].forEach((size) => {
    const button = document.createElement('button');
    button.innerText = `${size}px`;
    button.onclick = () => changeIconsSizes(size);
    controlSection.appendChild(button);
  });

  window.scrollTo(0, 0);
};

window.addEventListener('load', addControls);
