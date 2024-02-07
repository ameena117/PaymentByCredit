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
let count = 0;
let itemSelected = [];
let totalPrice = 0;
menu.innerHTML = items
  .map(
    ({
      item,
      price,
      img,
    }) => `
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
for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function (e) {
    itemSelected.push(i);
    console.log(items[i].item);
    console.log(items[i].price);
    count = itemSelected.filter(function (value) {
      return value === i;
    }).length;
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
    console.log(orderItems);

    order.innerHTML = orderItems
      .map(
        ({ item, price, count, total }) =>
          `<div class="orderItem">#${count} ${item}: $${price} = $${total}</div>`
      )
      .join("");
    totalPrice = orderItems.reduce((a, b) => a + b.total, 0);
    console.log(totalPrice);
    total.innerHTML = `<hr/>  Total Price = $${totalPrice}`;
  });
}
