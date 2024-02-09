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
let count =0;
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

for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function (e) {
    itemSelected.push(i);
    console.log(items[i].item);
    console.log(items[i].price);
    count = itemSelected.filter(function (value) {
      return value === i;
    }).length;
    console.log(count);
    if (count <= 1) {
      orderItems.push({
        item: items[i].item,
        price: items[i].price,
        count: count,
        total: items[i].price * count,
      });
    } else {
      const index = orderItems.findIndex((obj) => {
        return obj.item === items[i].item;
      });
      orderItems[index].count = count;
      orderItems[index].total = items[i].price * count;
    }
    order.innerHTML = orderItems
      .map(
        ({ item, price, count, total }) =>
          `<div class="orderItem">#<span class="count" >${count}</span> ${item}: $${price} = $<span class="total" >${total}</span> <button class="addBtn">+</button> <button class="subBtn">-</button></div>`
      )
      .join("");
    totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
    console.log(totalPrice);
    total.innerHTML = `<hr/>  Total Price = $${totalPrice}`;
    addBtn = document.querySelectorAll(".orderItem .addBtn");
    subBtn = document.querySelectorAll(".orderItem .subBtn");
    for (let i = 0; i < addBtn.length; i++) {
      addBtn[i].onclick = function (e) {
        orderItems[i].count++;
        orderItems[i].total = orderItems[i].price * orderItems[i].count;
        let orderSelectedCount = document.querySelectorAll(".orderItem .count");
        let orderSelectedTotal = document.querySelectorAll(".orderItem .total");
        orderSelectedCount[i].innerHTML = orderItems[i].count;
        orderSelectedTotal[i].innerHTML = orderItems[i].total;
        totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
        total.innerHTML = `<hr/>  Total Price = $${totalPrice}`;
      };
    }
    for (let i = 0; i < subBtn.length; i++) {
      subBtn[i].onclick = function (e) {
        console.log(0);

        orderItems[i].count--;
        orderItems[i].total = orderItems[i].price * orderItems[i].count;
        console.log(orderItems[i]);

        let orderSelectedCount = document.querySelectorAll(".orderItem .count");
        let orderSelectedTotal = document.querySelectorAll(".orderItem .total");
        console.log(orderItems);
        console.log(orderSelectedCount);
        console.log(orderSelectedTotal);
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
          
          console.log(totalPrice);
          totalPrice == 0
            ? (total.innerHTML = "")
            : (total.innerHTML = `<hr/>  Total Price = $${totalPrice}`);
        }
      };
    }
  });
}
