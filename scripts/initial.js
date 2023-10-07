const items = document.querySelectorAll('.start_item');
const startMenu = document.querySelector('.start_menu');
const viborSlosnosty = document.querySelector('.select_difficult');
const checkItems = document.querySelectorAll('.select_item');
const musicInput = document.querySelector('#music');
const soundInput = document.querySelector('#sound');
const timeInput = document.querySelector('#time');
const menuTop = document.querySelector('.top_menu');
const settingTohome = document.querySelector('.subsettings_return-start');
const settingsMenu = document.querySelector('.settings_menu');
const settingModalGame = document.querySelector('.subsettings_game');
const inputSetting = document.querySelectorAll('.settings_input');
const checkBack = document.querySelector('.select_back');
const time = document.querySelector('.time');
const colors = document.querySelectorAll('.color');

let arrColors = [['blueviolet'], ['#822be6', '#c71d7d'], ['#fc78a3', "#d0f180", "#822be6"], ['#b3c9c4', '#9c6ffb'], ['#655b97', '#ed554b'], ['#fa69e9', '#7ae777', '#9c6ffb']];

addEventListenerInitial();
function addEventListenerInitial() {
    settingTohome.addEventListener('click', goToHome);
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', selectScenari);
    }
    for (let i = 0; i < checkItems.length; i++) {
        checkItems[i].addEventListener('click', startGame);
    }
    for (let i = 0; i < inputSetting.length; i++) {
        inputSetting[i].addEventListener('change', installInitalValues);
    }
    for (let i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', () => initailValues.backGround = i);
    }
}

function openSettings() {
    settingsMenu.classList.add('open');
    settingsMenu.classList.remove('close')
}

function closeSettings() {
    settingsMenu.classList.add('close')
    settingsMenu.classList.remove('open')
}
function selectSlochnostyOpen(ev) {
    // initailValues.imagUrl = ev.target.dataset.url;
    choisiImag(ev.target.dataset.url);
    checkBack.classList.remove('open');
    viborSlosnosty.classList.add('open');
}
function selectScenari(ev) {
    let classNames = ev.target.classList;
    for (let i = 0; i < classNames.length; i++) {
        if (classNames[i].split('_')[1] === 'pazzle') {
            initailValues.isPazzle = classNames[i].split('_')[0];
        }
    }
    if (initailValues.isPazzle == 'imag') {
        initailValues.isVideo = false;
        writeMenuSelectPazzle(arrPictures);
    } else {
        writeMenuSelectPazzle(arrPhoneImage);
    }
    startMenu.classList.add('close');
    checkBack.classList.add('open');
}
function choisiImag(str) {
    if (str != null)
        initailValues.imag.src = str;
}
function openMenuDifficult() {
    checkBack.classList.add('open');
    viborSlosnosty.classList.remove('open');
}
function openMenuBackgroundPazzle() {
    startMenu.classList.remove('close');
    checkBack.classList.remove('open');
}
let arrPhoneImage = [null,
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
function writeMenuSelectPazzle(arrImag) {
    let selectList = document.querySelector('.select_list');
    selectList.innerHTML = '';
    for (let i = 0; i < arrImag.length; i++) {
        let li = document.createElement('li');
        li.classList.add('select_item-back');
        if (arrImag[i] !== null) {
            li.style.backgroundImage = `url(${arrImag[i].small})`;
            li.setAttribute('data-url', arrImag[i].big)
        }
        selectList.append(li);
    }
    const back = document.querySelectorAll('.select_item-back');
    for (let i = 0; i < back.length; i++) {
        // back[i].addEventListener('click', (ev)=>{
        //     paintLoader(initailValues.imag, selectSlochnostyOpen, ev)
        // });
        back[i].addEventListener('click', selectSlochnostyOpen);
    }

}
function startGame() {
    settingModalGame.classList.add('open');
    viborSlosnosty.classList.remove('open');
    menuTop.classList.add('open');
    initailValues.isMusic = musicInput.checked;
    initailValues.isSound = soundInput.checked;
    initailValues.isTime = timeInput.checked;

    switch (true) {
        case this.classList.contains('easy'): {
            initailValues.difficult = 'easy';
            break;
        };
        case this.classList.contains('medium'): {
            initailValues.difficult = 'medium';
            break;
        }
        case this.classList.contains('hard'): {
            initailValues.difficult = 'hard';
            break;
        }
        case this.classList.contains('insane'): {
            initailValues.difficult = 'insane';
            break;
        }
    }
        // choisiImag(initailValues.imagUrl);

    main();
}
function installInitalValues() {
    initailValues.isSound = soundInput.checked;
    initailValues.isMusic = musicInput.checked;
    initailValues.isTime = timeInput.checked;
    playMusic(MUSIC);
    showTime();

}
function showTime() {
    if (!initailValues.isTime)
        time.classList.add('close');
    else
        time.classList.remove('close');
}
function goToHome() {
    if (document.querySelector('button'))
        document.querySelector('button').remove();
    settingModalGame.classList.remove('open');
    menuTop.classList.remove('open');
    startMenu.classList.remove('close');
    settingsMenu.classList.add('close');
    setDefaultSettings();
}
// function paintLoader(img, func, event){
//     choisiImag(event.target.dataset.url);
//     CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
//     paintBackgound(initailValues.backGround);
//     CONTEXT.clearRect(SIZE.x, SIZE.y, SIZE.width, SIZE.height);
//     CONTEXT.globalAlpha = 0.3;
//     // if (initailValues.isVideo && process.isGame)
//     //     CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
//     // CONTEXT.drawImage(initailValues.imag, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
//     CONTEXT.globalAlpha = 1;
//     for (let i = 0; i < PIEZES.length; i++) {
//         PIEZES[i].draw(CONTEXT);
//     }
//     CONTEXT.drawImage(UPDATE, 200, 200, 45, 45);
//     // if (process.isGame)
//     //     requestAnimationFrame(updateCanvas);
//     img.onload = ()=>{
//         // func(event);
//     }
// }