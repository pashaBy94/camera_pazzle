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