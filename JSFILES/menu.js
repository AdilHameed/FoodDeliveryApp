"use strict";

const user1 = JSON.parse(localStorage.getItem("userCred"));
if (!user1) window.location = "./login.html";

// logout functionality
document
  .querySelector(".logOut")
  .addEventListener("click", () => localStorage.removeItem("userCred"));

const headerCartCountUpdate = (cartCount) => {
  if (cartCount && cartCount.length > 0)
    document.querySelector(".count").textContent = cartCount.length;
  //rendering in header
  else document.querySelector(".count").textContent = "";
};

let getcartItems1 = JSON.parse(localStorage.getItem("cartItems" + user1.id));
//header info update
headerCartCountUpdate(getcartItems1);
document.querySelector(".pro").textContent = user1.name.slice(0, 6) + " ..."; //name rendering in header

//getting restaurant and menu data from localStorage and passing into menu.html
const resto = JSON.parse(localStorage.getItem("restDetail"));
//restaurant details start
document.querySelector(".menuimg-res1").src = resto.img;
document.querySelector(".resName").textContent = resto.name;
document.querySelector(".foodType").textContent = resto.foodType;
document.querySelector(".resAddr").textContent = resto.address;
document.querySelector(".resRate").after(resto.rating);
document.querySelector(".resReview").textContent = resto.totalReviews;
document.querySelector(".delTime").textContent = resto.deliveryTime;
document.querySelector(".resPrice").textContent = resto.cost;
let i = 1;
resto.offer.forEach((ofr) => {
  document.querySelector(".resOffer" + i).after(ofr);
  i++;
});
//restaurant details end

//current restaurant menu details and arrow slider start
//As you have suggested in earlier assessment that  make  only 2 cards  HTML and data should change
//I tried to apply logic for it.

let j = 0;
let slideIndex = 1;
showSlides(slideIndex);

const incrementSlides = (n) => showSlides((slideIndex = slideIndex + n)); //function call in menu.html onclick arrow

function showSlides(s) {
  document.querySelector(".recipe1_diet").textContent = "";
  document.querySelector(".recipe2_diet").textContent = "";

  if (s > 2) {
    slideIndex = 1;
    s = 1;
    j = 0;
  }

  // this is for to track  the dish whether it is added to cart or not: "Add" ---> "Added"
  //for this I have used 4 buttons for dish of each restaurant
  if (resto.id % 2 === 1) {
    if (slideIndex % 2 === 1) {
      document.querySelector(".resto1change1").style.display = "block";
      document.querySelector(".resto1change2").style.display = "block";

      document.querySelector(".resto1change3").style.display = "none";
      document.querySelector(".resto1change4").style.display = "none";

      document.querySelector(".resto2change1").style.display = "none";
      document.querySelector(".resto2change2").style.display = "none";
      document.querySelector(".resto2change3").style.display = "none";
      document.querySelector(".resto2change4").style.display = "none";
    } else {
      document.querySelector(".resto1change3").style.display = "block";
      document.querySelector(".resto1change4").style.display = "block";

      document.querySelector(".resto1change1").style.display = "none";
      document.querySelector(".resto1change2").style.display = "none";

      document.querySelector(".resto2change1").style.display = "none";
      document.querySelector(".resto2change2").style.display = "none";
      document.querySelector(".resto2change3").style.display = "none";
      document.querySelector(".resto2change4").style.display = "none";
    }
  } else {
    if (slideIndex % 2 === 1) {
      document.querySelector(".resto2change1").style.display = "block";
      document.querySelector(".resto2change2").style.display = "block";

      document.querySelector(".resto2change3").style.display = "none";
      document.querySelector(".resto2change4").style.display = "none";

      document.querySelector(".resto1change1").style.display = "none";
      document.querySelector(".resto1change2").style.display = "none";
      document.querySelector(".resto1change3").style.display = "none";
      document.querySelector(".resto1change4").style.display = "none";
    } else {
      document.querySelector(".resto2change3").style.display = "block";
      document.querySelector(".resto2change4").style.display = "block";

      document.querySelector(".resto2change1").style.display = "none";
      document.querySelector(".resto2change2").style.display = "none";

      document.querySelector(".resto1change3").style.display = "none";
      document.querySelector(".resto1change4").style.display = "none";
      document.querySelector(".resto1change1").style.display = "none";
      document.querySelector(".resto1change2").style.display = "none";
    }
  }
  //  End of  dish tracking

  // start of passsing menu data in each dishes
  for (let k = 1; k <= 2; k++) {
    document.querySelector(".recipe" + k + "_img").src =
      resto.menu[s + j + k - 2].image; //Assigning image path in src of each recipe

    document.querySelector(".recipe" + k + "_name").textContent =
      resto.menu[s + j + k - 2].name; //Assigning name value in textContent of each recipe

    document.querySelector(".recipe" + k + "_badge1").textContent =
      resto.menu[s + j + k - 2].badge1; //Assigning badge1 value in textContent of each recipe

    document.querySelector(".recipe" + k + "_badge2").textContent =
      resto.menu[s + j + k - 2].badge2;

    document.querySelector(".recipe" + k + "_calo").textContent =
      resto.menu[s + j + k - 2].calories;

    document.querySelector(".recipe" + k + "_nutri").textContent =
      resto.menu[s + j + k - 2].nutrition;

    document.querySelector(".recipe" + k + "_rate").textContent =
      resto.menu[s + j + k - 2].rating;

    document.querySelector(".recipe" + k + "_totalReview").textContent =
      resto.menu[s + j + k - 2].totalReviews;

    document.querySelector(".recipe" + k + "_price").textContent =
      resto.menu[s + j + k - 2].price;

    //this mapping is for  diet of each recipe  as diet is of array form of each recipe.

    let nodes1 = resto.menu[s + j + k - 2].diet.map((list) => {
      let para1 = document.createElement("div");
      let para2 = document.createElement("i");
      let node = document.createTextNode(list);
      para2.classList.add("fa");
      para2.classList.add("fa-check");
      para2.setAttribute("aria-hidden", "true");
      para1.appendChild(para2);
      para1.appendChild(node);

      return para1;
    });

    document.querySelector(".recipe" + k + "_diet").append(...nodes1); //Appending html elements and diet values i.e, nodes
    //in diet list using spread operator
  }
  // end of passsing menu data in each dishes

  j++;
}

//current restaurant menu details end

//Add dish to cart functionality start
//Features:
//1-by clicking 'Add' buttons of any dish of current restaurant dish details will be added to localstorage and it will show 'Added'
//2- if particular dish is already added in localstorage it wont be added to localstorage
//3- if any dish is already added in localstorage from another restuarant and if we try to add dish from cuurent restaurant then it will
//   popup for confirmation to empty the cart||localstorage
const user = JSON.parse(localStorage.getItem("userCred"));
let Items = [];

const addDishToCart = (menu) => {
  //function call in Add button of dishes;

  const cartItem = {
    id: menu.id,
    userId: user.id,
    restaurantId: resto.id,
    name: menu.name,
    itemPrice: menu.price,
    price: menu.price,
    quantity: 1,
  };
  console.log("curr", cartItem);

  let getcartItems1 = JSON.parse(localStorage.getItem("cartItems" + user.id)); //using user.id in cartname for storing in local storage
  //so that user's cart information coudnt loss if any
  //other user logged in
  console.log("1", getcartItems1);

  if (getcartItems1 && getcartItems1[0].restaurantId != cartItem.restaurantId) {
    // if dish already added from another restaurant
    const confirmation = confirm(
      "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?"
    );

    if (confirmation == true) {
      //if true remove cartItems from local storage

      localStorage.removeItem("cartItems" + user.id);
      Items = [];
    } else return;
  }

  let getcartItems = JSON.parse(localStorage.getItem("cartItems" + user.id));
  console.log("2", getcartItems);

  if (!getcartItems) {
    const id = Items.find((itm) => itm.id === cartItem.id);

    if (!id) Items = [...Items, cartItem];
    else console.log("Already added arr Items");

    localStorage.setItem("cartItems" + user.id, JSON.stringify(Items));
    console.log("it", Items);
  } else {
    console.log("lsItem", getcartItems);
    const id = getcartItems.find((itm) => itm.id === cartItem.id);

    if (!id) {
      Items = getcartItems;
      Items = [...Items, cartItem];

      localStorage.setItem("cartItems" + user.id, JSON.stringify(Items));
    } else {
      Items = getcartItems;
      console.log("bef", Items);
      let arr = Items.filter((itm) => itm.id !== cartItem.id);
      console.log("arr", arr);
      Items = arr;
      console.log("aft", Items);

      if (Items.length === 0) {
        headerCartCountUpdate(Items); // for header cart count update

        localStorage.removeItem("cartItems" + user.id);

        document.querySelector(
          ".resto" + cartItem.restaurantId + "change" + cartItem.id
        ).textContent = "Add"; // for dish add button update  "Added" ---> "Add"
      } else {
        localStorage.setItem("cartItems" + user.id, JSON.stringify(Items));

        document.querySelector(
          ".resto" + cartItem.restaurantId + "change" + cartItem.id
        ).textContent = "Add";
      }
    }
  }

  changeItemStatus();
};
//Add dish to cart functionality End

//function for changing  dish 'Add' button elements to 'Added'
const changeItemStatus = () => {
  let getcartItems3 = JSON.parse(localStorage.getItem("cartItems" + user.id));

  getcartItems3.forEach((itm) => {
    document.querySelector(
      ".resto" + itm.restaurantId + "change" + itm.id
    ).textContent = "Added";
  });

  if (getcartItems3 && getcartItems3.length > 0)
    document.querySelector(".count").textContent = getcartItems3.length; //rendering in header
};

changeItemStatus();
