const items = [
  { item: "Burger", price: 6, img: "images/Burger.png" },
  { item: "Pizza", price: 15, img: "images/pizza.png" },
  { item: "Shawerma", price: 4, img: "images/shawerma.png" },
  { item: "KFC", price: 18, img: "images/kfc.png" },
  { item: "Tacos", price: 7, img: "images/tacos.png" },
];

const menu = document.querySelector(".menu");
let order = document.querySelector(".orederSummaryView .orderSummary");
let total = document.querySelector(".orederSummaryView .totalPrice");
let orderItems = [];
let itemSelected = [];
let totalPrice = 0;
let count = 0;
menu.innerHTML = items
  .map(
    ({ item, price, img }) => `
    <div class="mainItem">
    <div class="item">
    ${item} <img src="${img}">
    </div>
    <h3>$${price}</h3>
    </div>
    `
  )
  .join("");
let item = document.querySelectorAll(".mainItem");
let addBtn = [];
let subBtn = [];
const cart = document.querySelector(".cart");
function addToOrder() {
  order.innerHTML = orderItems
    .map(
      ({ item, price, count, total }) =>
        `<div class="orderItem">#<span class="count" >${count}</span> ${item}: $${price} = $<span class="total" >${total}</span> <button class="addBtn">+</button> <button class="subBtn">-</button></div>`
    )
    .join("");
  totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
  total.innerHTML = `<hr/>  Total Price = $${totalPrice}`;
  let totalCount = orderItems.reduce((a, b) => a + b.count, 0);
  cart.innerHTML = totalCount;
}
function updateOrder(i, orderSelectedCount, orderSelectedTotal) {
  console.log(i);
  orderSelectedCount[i].innerHTML = orderItems[i].count;
  orderSelectedTotal[i].innerHTML = orderItems[i].total;
  totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
  total.innerHTML = `<hr/>  Total Price = $${totalPrice}`;
  if (orderItems[i].count < 1) {
    orderItems.splice(i, 1);
    console.log(orderItems);
    order.innerHTML = orderItems
      .map(
        ({ item, price, count, total }) =>
          `<div class="orderItem">#<span class="count" >${count}</span> ${item}: $${price} = $<span class="total" >${total}</span> <button class="addBtn">+</button><button class="subBtn">-</button></div>`
      )
      .join("");
    totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
    itemSelected = orderItems.map((item) => i);
    console.log(itemSelected);
    totalPrice == 0
      ? (total.innerHTML = "")
      : (total.innerHTML = `<hr/>  Total Price = $${totalPrice}`);
  }
}

for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function (e) {
    itemSelected.push(i);
    count = itemSelected.filter(function (value) {
      return value === i;
    }).length;
    console.log(count);
    console.log(itemSelected);
    if (count <= 1) {
      orderItems.push({
        item: items[i].item,
        price: items[i].price,
        count: count,
        total: items[i].price * count,
      });
      console.log("new");
    } else if(count > 1) {
      const index = orderItems.findIndex((obj) => {
        console.log("exiting");
        return obj.item === items[i].item;
      });
      orderItems[index].count = count;
      orderItems[index].total = items[i].price * count;
    }
    addToOrder();
    addBtn = document.querySelectorAll(".orderItem .addBtn");
    subBtn = document.querySelectorAll(".orderItem .subBtn");

    for (let i = 0; i < addBtn.length; i++) {
      addBtn[i].onclick = function (e) {
        orderItems[i].count++;
        orderItems[i].total = orderItems[i].price * orderItems[i].count;
        let orderSelectedCount = document.querySelectorAll(".orderItem .count");
        let orderSelectedTotal = document.querySelectorAll(".orderItem .total");
        updateOrder(i, orderSelectedCount, orderSelectedTotal);
      };
    }
    for (let i = 0; i < subBtn.length; i++) {
      subBtn[i].onclick = function (e) {
        orderItems[i].count--;
        orderItems[i].total = orderItems[i].price * orderItems[i].count;
        let orderSelectedCount = document.querySelectorAll(".orderItem .count");
        let orderSelectedTotal = document.querySelectorAll(".orderItem .total");
        updateOrder(i, orderSelectedCount, orderSelectedTotal);
      };
    }
  });
}
