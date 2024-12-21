// 更新購物車icon上面的紅色圖示，初始狀態：隱藏
function updatedcartAlert() {
    // 從 localStorage 取得購物車資料
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    const cartAlert = document.querySelector('#cartAlert');
    let cartAlertNum = document.querySelector('#cartAlertNum');
    if (cartData.length > 0) {
        cartAlert.style.display = 'block';
        cartAlertNum.innerHTML = cartData.length;
    } else if (cartData.length <= 0) {
        cartAlert.style.display = 'none';
    }
}

function updateCartUI() {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    console.log('Cart Data:', cartData);

    const cartEmpty = document.querySelector('#cartEmpty');
    if(cartData.length > 0){
        cartEmpty.style.display = 'none';
    } else if (cartData.length <= 0) {
        cartEmpty.style.display = 'block';
    }

    const cartContainer = document.querySelector('#cartContainer');
    cartContainer.innerHTML = ''; // 清空容器


    cartData.forEach((element, index) => {
        const cartTemplate = document.querySelector('#cartTemplate');
        const cartClone = cartTemplate.content.cloneNode(true);

        cartClone.querySelector('#cartTitle').textContent = element.title;
        cartClone.querySelector('#cartImg').src = element.img;
        cartClone.querySelector('#cartPrice').textContent = element.price;
        cartClone.querySelector('#cartDate').textContent = element.date;
        cartClone.querySelector('#cartGroupSize').textContent = element.groupSize;

        cartClone.querySelector('#cartRemoveBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            removeCartItem(index);
        });

        cartContainer.appendChild(cartClone);
    });
}

function removeCartItem(index) {
    // 讀取現有購物車資料
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    
    // 移除指定商品
    cartData.splice(index, 1);

    // 更新 localStorage
    localStorage.setItem('cartData', JSON.stringify(cartData));

    // 更新購物車 UI
    updateCartUI();
    updatedcartAlert();
    updateTotal();
}

function updateTotal() {
    // 從 localStorage 獲取購物車資料
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    const cartTotal = document.querySelector('#cartTotal');
    if(cartData.length > 0){
        cartTotal.style.display = 'block';
    } else if (cartData.length <= 0) {
        cartTotal.style.display = 'none';
    }

    // 總計相關變數
    let subtotal = 0; // 小計
    const taxRate = 0.03; // 稅率
    let orderTotal = 0; // 總計

    // 計算小計
    cartData.forEach((item) => {
        // 確保 price 和 groupSize 是有效數字
        const price = parseFloat(item.price);
        subtotal += price;
    });

    // 計算稅金和總計
    const tax = subtotal * taxRate;
    orderTotal = subtotal + tax;

    // 更新 DOM
    const cartSubtotal = document.querySelector('#cartSubtotal');
    const cartTax = document.querySelector('#cartTax');
    const cartOrderTotal = document.querySelector('#cartOrderTotal'); 

    // 顯示金額，並格式化為兩位小數
    cartSubtotal.innerHTML = subtotal.toFixed(2);
    cartTax.innerHTML = tax.toFixed(2);
    cartOrderTotal.innerHTML = orderTotal.toFixed(2);
}



// 刷新頁面時，讀取到 localStorage 存放的資料
document.addEventListener('DOMContentLoaded', () => {

    // 初始化購物車數量圖示
    updatedcartAlert();
    updateCartUI();
    updateTotal()
});






