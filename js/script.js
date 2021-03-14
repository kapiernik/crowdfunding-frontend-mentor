/* jshint -W117 */

const windowAppear = anime({
    targets: document.body,
    opacity: 1,
    easing: 'easeOutQuad',
    duration: 1500,
});

//ОБЪЯВЛЕНИЕ

const backButton = document.querySelector('.project__buttons .button'),
    selectionModal = document.querySelector('.selection-modal .selection-modal__inner'),
    selectionModalWindow = document.querySelector('.selection-modal'),
    selectionModalBlock = document.querySelectorAll('.selection-modal__block'),
    form = document.querySelector('form'),
    modalInputs = document.querySelectorAll('input[type="radio"]'),
    pledgeInputBlock = document.querySelectorAll('.selection-modal__block-pledge-input'),
    pledgeInputs = document.querySelectorAll('.selection-modal__block-pledge-input input'),
    pledgeButtons  = document.querySelectorAll('.selection-modal__block-pledge-input button'),
    successModal = document.querySelector('.success-modal'),
    successButton = document.querySelector('.success-modal__button'),
    selectButtons = document.querySelectorAll('.about__pricelist-block .button'),
    mobileMenuButton = document.querySelector('.nav__icon'),
    mobileMenu = document.querySelector('.header__nav_mobile-list'),
    mobileMenuWindow = document.querySelector('.header__nav_mobile'),
    bookmark = document.querySelector('.project__bookmark'),
    bookmarkImage = document.querySelector('.project__bookmark img');
    bookmarkText = document.querySelector('.project__bookmark p');

function showModal(modal){
    anime({
        targets: modal,
        opacity: '1',
        duration: 1000
    });
    modal.classList.add('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden';
}

function closeModal(modal){
    anime({
        targets: modal,
        opacity: '0',
        duration: 1000
    });
    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = 'auto';
}

function removeActive(){
    selectionModalBlock.forEach((block, index) => {
        block.classList.remove('selection-modal__block_active');
    });
}

function removePledgeInput(){
    pledgeInputBlock.forEach(item => {
        item.classList.remove('show');
    }
    );
    pledgeInputs.forEach(input => {
        input.value = '';
    });
}

function removeCheckedAttr(){
    modalInputs.forEach(input => {
        input.removeAttribute('checked');
    });
}

backButton.addEventListener('click', () => {
    showModal(selectionModalWindow);
});

selectionModalWindow.addEventListener('click', e => {
    if(e.target === selectionModalWindow || e.target.getAttribute('data-close') === ''){
        closeModal(selectionModalWindow);
        form.reset();
        removeActive();
        removePledgeInput();
        removeCheckedAttr();
    }
});

document.addEventListener('keydown', e => {
    if(e.code === 'Escape'){
        closeModal(selectionModalWindow);
        form.reset();
        removeActive();
        removePledgeInput();
        removeCheckedAttr();
    }
});

window.addEventListener('unload', () => {
    form.reset();
    removePledgeInput();
});

modalInputs.forEach((item, index) => {
    item.addEventListener('input', (e) => {
        let realParent = item.parentNode.parentNode.parentNode;

        removeActive();

        if(!realParent.classList.contains('selection-modal__block_disabled')){
            realParent.classList.add('selection-modal__block_active');
        }

        pledgeInputBlock.forEach((input, i) => {
            input.classList.remove('show');
            if(index === i){
            input.classList.add('show');
            }
        });
    });
});

pledgeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        removeActive();
        removePledgeInput();
        closeModal(selectionModalWindow);
        showModal(successModal);
        form.reset();
    });
});

successModal.addEventListener('click', e => {
    if(e.target === successModal || e.target.getAttribute('data-close') === ''){
        closeModal(successModal);
    }
});

successButton.addEventListener('click', () => {
    closeModal(successModal);
});

selectButtons.forEach((button, indx) => {
    button.addEventListener('click', () => {
        showModal(selectionModalWindow);
        selectionModalBlock[indx + 1].classList.add('selection-modal__block_active');
        modalInputs[indx + 1].setAttribute('checked', true);
        pledgeInputBlock[indx + 1].classList.remove('hide');
        pledgeInputBlock[indx + 1].classList.add('show');
    });
});

mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('nav__icon_active');
    mobileMenu.classList.toggle('list-show');
    mobileMenuWindow.classList.toggle('header__nav_mobile_gradient');
});

console.log(bookmarkImage.src);

bookmarkImage.addEventListener('click', () => {
    bookmark.classList.toggle('active');
    bookmark.classList.toggle('unactive');
    if(bookmarkImage.src.includes('images/icon-bookmark.svg')){
        bookmarkImage.removeAttribute('src');
        bookmarkImage.setAttribute('src', '../images/icon-bookmark-active.svg');
        bookmarkText.textContent = 'Bookmarked';
    } else{
        bookmarkImage.removeAttribute('src');
        bookmarkImage.setAttribute('src', '../images/icon-bookmark.svg');
        bookmarkText.textContent = 'Bookmark';
    }
});







