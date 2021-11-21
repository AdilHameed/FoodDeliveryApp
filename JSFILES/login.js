const homeUrl = "./index.html";
const loginUrl = "./login.html";

const user1 = JSON.parse(localStorage.getItem("userCred"));

if (user1) window.location = homeUrl;

const userName = document.querySelector(".user_inp");
const userPass = document.querySelector(".password_inp");
const logInBtn = document.querySelector(".login_btn");

logInBtn.addEventListener("click", (e) => {
  //login buton click
  e.preventDefault();

  fetch("https://6193976ed3ae6d0017da86a1.mockapi.io/api/user_profile/") //fetching data from api
    .then((res) =>
      res.json().then((data) => {
        const currUser = data.find((acc) => acc.username === userName.value);
        console.log("", currUser);

        if (currUser) {
          if (currUser.password === userPass.value) {
            // username and password is correct then ssetting user data in local storage
            //and redirecting to homepage
            localStorage.setItem("userCred", JSON.stringify(currUser));
            window.location = homeUrl;
          } else console.log(" Wrong Password! ");
        } else console.log("account with this username  does not exist");
      })
    )
    .catch((err) => console.log(err));
});
