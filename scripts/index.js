let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SIZE = { x: 0, y: 0, width: 0, height: 0, rows: 2, columns: 3 };
let SCALER = 0.7;
let PIEZES = [];
let CORRECT_DISTANCE = 0;
let CURRENT_PIEZED_INDEX = null;
let SELECTED_PIEZES = null;
let START_TIME = null;
let END_TIME = null;
let CORRECT_PIEZES = new Set();
let IMAG = new Image();
IMAG.src = "img/belosnegka.png";



function main() {
    CANVAS = document.getElementById('myCanvas');
    CONTEXT = CANVAS.getContext('2d');
    addEventListener();

    let promise = navigator.mediaDevices.getUserMedia({ video: true }); //video: {width:{exact:200}, height:{exact:200}}
    promise.then(signal => {
        VIDEO = document.createElement('video');
        VIDEO.srcObject = signal;
        VIDEO.play();
        VIDEO.onloadeddata = () => {
                handleResize();
                window.addEventListener('resize', handleResize);
                initialPieze();
                randomizePiezes();
                updateCanvas();
            }
    }).catch(err => alert('camera error:' + err))
}
function setDifficult() {
    let difficult = document.querySelector('#difficult').value;
    switch (difficult) {
        case 'easy': {
            SIZE.rows = 3;
            SIZE.columns = 3;
            // initialPieze(3,3);
            break;
        };
        case 'medium': {
            SIZE.rows = 5;
            SIZE.columns = 5;
            // initialPieze(5,5);
            break;
        }
        case 'hard': {
            SIZE.rows = 10;
            SIZE.columns = 10;
            // initialPieze(10,10);
            break;
        }
        case 'insane': {
            SIZE.rows = 12;
            SIZE.columns = 16;
            // initialPieze(16, 24);
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
function formatedTime(time) {
    let sec = Math.trunc((new Date().getTime() - time) / 1000);
    let second = sec % 60;
    let minutes = Math.trunc((sec % (60 * 60)) / 60);
    let hours = Math.trunc((sec % (60 * 60 * 24)) / (60 * 60));
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${second < 10 ? '0' + second : second}`;
}
function stopedTime() {
    END_TIME = START_TIME;
    clearInterval(updateTime, 1000);
    START_TIME = null;
}

function addEventListener() {
    CANVAS.addEventListener('mousedown', onMouseDown);
    CANVAS.addEventListener('touchstart', onTouchStart);
    // CANVAS.addEventListener('mousemove', onMouseMove); //optimization drag and drop
    // CANVAS.addEventListener('touchmove', onTouchMove); //optimization drag and drop
    CANVAS.addEventListener('mouseup', onMouseUp);
    CANVAS.addEventListener('touchend', onTouchEnd);
}

function onMouseDown(ev) {
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
    stopedTime();
    console.log(formatedTime(END_TIME));
}

function onMouseUp(ev) {
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

function updateCanvas() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CONTEXT.globalAlpha = 0.5;
    CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    // imag.addEventListener('load',()=>{
    //     console.log(11);
    // },false)
    // imag.src = "img/belosnegka.png";
    CONTEXT.drawImage(IMAG, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    CONTEXT.globalAlpha = 1;
    for (let i = 0; i < PIEZES.length; i++) {
        PIEZES[i].draw(CONTEXT);
    }
    requestAnimationFrame(updateCanvas)
}

function handleResize() {

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    let resizer = SCALER * Math.min(
        window.innerWidth / VIDEO.videoWidth,
        window.innerHeight / VIDEO.videoHeight
    );
    SIZE.width = resizer * VIDEO.videoWidth;
    SIZE.height = resizer * VIDEO.videoHeight;
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
    startedTime();
}

function randomizePiezes() {
    for (let i = 0; i < PIEZES.length; i++) {
        PIEZES[i].x = Math.random() * (CANVAS.width - PIEZES[i].width);
        PIEZES[i].y = Math.random() * (CANVAS.height - PIEZES[i].height);
    }
}

class Piece {
    constructor(rowIndex, colIndex) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.x = SIZE.x + (SIZE.width / SIZE.columns) * this.colIndex;
        this.y = SIZE.y + (SIZE.height / SIZE.rows) * this.rowIndex;
        this.correctCoord = { x: this.x, y: this.y };
        this.width = SIZE.width / SIZE.columns;
        this.height = SIZE.height / SIZE.rows;
        this.correct = false;
    }
    draw(context) {
        // console.log(IMAG);
        context.beginPath();
        let sz = Math.min(this.width, this.height);
        let nes = 0.05 * sz;
        let tabWidth = sz * 0.3;
        let tabHeight = sz * 0.3;
        context.moveTo(this.x, this.y);
        //top
        if (this.top) {
            context.lineTo(this.x + this.width * Math.abs(this.top) - nes, this.y);
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.top) - nes,
                this.y - tabHeight * Math.sign(this.top) * 0.2,
                this.x + this.width * Math.abs(this.top) - tabWidth,
                this.y - tabHeight * Math.sign(this.top),
                this.x + this.width * Math.abs(this.top),
                this.y - tabHeight * Math.sign(this.top)
            );
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.top) + tabWidth,
                this.y - tabHeight * Math.sign(this.top),
                this.x + this.width * Math.abs(this.top) + nes,
                this.y - tabHeight * Math.sign(this.top) * 0.2,
                this.x + this.width * Math.abs(this.top) + nes,
                this.y
            );
        }
        context.lineTo(this.x + this.width, this.y);
        //right
        if (this.right) {
            context.lineTo(this.x + this.width, this.y + this.height * Math.abs(this.right) - nes);
            context.bezierCurveTo(
                this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
                this.y + this.height * Math.abs(this.right) - nes,
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right) - tabWidth,
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right),
            );
            context.bezierCurveTo(
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right) + tabWidth,
                this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
                this.y + this.height * Math.abs(this.right) + nes,
                this.x + this.width,
                this.y + this.height * Math.abs(this.right) + nes,
            );
        }
        context.lineTo(this.x + this.width, this.y + this.height);
        //bottom
        if (this.bottom) {
            context.lineTo(this.x + this.width * Math.abs(this.bottom) + nes, this.y + this.height);
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.bottom) + nes,
                this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,
                this.x + this.width * Math.abs(this.bottom) + tabWidth,
                this.y + this.height + tabHeight * Math.sign(this.bottom),
                this.x + this.width * Math.abs(this.bottom),
                this.y + this.height + tabHeight * Math.sign(this.bottom)
            );
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.bottom) - tabWidth,
                this.y + this.height + tabHeight * Math.sign(this.bottom),
                this.x + this.width * Math.abs(this.bottom) - nes,
                this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,
                this.x + this.width * Math.abs(this.bottom) - nes,
                this.y + this.height
            );
        }
        context.lineTo(this.x, this.y + this.height);
        // left
        if (this.left) {
            context.lineTo(this.x, this.y + this.height * Math.abs(this.left) + nes);
            context.bezierCurveTo(
                this.x + tabHeight * Math.sign(this.left) * 0.2,
                this.y + this.height * Math.abs(this.left) + nes,
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left) + tabWidth,
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left),
            );
            context.bezierCurveTo(
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left) - tabWidth,
                this.x + tabHeight * Math.sign(this.left) * 0.2,
                this.y + this.height * Math.abs(this.left) - nes,
                this.x,
                this.y + this.height * Math.abs(this.left) - nes,
            );
        }
        context.lineTo(this.x, this.y);
        context.save();
        context.clip();

        const scaledTabHeight = Math.min(VIDEO.videoWidth / SIZE.columns, VIDEO.videoHeight / SIZE.rows) * tabHeight / sz;
        const imagTabHeight = Math.min(IMAG.width / SIZE.columns, IMAG.height / SIZE.rows) * tabHeight / sz;
        CONTEXT.drawImage(
            VIDEO,
            this.colIndex * VIDEO.videoWidth / SIZE.columns - scaledTabHeight,
            this.rowIndex * VIDEO.videoHeight / SIZE.rows - scaledTabHeight,
            VIDEO.videoWidth / SIZE.columns + scaledTabHeight * 2,
            VIDEO.videoHeight / SIZE.rows + scaledTabHeight * 2,
            this.x - tabHeight,
            this.y - tabHeight,
            this.width + tabHeight * 2,
            this.height + tabHeight * 2
        );
        CONTEXT.drawImage(
            IMAG,
            this.colIndex * IMAG.width / SIZE.columns - imagTabHeight,
            this.rowIndex * IMAG.height / SIZE.rows - imagTabHeight,
            IMAG.width / SIZE.columns + imagTabHeight * 2,
            IMAG.height / SIZE.rows + imagTabHeight * 2,
            this.x - tabHeight,
            this.y - tabHeight,
            this.width + tabHeight * 2,
            this.height + tabHeight * 2
        );
        context.restore();
        context.stroke();

    }
    drawPaintLine(context) {

        context.moveTo(this.x, this.y);
        //top
        context.lineTo(this.x + this.width * Math.abs(this.top), this.y - tabHeight * Math.sign(this.top));
        context.lineTo(this.x + this.width, this.y);
        //right
        context.lineTo(this.x + this.width - tabHeight * Math.sign(this.right), this.y + this.height * Math.abs(this.right));
        context.lineTo(this.x + this.width, this.y + this.height);
        //bottom
        context.lineTo(this.x + this.width * Math.abs(this.bottom), this.y + this.height + tabHeight * Math.sign(this.bottom));
        context.lineTo(this.x, this.y + this.height);
        // left
        context.lineTo(this.x + tabHeight * Math.sign(this.left), this.y + this.height * Math.abs(this.left));
        context.lineTo(this.x, this.y);
    }
    drawPaintRadial(context) {

        context.moveTo(this.x, this.y);
        //top
        if (this.top) {
            context.lineTo(this.x + this.width * Math.abs(this.top) - nes, this.y);
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.top) - nes,
                this.y - tabHeight * Math.sign(this.top) * 0.2,
                this.x + this.width * Math.abs(this.top) - tabWidth,
                this.y - tabHeight * Math.sign(this.top),
                this.x + this.width * Math.abs(this.top),
                this.y - tabHeight * Math.sign(this.top)
            );
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.top) + tabWidth,
                this.y - tabHeight * Math.sign(this.top),
                this.x + this.width * Math.abs(this.top) + nes,
                this.y - tabHeight * Math.sign(this.top) * 0.2,
                this.x + this.width * Math.abs(this.top) + nes,
                this.y
            );
        }
        context.lineTo(this.x + this.width, this.y);
        //right
        if (this.right) {
            context.lineTo(this.x + this.width, this.y + this.height * Math.abs(this.right) - nes);
            context.bezierCurveTo(
                this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
                this.y + this.height * Math.abs(this.right) - nes,
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right) - tabWidth,
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right),
            );
            context.bezierCurveTo(
                this.x + this.width - tabHeight * Math.sign(this.right),
                this.y + this.height * Math.abs(this.right) + tabWidth,
                this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
                this.y + this.height * Math.abs(this.right) + nes,
                this.x + this.width,
                this.y + this.height * Math.abs(this.right) + nes,
            );
        }
        context.lineTo(this.x + this.width, this.y + this.height);
        //bottom
        if (this.bottom) {
            context.lineTo(this.x + this.width * Math.abs(this.bottom) + nes, this.y + this.height);
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.bottom) + nes,
                this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,
                this.x + this.width * Math.abs(this.bottom) + tabWidth,
                this.y + this.height + tabHeight * Math.sign(this.bottom),
                this.x + this.width * Math.abs(this.bottom),
                this.y + this.height + tabHeight * Math.sign(this.bottom)
            );
            context.bezierCurveTo(
                this.x + this.width * Math.abs(this.bottom) - tabWidth,
                this.y + this.height + tabHeight * Math.sign(this.bottom),
                this.x + this.width * Math.abs(this.bottom) - nes,
                this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,
                this.x + this.width * Math.abs(this.bottom) - nes,
                this.y + this.height
            );
        }
        context.lineTo(this.x, this.y + this.height);
        // left
        if (this.left) {
            context.lineTo(this.x, this.y + this.height * Math.abs(this.left) + nes);
            context.bezierCurveTo(
                this.x + tabHeight * Math.sign(this.left) * 0.2,
                this.y + this.height * Math.abs(this.left) + nes,
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left) + tabWidth,
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left),
            );
            context.bezierCurveTo(
                this.x + tabHeight * Math.sign(this.left),
                this.y + this.height * Math.abs(this.left) - tabWidth,
                this.x + tabHeight * Math.sign(this.left) * 0.2,
                this.y + this.height * Math.abs(this.left) - nes,
                this.x,
                this.y + this.height * Math.abs(this.left) - nes,
            );
        }
        context.lineTo(this.x, this.y);
    }
    isClose() {
        if (this.distance({ x: this.x, y: this.y }) < CORRECT_DISTANCE) return true;
        return false;
    }
    distance(currentCoord) {
        return Math.sqrt(Math.pow((currentCoord.x - this.correctCoord.x), 2) + Math.pow((currentCoord.y - this.correctCoord.y), 2));
    }
    snap() {
        this.x = this.correctCoord.x;
        this.y = this.correctCoord.y;
        this.correct = true;
        CORRECT_PIEZES.add(`${this.x}, ${this.y}`)
    }
}
