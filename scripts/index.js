let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let initailValues = { isMusic: true, isVideo: true, isPazzle: 'video', isSound: true, isTime: true, imagUrl: null, imag: new Image(), difficult: null, backGround: 0 };
let SIZE = { x: 0, y: 0, width: 0, height: 0, rows: 2, columns: 3 };
let process = { isGame: false };
let SCALER = 0.7;
let PIEZES = [];
let VARIABLE_END = 40;
let CORRECT_DISTANCE = 0;
let CURRENT_PIEZED_INDEX = null;
let SELECTED_PIEZES = null;
let START_TIME = null;
let END_TIME = null;
let CORRECT_PIEZES = new Set();
let BELL_AUDIO = new Audio('/sound/bell.mp3');
let PAZZLE_AUDIO = new Audio('/sound/pazzle.mp3');
let MUSIC = new Audio('/sound/music.mp3');
MUSIC.loop = true;
let UPDATE = new Image();

function setDefaultSettings() {
    process.isGame = false;
    VARIABLE_END = 40;
    initailValues.isVideo = true;
    initailValues.imag = new Image();
    promise = null;
    PIEZES.length = 0;
    CURRENT_PIEZED_INDEX = null;
    SELECTED_PIEZES = null;
    START_TIME = null;
    END_TIME = null;
    CORRECT_PIEZES = new Set();
    VIDEO = null;
}
function playSound(audio) {
    if (initailValues.isSound) audio.play();
}
function playMusic(audio) {
    if (initailValues.isMusic) audio.play();
    else audio.pause();
}

function loader() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    let line = Math.min(CANVAS.width, CANVAS.height);
    SIZE.width = line / 2;
    SIZE.height = line / 2;
    SIZE.x = CANVAS.width / 2 - SIZE.width / 2;
    SIZE.y = CANVAS.height / 2 - SIZE.height / 2;
    initialPieze();
    paintBackgound(initailValues.backGround);
    for (let i = 0; i < PIEZES.length; i++) {
        setTimeout(() => {
            try {
                PIEZES[i].drawColor(CONTEXT);
                if (i === PIEZES.length - 1 && !process.isGame)
                    loader();
            } catch (e) {
            }
        }, i * 200);
    }
}
function main() {
    playMusic(MUSIC);
    setDifficult();
    CANVAS = document.getElementById('myCanvas');
    CONTEXT = CANVAS.getContext('2d');
    UPDATE.src = '/img/update.svg';
    loader();
    choisiImag(initailValues.imagUrl);
    initailValues.imag.onload = () => {
        addEventListener();
        process.isGame = true;
        switch (initailValues.isPazzle) {
            case 'video': {
                let promise = navigator.mediaDevices.getUserMedia({ video: true }); //video: {width:{exact:200}, height:{exact:200}}
                promise.then(signal => {
                    VIDEO = document.createElement('video');
                    VIDEO.srcObject = signal;
                    VIDEO.play();
                    VIDEO.onloadeddata = () => {
                        openMenuTop();
                        handleResize();
                        window.addEventListener('resize', handleResize);
                        initialPieze();
                        randomizePiezes();
                        updateCanvas();
                    }
                }).catch(err => alert('camera error:' + err))
                break;
            }
            case 'photo': {
                let promise = navigator.mediaDevices.getUserMedia({ video: true }); //video: {width:{exact:200}, height:{exact:200}}
                promise.then(signal => {
                    VIDEO = document.createElement('video');
                    VIDEO.srcObject = signal;
                    VIDEO.play();
                    VIDEO.onloadeddata = () => {
                        addButtonForPhoto();
                        openMenuTop();
                        handleResize();
                        window.addEventListener('resize', handleResize);
                        // document.querySelector().addEventListener('resize', handleResize);
                        initialPieze();
                        updateCanvas();
                    }
                }).catch(err => alert('camera error:' + err))
                break;
            }
            case 'imag': {
                openMenuTop();
                handleResize();
                window.addEventListener('resize', handleResize);
                initialPieze();
                randomizePiezes();
                updateCanvas();
                break;
            }
            default:
                break;
        }
    }

}
function addButtonForPhoto() {
    let button = document.createElement('button');
    button.innerHTML = 'ФОТО';
    button.classList.add('photo_button');
    button.addEventListener('click', pressPhoto);
    document.querySelector('.contains').append(button);
}
function pressPhoto() {
    VIDEO.pause();
    randomizePiezes();
    document.querySelector('.photo_button').remove();
}
function setDifficult() {
    switch (initailValues.difficult) {
        case 'easy': {
            SIZE.rows = 2;
            SIZE.columns = 2;
            break;
        };
        case 'medium': {
            SIZE.rows = 5;
            SIZE.columns = 6;
            break;
        }
        case 'hard': {
            SIZE.rows = 7;
            SIZE.columns = 8;
            break;
        }
        case 'insane': {
            SIZE.rows = 10;
            SIZE.columns = 12;
            break;
        }
    }
}

function restart() {
    initialPieze();
    randomizePiezes();
    startedTime();
    END_TIME = null;
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

function addEventListener() {
    CANVAS.addEventListener('mousedown', onMouseDown);
    CANVAS.addEventListener('touchstart', onTouchStart);
    CANVAS.addEventListener('mouseup', onMouseUp);
    CANVAS.addEventListener('touchend', onTouchEnd);
}
function onMouseDown(ev) {
    if (ev.x > CANVAS.width*0.9 && ev.x < CANVAS.width*0.97 && ev.y > SIZE.y && ev.y < (SIZE.y + CANVAS.width*0.07)) randomizePiezes() ////test -------------------------
    SELECTED_PIEZES = getSelectedPiezes(ev);
    if (SELECTED_PIEZES !== null && SELECTED_PIEZES.correct === false) {
        CANVAS.addEventListener('mousemove', onMouseMove);
        PIEZES.splice(CURRENT_PIEZED_INDEX, 1);
        PIEZES.push(SELECTED_PIEZES);
        SELECTED_PIEZES.offset = {
            x: ev.x - SELECTED_PIEZES.x,
            y: ev.y - SELECTED_PIEZES.y
        }
    }
}
function onTouchStart(event) {
    let coord = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    onMouseDown(coord);
    if (SELECTED_PIEZES) {
        CANVAS.addEventListener('touchmove', onTouchMove);
    }
}

function onMouseMove(ev) {
    if (SELECTED_PIEZES !== null) {
        SELECTED_PIEZES.x = ev.x - SELECTED_PIEZES.offset.x;
        SELECTED_PIEZES.y = ev.y - SELECTED_PIEZES.offset.y;
    }
}
function onTouchMove(event) {
    let coord = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    onMouseMove(coord)
}
function isComplete() {
    if (CORRECT_PIEZES.size === PIEZES.length) return true
    return false
}
function comletedPiezes() {
    console.log(22);
    CANVAS.removeEventListener('mousedown', onMouseDown);
    CANVAS.removeEventListener('touchstart', onTouchStart);
    console.log('end');
    stopedTime();
    endGame();
}

function endGame() {
    VARIABLE_END--;
    process.isGame = false;
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    paintBackgound(initailValues.backGround);
    CONTEXT.clearRect(SIZE.x--, SIZE.y, SIZE.width += 2, SIZE.height += 2);
    if (initailValues.isVideo && VIDEO != null)
        CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    CONTEXT.drawImage(initailValues.imag, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    if (VARIABLE_END > 0) {
        requestAnimationFrame(endGame);
    } else {
        CANVAS.addEventListener('mousedown', toStart);
        CANVAS.addEventListener('touchstart', toStart);
    }
}
function toStart() {
    goToHome();
    CANVAS.removeEventListener('mousedown', toStart);
    CANVAS.removeEventListener('touchstart', toStart);
}

function onMouseUp() {
    if (SELECTED_PIEZES) {
        if (SELECTED_PIEZES.isClose()) {
            SELECTED_PIEZES.snap();
        }
        if (isComplete()) {
            comletedPiezes();
        }
        SELECTED_PIEZES = null;
        CANVAS.removeEventListener('mousemove', onMouseMove);
    }
}
function onTouchEnd() {
    if (SELECTED_PIEZES) {
        onMouseUp();
        CANVAS.removeEventListener('touchmove', onTouchMove);
    }
}

function getSelectedPiezes(evt) {
    for (let i = PIEZES.length - 1; i >= 0; i--) {
        if (evt.x > PIEZES[i].x && evt.x < PIEZES[i].x + PIEZES[i].width &&
            evt.y > PIEZES[i].y && evt.y < PIEZES[i].y + PIEZES[i].height) {
            CURRENT_PIEZED_INDEX = i;
            return PIEZES[i];
        }
    }
    return null
}
function paintBackgound(i) {
    const gradient = CONTEXT.createConicGradient(0, CANVAS.width / 2, CANVAS.height / 2);
    if (i) {
        for (let j = 0; j < arrColors[i].length; j++) {
            if (j == 0) {
                gradient.addColorStop(0, arrColors[i][j]);
                gradient.addColorStop(1, arrColors[i][j]);
            } else {
                gradient.addColorStop((1 / (arrColors[i].length)) * j, arrColors[i][j]);
            }
        }
    } else {
        gradient.addColorStop(0, 'blueviolet');
    }
    CONTEXT.fillStyle = gradient;
    CONTEXT.rect(0, 0, CANVAS.width, CANVAS.height);
    CONTEXT.fill();
}

function updateCanvas() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    paintBackgound(initailValues.backGround);
    CONTEXT.clearRect(SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    CONTEXT.globalAlpha = 0.3;
    if (initailValues.isVideo && process.isGame)
        CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    CONTEXT.drawImage(initailValues.imag, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    CONTEXT.globalAlpha = 1;
    for (let i = 0; i < PIEZES.length; i++) {
        PIEZES[i].draw(CONTEXT);
    }
    CONTEXT.drawImage(UPDATE, CANVAS.width*0.9, SIZE.y, CANVAS.width*0.07, CANVAS.width*0.07);
    if (process.isGame)
        requestAnimationFrame(updateCanvas);
}

function handleResize() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    let sizeHeight;
    let sizeWidth;
    if (initailValues.isVideo) {
        sizeHeight = VIDEO.videoHeight;
        sizeWidth = VIDEO.videoWidth;
    } else {
        sizeHeight = initailValues.imag.height;
        sizeWidth = initailValues.imag.width;
    }
    let resizer = SCALER * Math.min(
        window.innerWidth / sizeWidth,
        window.innerHeight / sizeHeight
    );
    SIZE.width = resizer * sizeWidth;
    SIZE.height = resizer * sizeHeight;
    SIZE.x = window.innerWidth / 2 - SIZE.width / 2;
    SIZE.y = window.innerHeight / 2 - SIZE.height / 2;
}

function initialPieze() {
    CORRECT_PIEZES = new Set();
    CORRECT_DISTANCE = Math.min(SIZE.width, SIZE.height) * 0.04;
    PIEZES.length = 0;
    for (let i = 0; i < SIZE.rows; i++) {
        for (let j = 0; j < SIZE.columns; j++) {
            PIEZES.push(new Piece(i, j));
        }
    }
    let cnt = 0;
    for (let i = 0; i < SIZE.rows; i++) {
        for (let j = 0; j < SIZE.columns; j++) {
            const piese = PIEZES[cnt];
            if (i == SIZE.rows - 1) {
                piese.bottom = null;
            } else {
                const sgn = (Math.random() - 0.5) < 0 ? -1 : 1;
                piese.bottom = sgn * (Math.random() * 0.4 + 0.3);
            }
            if (j == SIZE.columns - 1) {
                piese.right = null;
            } else {
                const sgn = (Math.random() - 0.5) < 0 ? -1 : 1;
                piese.right = sgn * (Math.random() * 0.4 + 0.3);
            }
            if (i == 0) {
                piese.top = null;
            } else {
                piese.top = -PIEZES[cnt - SIZE.columns].bottom;
            }
            if (j == 0) {
                piese.left = null;
            } else {
                piese.left = -PIEZES[cnt - 1].right;
            }
            cnt++;
        }
    }
}
