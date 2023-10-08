function getColor() {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}
function formatedTime(time) {
    let sec = Math.trunc((new Date().getTime() - time) / 1000);
    let second = sec % 60;
    let minutes = Math.trunc((sec % (60 * 60)) / 60);
    let hours = Math.trunc((sec % (60 * 60 * 24)) / (60 * 60));
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;
}
function choisiImag(str) {
    if (str != null)
        initailValues.imag.src = str;
}
function playSound(audio) {
    if (initailValues.isSound) audio.play();
}
function playMusic(audio) {
    if (initailValues.isMusic && process.isGame) audio.play();
    else audio.pause();
}
function startedTime() {
    START_TIME = new Date().getTime();
    updateTime();
    setInterval(updateTime, 1000);
}
function updateTime() {
    if (START_TIME !== null) {
        let time = formatedTime(START_TIME);
        document.querySelector('.time').innerHTML = time;
    }
}
function stopedTime() {
    END_TIME = START_TIME;
    clearInterval(updateTime, 1000);
    START_TIME = null;
}