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
