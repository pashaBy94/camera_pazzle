const items = document.querySelectorAll('.game_item');
const startMenu = document.querySelector('.start_menu');
const viborSlosnosty = document.querySelector('.check_sloshnost');
const checkItems = document.querySelectorAll('.check_item');
const musicInput = document.querySelector('#music');
const soundInput = document.querySelector('#sound');
const timeInput = document.querySelector('#time');
const menuTop = document.querySelector('.menu_top');
const settingTohome = document.querySelector('.setting_tohome');
const modal = document.querySelector('.modal_settings');
const settingModalGame = document.querySelector('.setting_modal-game');
const inputSetting = document.querySelectorAll('.input_setting');
const checkBack = document.querySelector('.check_back');
const back = document.querySelectorAll('.check_item-back');

addEventListenerInitial();

function addEventListenerInitial() {
    settingTohome.addEventListener('click', goToHome);
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', selectScenari);
    }
    for(let i = 0; i < checkItems.length; i++){
        checkItems[i].addEventListener('click', startGame);
    }
    for (let i = 0; i < inputSetting.length; i++) {
        inputSetting[i].addEventListener('change', installInitalValues);
    }
    for (let i = 0; i < back.length; i++) {
        back[i].addEventListener('click', selectSlochnostyOpen);
    }
}

function openSettings(ev) {
    modal.classList.add('open');
    modal.classList.remove('close')
}

function closeSettings() {
    modal.classList.add('close')
    modal.classList.remove('open')
}
function selectSlochnostyOpen(ev){
    let imagBackground = getComputedStyle(ev.target).backgroundImage;
    if(imagBackground !== 'none'){
        let regExp = /(?<=url\(\")/;
        let length = imagBackground.split(regExp)[1].length;
        let result = imagBackground.split(regExp)[1].split('').splice(0, length-2).join('');
        choisiImag(result);
    }
    checkBack.classList.remove('open');
    viborSlosnosty.classList.add('open');
}
function selectScenari(ev) {
    let classNames = ev.target.classList;
    for (let i = 0; i < classNames.length; i++) {
        if(classNames[i].split('_')[1] === 'pazzle'){
            initailValues.isPazzle = classNames[i].split('_')[0];
            if(initailValues.isPazzle == 'imag') initailValues.isVideo = false;
        }
    }
    startMenu.classList.add('close');
    checkBack.classList.add('open');
}
function choisiImag(str) {
    initailValues.imag.src = str;
}
function checkSloznosty(){
    checkBack.classList.add('open');
    viborSlosnosty.classList.remove('open');
}
function checkBackground(){
    startMenu.classList.remove('close');
    checkBack.classList.remove('open');
}
function startGame(){
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
function installInitalValues(){
    initailValues.isSound = soundInput.checked;
    initailValues.isMusic = musicInput.checked;
    initailValues.isTime = timeInput.checked;
}
function goToHome(){
    settingModalGame.classList.remove('open');
    promise = null;
    menuTop.classList.remove('open');
    startMenu.classList.remove('close');
    modal.classList.add('close');
    PIEZES.length = 0;
    CURRENT_PIEZED_INDEX = null;
    SELECTED_PIEZES = null;
    START_TIME = null;
    END_TIME = null;
    CORRECT_PIEZES = new Set(); 
    VIDEO = null;
}