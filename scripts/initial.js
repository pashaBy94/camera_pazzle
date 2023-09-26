function openSettings(ev){
    const modal = document.querySelector('.modal_settings');
    console.log(modal);
    modal.classList.add('open');
    modal.classList.remove('close')

}
function closeSettings(){
    const modal = document.querySelector('.modal_settings');
    console.log(modal);
    modal.classList.add('close')
    modal.classList.remove('open')

}