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
        playSound(BELL_AUDIO);
        CORRECT_PIEZES.add(`${this.x}, ${this.y}`);
    }
}