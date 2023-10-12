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
    MUSIC.pause();
}

function main() {
    console.log(SIZE);
    setDifficult();
    CANVAS = document.getElementById('myCanvas');
    CONTEXT = CANVAS.getContext('2d');
    UPDATE.src = '/img/update.svg';
    loader();
    choisiImag(initailValues.imagUrl);
    initailValues.imag.onload = () => {
        addEventListener();
        process.isGame = true;
        playMusic(MUSIC);
        switch (initailValues.isPazzle) {
            case 'video': {
                let promise = navigator.mediaDevices.getUserMedia({ video: true });
                promise.then(signal => {
                    VIDEO = document.createElement('video');
                    VIDEO.srcObject = signal;
                    VIDEO.play();
                    VIDEO.onloadeddata = () => {
                        openMenuTop();
                        handleResize();
                        initialPieze();
                        randomizePiezes();
                        updateCanvas();
                    }
                }).catch(err => alert('camera error:' + err))
                break;
            }
            case 'photo': {
                let promise = navigator.mediaDevices.getUserMedia({ video: true });
                promise.then(signal => {
                    VIDEO = document.createElement('video');
                    VIDEO.srcObject = signal;
                    VIDEO.play();
                    VIDEO.onloadeddata = () => {
                        addButtonForPhoto();
                        openMenuTop();
                        handleResize();
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
            SIZE.rows = 3;
            SIZE.columns = 3;
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
    CONTEXT.drawImage(UPDATE, CANVAS.width * 0.9, CANVAS.height - CANVAS.width * 0.14, CANVAS.width * 0.07, CANVAS.width * 0.07);
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
