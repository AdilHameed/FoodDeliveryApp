"use strict";

const user1 = JSON.parse(localStorage.getItem("userCred"));
if (!user1) window.location = "./login.html";

// logout functionality
document
  .querySelector(".logOut")
  .addEventListener("click", () => localStorage.removeItem("userCred"));

//header info update
let getcartItems4 = JSON.parse(localStorage.getItem("cartItems" + user1.id));
if (getcartItems4 && getcartItems4.length > 0)
  document.querySelector(".count").textContent = getcartItems4.length; //rendering in header

document.querySelector(".pro").textContent = user1.name.slice(0, 6) + " ..."; //name rendering in header

//getting user data from localStorage
const user = JSON.parse(localStorage.getItem("userCred"));

//Getting cart items from local storage that was stored from addToCart function in menu.js
let getcartItems1 = JSON.parse(localStorage.getItem("cartItems" + user.id));

//Number of cart item handler
const countCartItem = (countCartData) => {
  let plural = "";
  if (countCartData > 1) plural = "S";
  document.querySelector(
    ".item"
  ).textContent = `${countCartData} ITEM${plural}`; //rendering number of items in cart
};

// Cart element would be dynamic so cart UI||Element rendered according to number of items in cart
if (!getcartItems1 || getcartItems1.length < 1) {
  // if cart is empty then render this

  countCartItem(0); //calling this function for rendering item counts it is defined below

  const cartEl = `<div class='row'><div class='col-sm-6'>
                  <h4>Hi ${
                    user.name.split(" ")[0]
                  }!</h4><h3 class="text-center"> Your cart is empty</h3>
                  <p class="text-center">You can go to home page to view more restaurants</p></div></div>`;
  document.querySelector(".item").insertAdjacentHTML("afterend", cartEl);

  localStorage.removeItem("cartItems" + user.id);
} else {
  //else render this

  for (let j = 1; j <= getcartItems1.length; j++) {
    const cartEl = `<div class="row">
                    <div class="col-sm-3">&#9635<b class="fw-bold name${j}"></b></div>
                    <div class="col-sm-2">
                      <div
                        class="btn-group me-2 btn-group-sm"
                        role="group"
                        aria-label="First group"
                      >
                        <button onclick="itemIncreDecre(-1,getcartItems1[${
                          j - 1
                        }])" class="btn btn-secondary">-</button>
                        <button class="btn btn-outline quan${j}"></button>
                        <button onclick="itemIncreDecre(1,getcartItems1[${
                          j - 1
                        }])" class="btn btn-success">+</button>
                      </div>
                    </div>
                    <div class="col-sm-1">
                      <p> <bold style="color: rgba(177, 21, 133, 0.796)">&#8377</bold><bold class='price${j}'></bold></p>
                    </div>
                    </div>`;

    document.querySelector(".item").insertAdjacentHTML("afterend", cartEl); // insering in cart.html
  }
}

//passing each cart data  in the element that created above
const cartDataRendering = (getCartData) => {
  let total = 0;
  let i = 1;

  countCartItem(getCartData.length);

  getCartData.forEach((item) => {
    //rendering cart data

    document.querySelector(".name" + i).textContent = item.name;
    document.querySelector(".quan" + i).textContent = item.quantity;
    document.querySelector(".price" + i).textContent = item.price;
    i++;
    total = total + item.price;
  });
  document.querySelector(".subtotal").textContent = total;
};

cartDataRendering(getcartItems1);

//cart item incrementing decremneting functionality
//features- 1: if '+' button is clicked item quantity will increase and hence item price and total cost will be calculated
//          2: same will happen if '-' button is clicked
//          3: if quantity of item is 1 and '-' button is  clicked then that item will be removed from cart and same from local storage

const itemIncreDecre = (num, item) => {
  const getcartItems2 = JSON.parse(localStorage.getItem("cartItems" + user.id));

  let upDatedItem = getcartItems2.filter((itm) => itm.id !== item.id);
  console.log("upDatedItem", upDatedItem, "item bef", item);

  item.quantity = item.quantity + num;

  item.price = item.price + num * item.itemPrice;
  console.log("itafter", item);

  if (item.quantity < 1) {
    localStorage.setItem("cartItems" + user.id, JSON.stringify(upDatedItem));
    document.location.reload(true);
  } else {
    upDatedItem = [...upDatedItem, item];

    upDatedItem.sort((a, b) => a.id - b.id); //sorting items

    localStorage.setItem("cartItems" + user.id, JSON.stringify(upDatedItem)); //updating localStorage
  }

  const getcartItems3 = JSON.parse(localStorage.getItem("cartItems" + user.id));
  cartDataRendering(getcartItems3); //updating cart data in ui
};
