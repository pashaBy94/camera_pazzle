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

addEventListenerInitial();
function addEventListenerInitial() {
    settingTohome.addEventListener('click', goToHome);
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', openBarSloshnost);
    }
    for(let i = 0; i < checkItems.length; i++){
        checkItems[i].addEventListener('click', startGame);
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
function openBarSloshnost(ev) {
    startMenu.classList.add('close');
    viborSlosnosty.classList.add('open');
}
function checkSloznosty(){
    startMenu.classList.remove('close');
    viborSlosnosty.classList.remove('open');
}
function startGame(){
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
function goToHome(){
    menuTop.classList.remove('open');
    startMenu.classList.remove('close');
    modal.classList.add('close');
    // removeCanvas();
}