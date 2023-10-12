function getNextPage() {
    CURRENT_PAGE_PAZZLE++;
    writeMenuSelectPazzle(CURRENT_PAGE_PAZZLE);
}
function getPrevPage() {
    CURRENT_PAGE_PAZZLE = CURRENT_PAGE_PAZZLE > 0 ? --CURRENT_PAGE_PAZZLE : 0;
    writeMenuSelectPazzle(CURRENT_PAGE_PAZZLE);
}
function selectSlochnostyOpen(ev) {
    initailValues.imagUrl = ev.target.dataset.url;
    for(let i=0; i< checkItems.length; i++) checkItems[i].style.backgroundImage = `url('${initailValues.imagUrl}')`
    checkBack.classList.remove('open');
    viborSlosnosty.classList.add('open');
}
function openMenuDifficult() {
    checkBack.classList.add('open');
    viborSlosnosty.classList.remove('open');
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
    if (CURRENT_PAGE_PAZZLE >= Math.floor(arr.length / 6)) {
        CURRENT_PAGE_PAZZLE--;
    }
    let selectList = document.querySelector('.select_list');
    selectList.innerHTML = '';
    let wrap;
    for (let i = 6 * CURRENT_PAGE_PAZZLE; i < arr.length && i < (6 * CURRENT_PAGE_PAZZLE + 6); i++) {
        let div = document.createElement('div');
        div.classList.add('select_item-back');
        if (i % 3 === 0) {
            wrap = document.createElement('div');
            selectList.append(wrap);
        }
        if (arr[i] !== null) {
            div.style.backgroundImage = `url(${arr[i].small})`;
            div.setAttribute('data-url', arr[i].big)
        }
        wrap.append(div);
    }
    const back = document.querySelectorAll('.select_item-back');
    for (let i = 0; i < back.length; i++) {
        back[i].addEventListener('click', selectSlochnostyOpen);
    }

}