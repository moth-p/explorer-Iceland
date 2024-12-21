const navContainer = document.querySelector('#navContainer');
const navTemplate = document.querySelector('.navTemplate');
const cloneNav = navTemplate.content.cloneNode(true);

navContainer.appendChild(cloneNav);

// nav 點開漢堡標選單
const hamBtn = document.querySelector('#hamBtn');
const hamMenu = document.querySelector('#hamMenu');
const navBar = document.querySelector('#navBar');

hamMenu.style.display = 'none';


// 點擊視窗空白處，關掉ham menu, searchBox bgMask, cartShow
window.addEventListener('click', () => {
    // hamMenu.style.display = 'none';
    // searchBox.style.display = 'none';
    [hamMenu, searchBox, bgMask, cartShow].forEach(element => {
        element.style.display = 'none';
    })
});

// 防止ham menu事件冒泡（不要吃到 window.onclick 效果）
hamMenu.addEventListener('click', (e) => {
    e.stopPropagation();
})

hamBtn.addEventListener('click', function (e) {
    navBar.classList.remove('bg-white/50');
    navBar.classList.add('bg-lightGray');
    // 防止ham btn事件冒泡（不要吃到 window.onclick 效果）
    e.stopPropagation();

    function showHamMenu(result) {
        hamMenu.style.display = result ? 'block' : 'none';
    }

    if (hamMenu.style.display === 'none') {
        showHamMenu(true);
        showAccordion(false);
        plusIcon.innerHTML = plus;
    } else if (hamMenu.style.display === 'block') {
        showHamMenu(false);
    }
});

// ham-menu accordion 手風琴
const accordionBtn = document.querySelector('#accordionBtn');
const accordionContext = document.querySelector('#accordionContext');
const plusIcon = document.querySelector('#plusIcon');
const plus = `<i class="fa-solid fa-plus"></i>`;
const minus = `<i class="fa-solid fa-minus"></i>`;

function showAccordion(result) {
    accordionContext.style.display = result ? 'block' : 'none';
}

accordionBtn.addEventListener('click', function (e) {
    accordionContext.scrollTop = 0;
    e.stopPropagation();

    if (accordionContext.style.display === 'none' || accordionContext.style.display === '') {
        // 收起 -> 展開
        showAccordion(true);
        plusIcon.innerHTML = minus;
        accordionContext.scrollTop = 0;
    } else {
        // 展開 -> 收起
        showAccordion(false);
        plusIcon.innerHTML = plus;
    }
})

//nav flyout menu
const bookingBtn = document.querySelector('#booking');
const flyoutMenu = document.querySelector('#flyoutMenu');
flyoutMenu.style.display = 'none';

function showOrHide(result) {
    flyoutMenu.style.display = result ? 'block' : 'none';
}

[bookingBtn, flyoutMenu].forEach(element => {
    element.addEventListener('mouseover', function () { showOrHide(true) });
});

flyoutMenu.addEventListener('mouseout', function () { showOrHide(false) });

// search box 搜尋框 顯示／隱藏 
const searchIcon = document.querySelector('#searchIcon');
const searchBox = document.querySelector('#searchBox');
const bgMask = document.querySelector('#bgMask');

searchIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    searchBox.style.display = 'block';
    bgMask.style.display = 'block';
});

searchBox.addEventListener('click', (e) => {
    e.stopPropagation(); // 防止事件冒泡
})

//cart icon 點開購物車
const cartIcon = document.querySelector('#cartIcon');
const cartShow = document.querySelector('#cartShow');
const cartCloseBtn = document.querySelector('#cartCloseBtn');

cartIcon.addEventListener('click', function (e) {
    cartShow.style.display = 'block';
    e.stopPropagation();
})

// cart 裡面的叉叉 關閉購物車
cartCloseBtn.addEventListener('click', function () {
    cartShow.style.display = 'none';
})

cartShow.addEventListener('click', (e) => {
    e.stopPropagation
})

