// wizard.js
// AVATAR SWITCHER
// changing image functions for the wiz
export function wizQuestion() {
  const tuxContainer = document.querySelector("#tux-avatar-container"); // Corrected ID
  tuxContainer.innerHTML = "";
  let tuxImg = `<img src="./static/img/tux/tux-question.svg" width="100" height="100" alt="tux-wizard" class="wizard" id="wizard-avatar"/>`;
  tuxContainer.innerHTML = tuxImg;
}

export function wizHappy() {
  const tuxContainer = document.querySelector("#tux-avatar-container"); // Corrected ID
  tuxContainer.innerHTML = "";
  let tuxImg = `<img src="./static/img/tux/tux-happy-1.svg" width="100" height="100" alt="tux-wizard" class="wizard" id="wizard-avatar"/>`;
  tuxContainer.innerHTML = tuxImg;
}

export function wizSad() {
  const tuxContainer = document.querySelector("#tux-avatar-container"); // Corrected ID
  tuxContainer.innerHTML = "";
  let tuxImg = `<img src="./static/img/tux/tux-sad.svg" width="100" height="100" alt="tux-wizard" class="wizard" id="wizard-avatar"/>`;
  tuxContainer.innerHTML = tuxImg;
}

export function wizInfo() {
  const tuxContainer = document.querySelector("#tux-avatar-container"); // Corrected ID
  tuxContainer.innerHTML = "";
  let tuxImg = `<img src="./static/img/tux/tux-idea.svg" width="100" height="100" alt="tux-wizard" class="wizard" id="wizard-avatar"/>`;
  tuxContainer.innerHTML = tuxImg;
}
