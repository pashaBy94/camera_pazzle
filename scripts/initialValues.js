let CURRENT_PAGE_PAZZLE = 0;
let arrColors = [['blueviolet'], ['#822be6', '#c71d7d'], ['#fc78a3', "#d0f180", "#822be6"], ['#b3c9c4', '#9c6ffb'], ['#655b97', '#ed554b'], ['#fa69e9', '#7ae777', '#9c6ffb']];

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
let MUSIC = new Audio('../sound/music.mp3');
MUSIC.loop = true;
let UPDATE = new Image();
let arrPhoneImage = [
    { small: '/img/emptyImg.png', big: '/img/emptyImg.png' },
    { small: '/img/smallFone/batterflies-small.png', big: '/img/bigFone/batterflies-big.png' },
    { small: '/img/smallFone/cloud-small.png', big: '/img/bigFone/cloud-big.png' },
    { small: 'http://127.0.0.1:5500/img/smallFone/eralash-small.png', big: '/img/bigFone/eralash-big.png' },
    { small: '/img/smallFone/happe-small.png', big: '/img/bigFone/happe-big.png' },
    { small: '/img/smallFone/leaves-small.png', big: '/img/bigFone/leaves-big.png' },
    { small: '/img/smallFone/miki-small.png', big: '/img/bigFone/miki-big.png' },
    { small: '/img/smallFone/rabbit-small.png', big: '/img/bigFone/rabbit-big.png' },
    { small: '/img/smallFone/sailor-small.png', big: '/img/bigFone/sailor-big.png' },
    { small: '/img/smallFone/batterflies-small.png', big: '/img/bigFone/batterflies-big.png' },
    { small: '/img/smallFone/cloud-small.png', big: '/img/bigFone/cloud-big.png' },
    { small: '/img/smallFone/eralash-small.png', big: '/img/bigFone/eralash-big.png' },
    { small: '/img/smallFone/happe-small.png', big: '/img/bigFone/happe-big.png' },
    { small: '/img/smallFone/leaves-small.png', big: '/img/bigFone/leaves-big.png' },
    { small: '/img/smallFone/miki-small.png', big: '/img/bigFone/miki-big.png' },
    { small: '/img/smallFone/rabbit-small.png', big: '/img/bigFone/rabbit-big.png' },
    { small: '/img/smallFone/sailor-small.png', big: '/img/bigFone/sailor-big.png' },
    { small: '/img/smallFone/batterflies-small.png', big: '/img/bigFone/batterflies-big.png' },
    { small: '/img/smallFone/cloud-small.png', big: '/img/bigFone/cloud-big.png' },
    { small: '/img/smallFone/eralash-small.png', big: '/img/bigFone/eralash-big.png' },
    { small: '/img/smallFone/happe-small.png', big: '/img/bigFone/happe-big.png' },
    { small: '/img/smallFone/leaves-small.png', big: '/img/bigFone/leaves-big.png' },
    { small: '/img/smallFone/miki-small.png', big: '/img/bigFone/miki-big.png' },
    { small: '/img/smallFone/rabbit-small.png', big: '/img/bigFone/rabbit-big.png' },
    { small: '/img/smallFone/sailor-small.png', big: '/img/bigFone/sailor-big.png' },
    { small: '/img/smallFone/batterflies-small.png', big: '/img/bigFone/batterflies-big.png' },
    { small: '/img/smallFone/cloud-small.png', big: '/img/bigFone/cloud-big.png' },
    { small: '/img/smallFone/eralash-small.png', big: '/img/bigFone/eralash-big.png' },
    { small: '/img/smallFone/happe-small.png', big: '/img/bigFone/happe-big.png' },
    { small: '/img/smallFone/leaves-small.png', big: '/img/bigFone/leaves-big.png' },
    { small: '/img/smallFone/miki-small.png', big: '/img/bigFone/miki-big.png' },
    { small: '/img/smallFone/rabbit-small.png', big: '/img/bigFone/rabbit-big.png' },
    { small: '/img/smallFone/sailor-small.png', big: '/img/bigFone/sailor-big.png' },
];
let arrPictures = [
    { small: '/img/pictures/malchik-small.jpg', big: '/img/pictures/malchik-big.jpg' },
    { small: '/img/pictures/maugli-small.jpg', big: '/img/pictures/maugli-big.jpg' },
    { small: '/img/pictures/malchik-small.jpg', big: '/img/pictures/malchik-big.jpg' },
    { small: '/img/pictures/maugli-small.jpg', big: '/img/pictures/maugli-big.jpg' },
    { small: '/img/pictures/malchik-small.jpg', big: '/img/pictures/malchik-big.jpg' },
    { small: '/img/pictures/maugli-small.jpg', big: '/img/pictures/maugli-big.jpg' },
    { small: '/img/pictures/minony-small.jpg', big: '/img/pictures/minony-big.jpg' },
    { small: '/img/pictures/panda-small.jpg', big: '/img/pictures/panda-big.jpg' },
    { small: '/img/pictures/panteryi-small.jpg', big: '/img/pictures/panteryi-big.jpg' },
    { small: '/img/pictures/rusalochka-small.jpg', big: '/img/pictures/rusalochka-big.jpg' },
    { small: '/img/pictures/zveropolis-small.jpg', big: '/img/pictures/zveropolis-big.jpg' },
    { small: '/img/pictures/malchik-small.jpg', big: '/img/pictures/malchik-big.jpg' },
    { small: '/img/pictures/maugli-small.jpg', big: '/img/pictures/maugli-big.jpg' },
    { small: '/img/pictures/minony-small.jpg', big: '/img/pictures/minony-big.jpg' },
    { small: '/img/pictures/panda-small.jpg', big: '/img/pictures/panda-big.jpg' },
    { small: '/img/pictures/panteryi-small.jpg', big: '/img/pictures/panteryi-big.jpg' },
    { small: '/img/pictures/rusalochka-small.jpg', big: '/img/pictures/rusalochka-big.jpg' },
    { small: '/img/pictures/zveropolis-small.jpg', big: '/img/pictures/zveropolis-big.jpg' },
    { small: '/img/pictures/malchik-small.jpg', big: '/img/pictures/malchik-big.jpg' },
    { small: '/img/pictures/maugli-small.jpg', big: '/img/pictures/maugli-big.jpg' },
    { small: '/img/pictures/minony-small.jpg', big: '/img/pictures/minony-big.jpg' },
    { small: '/img/pictures/panda-small.jpg', big: '/img/pictures/panda-big.jpg' },
    { small: '/img/pictures/panteryi-small.jpg', big: '/img/pictures/panteryi-big.jpg' },
    { small: '/img/pictures/rusalochka-small.jpg', big: '/img/pictures/rusalochka-big.jpg' },
    { small: '/img/pictures/zveropolis-small.jpg', big: '/img/pictures/zveropolis-big.jpg' },
    { small: '/img/pictures/malchik-small.jpg', big: '/img/pictures/malchik-big.jpg' },
    { small: '/img/pictures/maugli-small.jpg', big: '/img/pictures/maugli-big.jpg' },
    { small: '/img/pictures/minony-small.jpg', big: '/img/pictures/minony-big.jpg' },
    { small: '/img/pictures/panda-small.jpg', big: '/img/pictures/panda-big.jpg' },
    { small: '/img/pictures/panteryi-small.jpg', big: '/img/pictures/panteryi-big.jpg' },
    { small: '/img/pictures/rusalochka-small.jpg', big: '/img/pictures/rusalochka-big.jpg' },
    { small: '/img/pictures/zveropolis-small.jpg', big: '/img/pictures/zveropolis-big.jpg' },
];