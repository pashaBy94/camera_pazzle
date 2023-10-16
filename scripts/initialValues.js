let CURRENT_PAGE_PAZZLE = 0;
let arrColors = [['blueviolet'], ['#822be6', '#c71d7d'], ['#fc78a3', "#d0f180", "#822be6"], ['#b3c9c4', '#9c6ffb'], ['#655b97', '#ed554b'], ['#fa69e9', '#7ae777', '#9c6ffb']];

let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let initailValues = { isMusic: true, isVideo: true, isPazzle: 'video', isSound: true, isTime: true, imagUrl: null, imag: new Image(), difficult: null, backGround: 0 };
let SIZE = { x: 0, y: 0, width: 0, height: 0, rows: 2, columns: 3 };
let process = { isGame: false };
let SCALER = 0.72;
let PIEZES = [];
let VARIABLE_END = 20;
let CORRECT_DISTANCE = 0;
let CURRENT_PIEZED_INDEX = null;
let SELECTED_PIEZES = null;
let START_TIME = null;
let END_TIME = null;
let CORRECT_PIEZES = new Set();
let BELL_AUDIO = new Audio('./sound/bell.mp3');
let CLICK_AUDIO = new Audio('./sound/click.mp3');
let WINS_AUDIO = new Audio('./sound/wins.mp3');
let PAZZLE_AUDIO = new Audio('./sound/pazzle.mp3');
let MUSIC = new Audio('./sound/music.mp3');
MUSIC.loop = true;
let UPDATE = new Image();
let IMAG_DOWNLOAD = new Image();
let arrPhoneImage = [
    { small: './img/emptyImg.png', big: './img/emptyImg.png' },
    { small: './img/smallFone/tor-small.png', big: './img/bigFone/tor-big.png' },
    { small: './img/smallFone/hulk-small.png', big: './img/bigFone/hulk-big.png' },
    { small: './img/smallFone/pantera-small.png', big: './img/bigFone/pantera-big.png' },
    { small: './img/smallFone/spider-small.png', big: './img/bigFone/spider-big.png' },
    { small: './img/smallFone/logan-small.png', big: './img/bigFone/logan-big.png' },
    { small: './img/smallFone/anime1-small.png', big: './img/bigFone/anime1-big.png' },
    { small: './img/smallFone/anime2-small.png', big: './img/bigFone/anime2-big.png' },
    { small: './img/smallFone/anime3-small.png', big: './img/bigFone/anime3-big.png' },
    { small: './img/smallFone/anime4-small.png', big: './img/bigFone/anime4-big.png' },
    { small: './img/smallFone/smesh1-small.png', big: './img/bigFone/smesh1-big.png' },
    { small: './img/smallFone/smesh2-small.png', big: './img/bigFone/smesh2-big.png' },
    { small: './img/smallFone/smesh3-small.png', big: './img/bigFone/smesh3-big.png' },
    { small: './img/smallFone/smesh4-small.png', big: './img/bigFone/smesh4-big.png' },
    { small: './img/smallFone/peppa1-small.png', big: './img/bigFone/peppa1-big.png' },
    { small: './img/smallFone/peppa2-small.png', big: './img/bigFone/peppa2-big.png' },
    { small: './img/smallFone/peppa3-small.png', big: './img/bigFone/peppa3-big.png' },
    { small: './img/smallFone/masha2-small.png', big: './img/bigFone/masha2-big.png' },
    { small: './img/smallFone/masha1-small.png', big: './img/bigFone/masha1-big.png' },
    { small: './img/smallFone/masha3-small.png', big: './img/bigFone/masha3-big.png' },
    { small: './img/smallFone/elza1-small.png', big: './img/bigFone/elza1-big.png' },
    { small: './img/smallFone/elza2-small.png', big: './img/bigFone/elza2-big.png' },
    { small: './img/smallFone/elza3-small.png', big: './img/bigFone/elza3-big.png' },
    { small: './img/smallFone/year-small.png', big: './img/bigFone/year-big.png' },
    { small: './img/smallFone/happe-small.png', big: './img/bigFone/happe-big.png' },
    { small: './img/smallFone/leaves-small.png', big: './img/bigFone/leaves-big.png' },
    { small: './img/smallFone/miki-small.png', big: './img/bigFone/miki-big.png' },
    { small: './img/smallFone/miki1-small.png', big: './img/bigFone/miki1-big.png' },
    { small: './img/smallFone/rabbit-small.png', big: './img/bigFone/rabbit-big.png' },
    { small: './img/smallFone/sailor-small.png', big: './img/bigFone/sailor-big.png' },
];
let arrPictures = [
    { small: './img/pictures/img1-small.png', big: './img/pictures/img1-big.png' },
    { small: './img/pictures/img2-small.png', big: './img/pictures/img2-big.png' },
    { small: './img/pictures/img3-small.png', big: './img/pictures/img3-big.png' },
    { small: './img/pictures/img4-small.png', big: './img/pictures/img4-big.png' },
    { small: './img/pictures/img5-small.png', big: './img/pictures/img5-big.png' },
    { small: './img/pictures/img6-small.png', big: './img/pictures/img6-big.png' },
    { small: './img/pictures/img7-small.png', big: './img/pictures/img7-big.png' },
    { small: './img/pictures/img8-small.png', big: './img/pictures/img8-big.png' },
    { small: './img/pictures/img9-small.png', big: './img/pictures/img9-big.png' },
    { small: './img/pictures/img10-small.png', big: './img/pictures/img10-big.png' },
    { small: './img/pictures/img11-small.png', big: './img/pictures/img11-big.png' },
    { small: './img/pictures/img12-small.png', big: './img/pictures/img12-big.png' },
    { small: './img/pictures/img13-small.png', big: './img/pictures/img13-big.png' },
    { small: './img/pictures/img14-small.png', big: './img/pictures/img14-big.png' },
    { small: './img/pictures/img15-small.png', big: './img/pictures/img15-big.png' },
    { small: './img/pictures/img16-small.png', big: './img/pictures/img16-big.png' },
    { small: './img/pictures/img17-small.png', big: './img/pictures/img17-big.png' },
    { small: './img/pictures/img18-small.png', big: './img/pictures/img18-big.png' },
    { small: './img/pictures/img19-small.png', big: './img/pictures/img19-big.png' },
    { small: './img/pictures/img20-small.png', big: './img/pictures/img20-big.png' },
    { small: './img/pictures/img21-small.png', big: './img/pictures/img21-big.png' },
    { small: './img/pictures/img22-small.png', big: './img/pictures/img22-big.png' },
    { small: './img/pictures/img23-small.png', big: './img/pictures/img23-big.png' },
    { small: './img/pictures/img24-small.png', big: './img/pictures/img24-big.png' },
    { small: './img/pictures/malchik-small.jpg', big: './img/pictures/malchik-big.jpg' },
    { small: './img/pictures/maugli-small.jpg', big: './img/pictures/maugli-big.jpg' },
    { small: './img/pictures/minony-small.jpg', big: './img/pictures/minony-big.jpg' },
    { small: './img/pictures/panda-small.jpg', big: './img/pictures/panda-big.jpg' },
    { small: './img/pictures/panteryi-small.jpg', big: './img/pictures/panteryi-big.jpg' },
    { small: './img/pictures/rusalochka-small.jpg', big: './img/pictures/rusalochka-big.jpg' },
    { small: './img/pictures/zveropolis-small.jpg', big: './img/pictures/zveropolis-big.jpg' },
];