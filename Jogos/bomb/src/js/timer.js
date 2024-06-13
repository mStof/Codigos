const startTimer = (loseFunc) => {
  let timer = 60;
  const horaInicio = new Date().getTime();
  const horaExpirar = new Date(horaInicio + timer * 1000);

  const timeStarter = window.setInterval(() => {
    const agora = new Date();
    const milisegundosParaExpirar = horaExpirar.getTime() - agora.getTime();
    const segundosExpirar = Math.floor(milisegundosParaExpirar / 1000);
    const minutosExpirar = Math.floor(milisegundosParaExpirar / (1000 * 60));
    timerDisplay.innerHTML = `0${minutosExpirar}:${
      segundosExpirar < 10 ? "0" + segundosExpirar : segundosExpirar
    }`;

    if (segundosExpirar === 0) {
      loseFunc();
      clearInterval(timeStarter);
    }
  }, 500);
};
