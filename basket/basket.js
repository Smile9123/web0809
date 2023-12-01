let itemNumber = 1;

function changeCount() {
    let basketListCount = $("#basketList li").length;
    $(".baksetCount").text(basketListCount);
}

function changeTotalPrice() {
    let basketList = $("#basketList li .itemTotalPrice");
    let priceList = $.map(basketList, function (v, i) {
        return Number(v.innerText.replaceAll(",", ""));
    });

    let sum = 0;
    for (let i in priceList) {
        sum += priceList[i];
    }
    $(".itemTotalPriceSum").text(Number(sum).toLocaleString());
}

function itemHTML(name, seller, price, count) {
    let returnHTML = `<li id="item${itemNumber}">
    <div class="itemNameWrap">
        <p class="itemName">${name}</p>
        <p>판매자: <span class="itemSeller">${seller}</span></p>
    </div>
    <div class="itemPriceWrap">
        <span class="itemPrice" value="${price}">${Number(
        price
    ).toLocaleString()}</span>원
    </div>
    <div class="itemCountWrap">
        <input
            type="number"
            name="itemCount"
            class="itemCount"
            min="1"
            value ="${count}"
            onchange="changeEachPrice(${itemNumber})"
        />
    </div>
    <div class="itemTotalPriceWrap">
        <span class="itemTotalPrice" value="${price * count}">${Number(
        price * count
    ).toLocaleString()}</span
        >원
    </div>
    <button onclick="removeItem(${itemNumber})">
        <i class="bi bi-x-lg"></i>
    </button>
</li>`;
    itemNumber++;
    return returnHTML;
}

function addItem() {
    let itemName = $("#itemNameInp").val();
    let itemSeller = $("#itemSellerInp").val();
    let itemPrice = $("#itemPriceInp").val();
    let itemCount = $("#itemCountInp").val();

    let newItemHTML = itemHTML(itemName, itemSeller, itemPrice, itemCount);
    $("#basketList").append(newItemHTML);
    changeCount();
    changeTotalPrice();
}

function couponHTML(name, sale) {
    let returnHTML = `<option sale="${sale}">${name} (${sale}%할인)</option>`;
    return returnHTML;
}

function addCoupon() {
    let couponName = $("#couponNameInp").val();
    let couponSale = $("#couponSaleInp").val();
    let newCouponHTML = couponHTML(couponName, couponSale);
    $("#coupon").append(newCouponHTML);
}

function changeEachPrice(itemId) {
    let eachPrice = $(`#item${itemId} .itemPrice`).attr("value");
    let itemCount = $(`#item${itemId} .itemCount`).val();
    let totalPrice = eachPrice * itemCount;

    $(`#item${itemId} .itemTotalPrice`).text(
        Number(totalPrice).toLocaleString()
    );
    $(`#item${itemId} .itemTotalPrice`).attr("value", totalPrice);

    changeTotalPrice();
}

function removeItem(itemId) {
    $(`#item${itemId}`).remove();
    changeCount();
    changeTotalPrice();
}

function couponChange() {
    let selectedCoupon = $("#coupon option:selected");
    let saleValue = Number(selectedCoupon.attr("sale"));

    let basketPrice = Number(
        $(".itemTotalPriceSumWrap .itemTotalPriceSum")
            .text()
            .replaceAll(",", "")
    );

    let salePrice = Math.round((basketPrice * saleValue) / 100);
    $(".couponSalePrice").text(Number(salePrice).toLocaleString());

    let finalPrice = basketPrice - salePrice;
    $(".afterCouponPrice").text(Number(finalPrice).toLocaleString());
}
