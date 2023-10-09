let images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload(
    '/img/emptyImg.png',
    '/img/smallFone/batterflies-small.png',
    '/img/smallFone/cloud-small.png',
    '/img/smallFone/eralash-small.png',
    '/img/smallFone/happe-small.png',
    '/img/smallFone/leaves-small.png',
    '/img/smallFone/miki-small.png',
    '/img/smallFone/rabbit-small.png',
    '/img/smallFone/sailor-small.png',
    '/img/pictures/malchik-small.jpg', 
    '/img/pictures/maugli-small.jpg', 
    '/img/pictures/minony-small.jpg', 
    '/img/pictures/panda-small.jpg', 
    '/img/pictures/panteryi-small.jpg', 
    '/img/pictures/rusalochka-small.jpg', 
    '/img/pictures/zveropolis-small.jpg',
    "img/rotate.svg"
)