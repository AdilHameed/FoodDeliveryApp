"use strict";

const user1 = JSON.parse(localStorage.getItem("userCred"));
if (!user1) window.location = "./login.html";

// Start of recipe data
const restaurant1Menu = [
  //Recipe1 data
  {
    id: 1,
    image: "./Recipe_image/recipe1.jpg",
    name: "Avacado Salad",
    badge1: "Vegan",
    badge2: "PULAO",
    calories: 400,
    nutrition: 92,
    rating: 4.8,
    totalReviews: "(441)",
    price: 161,
    status: "Added",
    diet: [
      " Vegeterian",
      " vegan",
      " Pescaterian",
      " Lactose-Free",
      " Carnivore",
      " Mediterranean",
    ],
  },
  //Recipe2 data
  {
    id: 2,
    image: "./Recipe_image/recipe2.jpg",
    name: " Cheesy Tomato Pasta",
    badge1: "Gnocchi",
    badge2: "Mozzarella",
    calories: 450,
    nutrition: 98,
    rating: 4.4,
    totalReviews: "(421)",
    price: 175,
    status: "Added",
    diet: [
      " Pescaterian",
      " Kid-Freindly",
      " Keto",
      " Paleo",
      " Low-FODMAP",
      " Vegeterian",
      " vegan",
    ],
  },
  //Recipe3 data
  {
    id: 3,
    image: "./Recipe_image/recipe3.png",
    name: "Mandarin Orange Salad",
    badge1: "Spinach",
    badge2: "Arugula",
    calories: 433,
    nutrition: 88,
    rating: 4.1,
    totalReviews: "(345)",
    price: 196,
    diet: [
      " Low-Carb",
      " Pescaterian",
      " Kid-Freindly",
      " Vegeterian",
      " vegan",
      " Dukan",
    ],
  },
  {
    id: 4,
    image: "./Recipe_image/Recipe3.1.jpg",
    name: "Chicken Curry",
    badge1: "Chicken",
    badge2: "Rice",
    calories: 433,
    nutrition: 88,
    rating: 4.1,
    totalReviews: "(345)",
    price: 215,
    diet: [
      " Low-Carb",
      " Pescaterian",
      " Kid-Freindly",
      " Vegeterian",
      " vegan",
      " Dukan",
    ],
  },
];

const restaurant2Menu = [
  //Recipe4 data
  {
    id: 1,
    image: "./Recipe_image/recipe4.png",
    name: "Homemade Salsa",
    badge1: "Jalapeños",
    badge2: "Cherry",
    calories: 384,
    nutrition: 93,
    rating: 3.9,
    totalReviews: "(369)",
    price: 159,
    diet: [
      " Ultra-Low-Fat",
      " Atkins",
      " Low-Carb",
      " Pescaterian",
      " vegan",
      " Dukan",
    ],
  },
  //Recipe5 data
  {
    id: 2,
    image: "./Recipe_image/recipe5.png",
    name: "Classic Bruschetta",
    badge1: "Baguette",
    badge2: "Olive",
    calories: 361,
    nutrition: 82,
    rating: 4.0,
    totalReviews: "(377)",
    price: 169,
    diet: [
      " HCG",
      " Intermittent Fasting",
      " Ultra-Low-Fat",
      " Atkins",
      " Low-Carb",
      " Pescaterian",
      " vegan",
      " Dukan",
    ],
  },
  //Recipe6 data
  {
    id: 3,
    image: "./Recipe_image/recipe6.jpg",
    name: "Hot Crab Dip",
    badge1: "Cheese",
    badge2: "Parmesan",
    calories: 360,
    nutrition: 75,
    rating: 4.5,
    totalReviews: "(381)",
    price: 129,
    diet: [
      " South Beach",
      " Low-carbohydrate",
      " Intermittent Fasting",
      " Ultra-Low-Fat",
      " Atkins",
      " vegan",
    ],
  },
  {
    id: 4,
    image: "./Recipe_image/recipe6.1.jpg",
    name: "Chicken Biryani",
    badge1: "Spicy",
    badge1: "&#8377; 234",
    calories: 360,
    nutrition: 75,
    rating: 4.5,
    totalReviews: "(381)",
    price: 212,
    diet: [
      " South Beach",
      " Low-carbohydrate",
      " Intermittent Fasting",
      " Ultra-Low-Fat",
      " Atkins",
      " vegan",
    ],
  },
];
// End of recipe data

// Start of Restaurant data pushed menuData in each restaurant  i
const restaurant1 = {
  id: 1,
  name: "Sheetal Chhaya",
  rating: " 3.3",
  img: "Recipe_image/Restaurant2.jpg",
  deliveryTime: "25 mins",
  foodType: "Chinese, South Indian, Indian",
  address: "Poolpar, BiharSharif",
  totalReviews: "100+ Ratings",
  cost: "$ 5",
  offer: [" 17%", " 20%"],
  menu: restaurant1Menu,
};
const restaurant2 = {
  id: 2,
  name: "Nation Cafe",
  rating: " 4.2",
  img: "Recipe_image/Restaurant1.jpg",
  deliveryTime: "22 mins",
  foodType: "Chinese, Italian, South Indian",
  address: "Khandakpar, BiharSharif",
  totalReviews: "77 Ratings",
  cost: "$ 7",
  offer: [" 10%", " 15%"],
  menu: restaurant2Menu,
};
// End of Restaurant data

//assigned restaurant data in restarant list
const restaurantList = [restaurant1, restaurant2];

//Number of restaurant available handler
let plural = "";
if (restaurantList.length > 1) plural = "s";
const avail = document.querySelector("#restAvail");
if (avail !== null)
  avail.textContent = `${restaurantList.length} Available Restaurant${plural} `;

// restaurant data passing into indexPage card
restaurantList.forEach((restaurant) => {
  const image = document.querySelector(".restImg" + restaurant.id);
  if (image !== null) image.src = restaurant.img;

  const name = document.querySelector(".restName" + restaurant.id);
  if (name !== null) name.textContent = restaurant.name;

  const dishes = document.querySelector(".restType" + restaurant.id);
  if (dishes !== null) dishes.textContent = restaurant.foodType;

  const time = document.querySelector(".restTime" + restaurant.id);
  if (time !== null) time.textContent = restaurant.deliveryTime;

  const rate = document.querySelector(".restRate" + restaurant.id);
  if (rate !== null) rate.after(restaurant.rating);
});

//activating view button of restaurant and setting restaurant and menu data in localStorage
//this function is called when clicking view button of both restaurant card
//it store particular restaurant and menu details in localStorage
const operation = (str) => {
  localStorage.removeItem("restDetail");

  const id = str.charAt(str.length - 1);

  var restaurant = restaurantList.find((rest) => rest.id === Number(id));

  localStorage.setItem("restDetail", JSON.stringify(restaurant));

  window.location = "./menu.html";
};

// logout functionality
document
  .querySelector(".logOut")
  .addEventListener("click", () => localStorage.removeItem("userCred"));

//header info update
let getcartItems1 = JSON.parse(localStorage.getItem("cartItems" + user1.id));
if (getcartItems1 && getcartItems1.length > 0)
  document.querySelector(".count").textContent = getcartItems1.length; //rendering in header

document.querySelector(".pro").textContent = user1.name.slice(0, 6) + " ...";
