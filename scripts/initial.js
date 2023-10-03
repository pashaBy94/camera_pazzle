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
const back = document.querySelectorAll('.select_item-back');
const time = document.querySelector('.time');

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
    for (let i = 0; i < back.length; i++) {
        back[i].addEventListener('click', selectSlochnostyOpen);
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
    let imagBackground = getComputedStyle(ev.target).backgroundImage;
    if (imagBackground !== 'none') {
        let regExp = /(?<=url\(\")/;
        let length = imagBackground.split(regExp)[1].length;
        let result = imagBackground.split(regExp)[1].split('').splice(0, length - 2).join('');
        choisiImag(result);
    }
    checkBack.classList.remove('open');
    viborSlosnosty.classList.add('open');
}
function selectScenari(ev) {
    let classNames = ev.target.classList;
    for (let i = 0; i < classNames.length; i++) {
        if (classNames[i].split('_')[1] === 'pazzle') {
            initailValues.isPazzle = classNames[i].split('_')[0];
            if (initailValues.isPazzle == 'imag') initailValues.isVideo = false;
        }
    }
    startMenu.classList.add('close');
    checkBack.classList.add('open');
}
function choisiImag(str) {
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
    main();
}
function installInitalValues() {
    initailValues.isSound = soundInput.checked;
    initailValues.isMusic = musicInput.checked;
    initailValues.isTime = timeInput.checked;
    // stopMusic(MUSIC);
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
    if(document.querySelector('button'))
    document.querySelector('button').remove();
    settingModalGame.classList.remove('open');
    menuTop.classList.remove('open');
    startMenu.classList.remove('close');
    settingsMenu.classList.add('close');
    setDefaultSettings();
}