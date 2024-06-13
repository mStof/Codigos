const geniusContainer = document.querySelector(".genius");
const geniusBtns = document.querySelectorAll(".genius > div");
const timerContainer = document.querySelector(".timer-container");
const timerDisplay = document.querySelector(".hour-display");
const modalScreen = document.querySelector(".modal-screen");
const closeModalBtn = document.querySelector(".modal-screen form button");
const modalBg = document.querySelector(".modal")

closeModalBtn.addEventListener("click", iniciar);
function iniciar() {
  modalBg.style.display = "none";
  let ganhos = 0;
  let sequence = 0;
  let resetPatern = false;
  let isEarlyGame = true


  const continus = () => {
    if (patterActive.length !== sequence + 1) {
      const btnSound = new Audio("../../sounds/btn-sound.mp3");
      btnSound.play();
      return sequence++;
    }
    const correctSound = new Audio("../../sounds/correct-sound.mp3");
    correctSound.play();
    ganhos++;
    sequence = 0;
    geniusContainer.removeEventListener("click", handleClick);
    setTimeout(() => startGame(), 500);
    return;
  };

  const wrong = () => {
    const wrongSound = new Audio("../../sounds/wrong-sound.mp3");
    wrongSound.play();
    ganhos = 1;
    sequence = 0;
    resetPatern = true;
    isEarlyGame = true;
    setTimeout(() => startGame(), 1750);
  };

  const win = () => {
    modalScreen.showModal();
    const img = modalScreen.querySelector("img");
    const text = modalScreen.querySelector("p");
    text.innerHTML =
      "Parabéns você desarmou a bomba, sinta-se orgulhoso soldado <3";
  };

  const lose = () => {
    modalBg.style.display = "block";
    modalScreen.showModal();
    const img = modalScreen.querySelector("img");
    const text = modalScreen.querySelector("p");
    modalScreen.style.backgroundColor = '#82ad77'
    img.src = '../../imgs/lose_img.png';
    text.innerHTML =
      "Parabéns você morreu tentando desarmar uma bomba de nível iniciante, e condenou sua nação inteira, sinte-se orgulhoso, soldado.";
  };

  const acendendo = async (i) =>
    new Promise((resolve) => {
      switch (patterActive[i].className) {
        case "red":
          patterActive[i].style.backgroundColor = "#F42525";
          break;
        case "green":
          patterActive[i].style.backgroundColor = "#25F425";
          break;
        case "blue":
          patterActive[i].style.backgroundColor = "#2525F4";
          break;
        case "yellow":
          patterActive[i].style.backgroundColor = "#F4F425";
          break;
        case "cyan":
          patterActive[i].style.backgroundColor = "#25F4F4";
          break;
        case "purple":
          patterActive[i].style.backgroundColor = "#F425F4";
          break;
      }
      setTimeout(() => (patterActive[i].style = ""), 1000);
      setTimeout(() => resolve(), 1500);
    });
  const patterActive = [];
  const chooseAPattern = () => {
    if (resetPatern) {
      while (patterActive.length) patterActive.pop();
      resetPatern = false;
    }
    const newPattern = Math.floor(Math.random() * geniusBtns.length);
    patterActive.push(geniusBtns[newPattern]);
  };

  const handleClick = (e) => {
    e.target === patterActive[sequence] ? continus() : wrong();
  };

  const startGame = async () => {
    if (ganhos === 8) {
      return win();
    }
    chooseAPattern();
    for (let i = 0; i < patterActive.length; i++) await acendendo(i);
    console.log("Pattern ativo", patterActive);
    console.log("Ganhos", ganhos);
    console.log("Sequencia", sequence);
    geniusContainer.addEventListener("click", handleClick);
  };
  startTimer(lose)
  startGame();
}
