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
const selectListPrev = document.querySelector('.select_list-prev');
const selectListNext = document.querySelector('.select_list-next');

let CURRENT_PAGE_PAZZLE = 0;
let arrColors = [['blueviolet'], ['#822be6', '#c71d7d'], ['#fc78a3', "#d0f180", "#822be6"], ['#b3c9c4', '#9c6ffb'], ['#655b97', '#ed554b'], ['#fa69e9', '#7ae777', '#9c6ffb']];

addEventListenerInitial();
function addEventListenerInitial() {
    settingTohome.addEventListener('click', goToHome);
    selectListNext.addEventListener('click', getNextPage);
    selectListPrev.addEventListener('click', getPrevPage);
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
    initailValues.imagUrl = ev.target.dataset.url;
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
    writeMenuSelectPazzle()
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
let arrPhoneImage = [
    { small: '/img/emptyImg.png', big: '/img/emptyImg.png' },
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
function getNextPage() {
    CURRENT_PAGE_PAZZLE++;
    writeMenuSelectPazzle(CURRENT_PAGE_PAZZLE);
}
function getPrevPage() {
    CURRENT_PAGE_PAZZLE = CURRENT_PAGE_PAZZLE > 0 ? --CURRENT_PAGE_PAZZLE : 0;
    writeMenuSelectPazzle(CURRENT_PAGE_PAZZLE);
}
function writeMenuSelectPazzle(numb = 0) {
    let arr;
    if (initailValues.isPazzle == 'imag') {
        initailValues.isVideo = false;
        arr = arrPictures;
    } else {
        arr = arrPhoneImage;
    }
    CURRENT_PAGE_PAZZLE = numb;
    if (CURRENT_PAGE_PAZZLE > Math.floor(arr.length/6)) {
        CURRENT_PAGE_PAZZLE--;
    }
    let selectList = document.querySelector('.select_list');
    selectList.innerHTML = '';
    for (let i = 6 * CURRENT_PAGE_PAZZLE; i < arr.length && i < (6 * CURRENT_PAGE_PAZZLE + 6); i++) {
        let li = document.createElement('li');
        li.classList.add('select_item-back');
        if (arr[i] !== null) {
            li.style.backgroundImage = `url(${arr[i].small})`;
            li.setAttribute('data-url', arr[i].big)
        }
        selectList.append(li);
    }
    const back = document.querySelectorAll('.select_item-back');
    for (let i = 0; i < back.length; i++) {
        back[i].addEventListener('click', selectSlochnostyOpen);
    }

}
function openMenuTop() {
    menuTop.classList.add('open');
}
function startGame() {
    settingModalGame.classList.add('open');
    viborSlosnosty.classList.remove('open');
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
    if (document.querySelector('.photo_button'))
        document.querySelector('.photo_button').remove();
    settingModalGame.classList.remove('open');
    menuTop.classList.remove('open');
    startMenu.classList.remove('close');
    settingsMenu.classList.add('close');
    setDefaultSettings();
}
