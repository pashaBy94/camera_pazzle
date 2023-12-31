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


function initialGame() {
    showMessagRotate();
    addEventListenerInitial();
}

initialGame();

function showMessagRotate() {
    let portrait = window.matchMedia("(orientation: portrait)").matches;
    if (portrait) {
        document.querySelector('.messag_rotate').classList.add('open');
        document.querySelector('.contains').classList.add('close');
    }
    else {
        document.querySelector('.messag_rotate').classList.remove('open');
        document.querySelector('.contains').classList.remove('close');
    }
}

function addEventListenerInitial() {
    window.addEventListener('load', ()=>{
        preload(
            './img/downButton.svg',
            './img/smallFone/anime1-small.png',
            './img/smallFone/anime2-small.png',
            './img/smallFone/anime3-small.png',
            './img/smallFone/anime4-small.png',
            './img/smallFone/smesh1-small.png',
            './img/smallFone/smesh2-small.png',
            './img/smallFone/smesh3-small.png',
            './img/smallFone/smesh4-small.png',
            './img/smallFone/peppa1-small.png',
            './img/smallFone/peppa2-small.png',
            './img/smallFone/peppa3-small.png',
            './img/smallFone/masha1-small.png',
            './img/smallFone/masha2-small.png',
            './img/smallFone/masha3-small.png',
            './img/smallFone/elza1-small.png',
            './img/smallFone/elza2-small.png',
            './img/smallFone/elza3-small.png',
            './img/smallFone/year-small.png',
            './img/smallFone/miki1-small.png',
            './img/smallFone/happe-small.png',
            './img/smallFone/leaves-small.png',
            './img/smallFone/miki-small.png',
            './img/smallFone/rabbit-small.png',
            './img/smallFone/sailor-small.png',
            './img/pictures/malchik-small.jpg', 
            './img/pictures/maugli-small.jpg', 
            './img/pictures/minony-small.jpg', 
            './img/pictures/panda-small.jpg', 
            './img/pictures/panteryi-small.jpg', 
            './img/pictures/rusalochka-small.jpg', 
            './img/pictures/zveropolis-small.jpg',
            './img/pictures/img7-small.png',
            './img/pictures/img8-small.png',
            './img/pictures/img9-small.png',
            './img/pictures/img10-small.png',
            './img/pictures/img11-small.png',
            './img/pictures/img12-small.png',
            './img/pictures/img13-small.png',
            './img/pictures/img14-small.png',
            './img/pictures/img15-small.png',
            './img/pictures/img16-small.png',
            './img/pictures/img17-small.png',
            './img/pictures/img18-small.png',
            './img/pictures/img19-small.png',
            './img/pictures/img20-small.png',
            './img/pictures/img21-small.png',
            './img/pictures/img22-small.png',
            './img/pictures/img23-small.png',
            './img/pictures/img24-small.png',
        )
    })
    window.addEventListener('resize', showMessagRotate, false);
    settingTohome.addEventListener('click', goToHome);
    selectListNext.addEventListener('click', getNextPage);
    selectListPrev.addEventListener('click', getPrevPage);
    document.body.addEventListener('click',()=>{
        playSound(CLICK_AUDIO);
    });
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', selectScenari);
    }
    for (let i = 0; i < checkItems.length; i++) {
        checkItems[i].addEventListener('click', startGame);
    }
    for (let i = 0; i < inputSetting.length; i++) {
        inputSetting[i].addEventListener('change', installSettingsValues);
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

function selectScenari(ev) {
    let classNames = ev.target.classList;
    for (let i = 0; i < classNames.length; i++) {
        if (classNames[i].split('_')[1] === 'pazzle') {
            initailValues.isPazzle = classNames[i].split('_')[0];
        }
    }
    writeMenuSelectPazzle();
    startMenu.classList.add('close');
    checkBack.classList.add('open');
}

function openMenuBackgroundPazzle() {
    startMenu.classList.remove('close');
    checkBack.classList.remove('open');
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
function installSettingsValues() {
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
