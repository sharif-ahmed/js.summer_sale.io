
const btnApply = document.querySelector("#btn-apply");
const btnPurchase = document.querySelector("#btn-purchase");
const coupon = document.querySelector("#coupon");

function productItemClick(event) {
    const prodName = event.querySelector(".card-title");
    const prodPrice = event.querySelector("#prod-price");

    const name = getTextFromElement(prodName);
    const price = getTextFromElement(prodPrice).split(" ")[0];

    addToPurchaseList(name, price);
};

btnApply.addEventListener("click", function (event) {
    let couponText = coupon.value;
    if (couponText.length <= 0) {
        alert("Invalid input");
        return;
    } else if (couponText === 'SELL200') {
        coupon.value = '';
        let totalPrice = parseFloat(getTextFromSelector("#total_price").split(" ")[0]);
        let totalDiscount = parseFloat(getTextFromSelector("#total_discount").split(" ")[0]);
        totalPrice = totalPrice.toFixed(2);

        totalDiscount = parseFloat((20 * totalPrice) / 100);
        totalDiscount = totalDiscount.toFixed(2);
        setText("#total_discount", totalDiscount + " TK");

        let totalPay = parseFloat(getTextFromSelector("#total_pay").split(" ")[0]);
        totalPay = totalPay - totalDiscount;
        totalPay = totalPay.toFixed(2);
        setText("#total_pay", totalPay + " TK");
    } else {
        alert("Invalid coupon code");
        return;
    }
});

function addToPurchaseList(productName, productPrice) {

    const purchaseItemsContainer = document.querySelector(".purchase-items");
    let count = purchaseItemsContainer.childElementCount;

    let totalPrice = parseFloat(getTextFromSelector("#total_price").split(" ")[0]);
    totalPrice = totalPrice + parseFloat(productPrice);
    totalPrice = totalPrice.toFixed(2);
    setText("#total_price", totalPrice + " TK");

    if (totalPrice >= 200) {
        btnApply.disabled = false;
    } else {
        btnApply.disabled = true;
    }

    if (totalPrice > 0) {
        btnPurchase.disabled = false;
    } else {
        btnPurchase.disabled = true;
    }

    setText("#total_discount", "0.00" + " TK");

    let totalPay = parseFloat(getTextFromSelector("#total_pay").split(" ")[0]);
    totalPay = totalPay + parseFloat(totalPrice);
    totalPay = totalPay.toFixed(2);
    setText("#total_pay", totalPrice + " TK");

    const li = document.createElement("li");
    li.innerHTML = `<p class="text-[20px] font-medium leading-[48px] text-[#111]">${count + 1}. ${productName}</p>`;
    purchaseItemsContainer.appendChild(li);
}

function goHome() {
    window.location.href = 'index.html';
}

function getTextFromElement(element) {
    const value = element.innerText;
    return value;
}

function getTextFromSelector(selector) {
    const element = document.querySelector(selector);
    const text = element.innerText;
    return text;
}

function getValueFromText(text) {
    const value = text.split(" ")[0];
    return value;
}

function setText(selector, text) {
    const element = document.querySelector(selector);
    element.innerText = text;
}