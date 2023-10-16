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
        context.beginPath();
        context.strokeStyle = "rgba(0,0,0,.2)";
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
        if (initailValues.isVideo) {
            const scaledTabHeight = Math.min(VIDEO.videoWidth / SIZE.columns, VIDEO.videoHeight / SIZE.rows) * tabHeight / sz;
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
        }
        const imagTabHeight = Math.min(initailValues.imag.width / SIZE.columns, initailValues.imag.height / SIZE.rows) * tabHeight / sz;
        CONTEXT.drawImage(
            initailValues.imag,
            this.colIndex * initailValues.imag.width / SIZE.columns - imagTabHeight,
            this.rowIndex * initailValues.imag.height / SIZE.rows - imagTabHeight,
            initailValues.imag.width / SIZE.columns + imagTabHeight * 2,
            initailValues.imag.height / SIZE.rows + imagTabHeight * 2,
            this.x - tabHeight,
            this.y - tabHeight,
            this.width + tabHeight * 2,
            this.height + tabHeight * 2
        );
        context.restore();
        context.stroke();

    }
    drawColor(context) {
        context.beginPath();
        context.strokeStyle = "rgba(0,0,0,1)";
        context.fillStyle = getColor();
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
        context.restore();
        context.fill();
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
        playSound(BELL_AUDIO);
        CORRECT_PIEZES.add(`${this.x}, ${this.y}`);
    }
}
function randomizePiezes() {
    startedTime();
    let y, x;
    for (let i = 0; i < PIEZES.length; i++) {
        if (!CORRECT_PIEZES.has(`${PIEZES[i].x}, ${PIEZES[i].y}`)) {
            x = Math.random() * (CANVAS.width - PIEZES[i].width);
            if (x > SIZE.x && x < (SIZE.x + SIZE.width / 2)) x = SIZE.x - PIEZES[i].width;
            if (x < (SIZE.x + SIZE.width) && x > (SIZE.x + SIZE.width / 2)) x = SIZE.x + SIZE.width;
            PIEZES[i].x = x;
            y = Math.random() * (CANVAS.height - PIEZES[i].height);
            PIEZES[i].y = (y < 70) ? 70 : y;
        }
    }
    playSound(PAZZLE_AUDIO);
    startedTime();
}
function addEventListener() {
    document.addEventListener('mousedown', () => playSound(CLICK_AUDIO));
    document.body.addEventListener('touchstart', () => playSound(CLICK_AUDIO));

    CANVAS.addEventListener('mousedown', onMouseDown);
    CANVAS.addEventListener('touchstart', onTouchStart);
    CANVAS.addEventListener('mouseup', onMouseUp);
    CANVAS.addEventListener('touchend', onTouchEnd);
}
function onMouseDown(ev) {
    if (ev.x > CANVAS.width * 0.9 && ev.x < CANVAS.width * 0.97 && ev.y > CANVAS.height - CANVAS.width * 0.14 && ev.y < (CANVAS.height - CANVAS.width * 0.14 + CANVAS.width * 0.07)) randomizePiezes() ////test -------------------------
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
    CANVAS.removeEventListener('mousedown', onMouseDown);
    CANVAS.removeEventListener('touchstart', onTouchStart);
    stopedTime();
    menuTop.classList.remove('open');
    endGame();
}

function endGame() {
    playSound(WINS_AUDIO);
    VARIABLE_END--;
    process.isGame = false;
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    paintBackgound(initailValues.backGround);
    CONTEXT.clearRect(SIZE.x--, SIZE.y--, SIZE.width += 2, SIZE.height += 2);
    if (initailValues.isVideo && VIDEO != null)
        CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    CONTEXT.drawImage(initailValues.imag, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
    if (VARIABLE_END > 0) {
        requestAnimationFrame(endGame);
    } else {
        addButtonToDownload();
        downloadImag();
        CANVAS.addEventListener('mousedown', endGameMessag);
        CANVAS.addEventListener('touchstart', endGameMessag);
    }
}

function setHrefToDownload(ref) {
    let a = document.querySelector('.buttonDownload');
    a.href = ref;
}
function addButtonToDownload() {
    let a = document.createElement('a');
    a.classList.add('buttonDownload');
    a.download = true;
    let span = document.createElement('span');
    span.innerHTML = 'Скачать';
    span.classList.add('buttonDownload_text');
    a.append(span);
    let img = document.createElement('img');
    img.alt = 'download';
    img.src = './img/downButton.svg';
    img.classList.add('buttonDownload_img');
    a.append(img);
    document.body.append(a);
}
function downloadImag() {
    convertCanvasToImag();
    function convertCanvasToImag() {
        let canvasShadow = document.createElement('canvas');
        let contextShadow = canvasShadow.getContext('2d');
        canvasShadow.width = SIZE.width + CANVAS.height - SIZE.height;
        canvasShadow.height = CANVAS.height;
        if (initailValues.isVideo && VIDEO != null)
        contextShadow.drawImage(VIDEO, 0, 0,  canvasShadow.width, canvasShadow.height);
        contextShadow.drawImage(initailValues.imag, 0, 0, canvasShadow.width, canvasShadow.height);
        let imags = new Image();
        imags.src = canvasShadow.toDataURL('image/png');
        imags.onload = function () {
            imags.crossOrigin = 'anonymous';
            setHrefToDownload(imags.src);
        }
    }
}

function endGameMessag() {
    CANVAS.removeEventListener('mousedown', endGameMessag);
    CANVAS.removeEventListener('touchstart', endGameMessag);
    paintBackgound(initailValues.backGround);

    let div = document.createElement('div');
    div.classList.add('messag_wins');
    let div2 = document.createElement('div');
    div2.classList.add('messag_wrap');
    div.append(div2);
    let h2 = document.createElement('h2');
    h2.classList.add('messag_title');
    h2.innerHTML = 'Ты молодец.';
    div2.append(h2);
    let div3 = document.createElement('div');
    div3.classList.add('messag_text-wrap');
    div2.append(div3);
    let p1 = document.createElement('p');
    p1.classList.add('messag_text');
    p1.innerHTML = `Твой результат составляет: ${time.innerHTML}.`;
    div3.append(p1);
    let p2 = document.createElement('p');
    p2.classList.add('messag_text');
    p2.innerHTML = `Сыграй еще один раз.`;
    div3.append(p2);
    document.body.append(div);
    div.addEventListener('mousedown', toStart);
    div.addEventListener('touchstart', toStart);
    CANVAS.addEventListener('mousedown', toStart);
    CANVAS.addEventListener('touchstart', toStart);
}

function toStart() {
    document.querySelector('.messag_wins').remove();
    document.querySelector('.buttonDownload').remove();
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