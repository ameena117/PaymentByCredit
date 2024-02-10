const items = [
  { item: "Burger", price: 6, img: "images/Burger.png", count: 0, total: 0 },
  { item: "Pizza", price: 15, img: "images/pizza.png", count: 0, total: 0 },
  {
    item: "Shawerma",
    price: 4,
    img: "images/shawerma.png",
    count: 0,
    total: 0,
  },
  { item: "KFC", price: 18, img: "images/kfc.png", count: 0, total: 0 },
  { item: "Tacos", price: 7, img: "images/tacos.png", count: 0, total: 0 },
];

const menu = document.querySelector(".menu");
let order = document.querySelector(".orederSummaryView .orderSummary");
let total = document.querySelector(".orederSummaryView .totalPrice");
let totalPrice = 0;
menu.innerHTML = items
  .map(
    ({ item, price, img }) =>
      `<div class="mainItem"><div class="item">${item} <img src="${img}"></div><h3>$${price}</h3></div>`
  )
  .join("");
let item = document.querySelectorAll(".mainItem");
let addBtn = [];
let subBtn = [];
const cart = document.querySelector(".cart");
let orderItems = [];

function updateOrder(i, j) {
  let selctedCount = document.querySelectorAll(".count")[i];
  let selctedTotal = document.querySelectorAll(".total")[i];
  let orderItem = document.querySelectorAll(".orderItem")[i];
  console.log(orderItem);
  if(orderItems[i].count > 0) {
    selctedCount.innerHTML = orderItems[i].count;
    selctedTotal.innerHTML = orderItems[i].total;
  } 
  else {
    orderItems.splice(i, 1);
    console.log(orderItems);
    orderItem.remove();
  }
  totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
  total.innerHTML = `<hr/>  Total Price = $${totalPrice}`;
  let totalCount = orderItems.reduce((a, b) => a + b.count, 0);
  cart.innerHTML = totalCount;
}
function insertOrder() {
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
for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function (e) {
    items[i].count++;
    items[i].total = items[i].price * items[i].count;
    if (items[i].count <= 1) {
      orderItems.push(items[i]);
      console.log(orderItems);
    } else {
      const j = orderItems.indexOf(items[i]);
      orderItems[j]["count"] = items[i]["count"];
      orderItems[j].total = items[i].total;
      console.log(orderItems);
    }
    insertOrder();
    addBtn = document.querySelectorAll(".orderItem .addBtn");
    subBtn = document.querySelectorAll(".orderItem .subBtn");
    for (let i = 0; i < addBtn.length; i++) {
      addBtn[i].onclick = function (e) {
        const j = items.indexOf(
          items.find(({ item }) => item === orderItems[i].item)
        );
        console.log(j);
        items[j].count++;
        items[j].total = items[j].price * items[j].count;
        console.log(items);
        console.log(orderItems);
        updateOrder(i, j);
      };
    }
    for (let i = 0; i < subBtn.length; i++) {
      subBtn[i].onclick = function (e) {
        const j = items.indexOf(
          items.find(({ item }) => item === orderItems[i].item)
        );
        console.log(j);
        items[j].count--;
        items[j].total = items[j].price * items[j].count;
        console.log(items);
        console.log(orderItems);
        updateOrder(i, j);
      };
    }
  });
}