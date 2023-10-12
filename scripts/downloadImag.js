let images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    '/img/emptyImg.png',
    '/img/smallFone/tor-small.png',
    '/img/smallFone/pantera-small.png',
    '/img/smallFone/logan-small.png',
    '/img/smallFone/hulk-small.png',
    '/img/smallFone/spider-small.png',
    '/img/pictures/img1-small.png',
    '/img/pictures/img2-small.png',
    '/img/pictures/img3-small.png',
    '/img/pictures/img4-small.png',
    '/img/pictures/img5-small.png',
    '/img/pictures/img6-small.png',
)