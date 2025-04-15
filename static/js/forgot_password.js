const btnForgot = document.querySelector("#btn-forgot");
centerer = document.querySelector(".centerer");
overlay = document.getElementById("overlay");

const popupForgot = document.querySelector(".popup-forgot");
const forgotOk = document.querySelector(".forgot-ok");

const popupWrong = document.querySelector(".popup-wrong");
const wrongOk = document.querySelector(".wrong-ok");

const popupIncomplete = document.querySelector(".popup-incomplete");
const incompleteOk = document.querySelector(".incomplete-ok");

const popupNotFound = document.querySelector(".popup-notfound");
const notFoundOk = document.querySelector(".notfound-ok");

forgotOk.addEventListener("click", () => {
  popupForgot.classList.remove("popup-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

wrongOk.addEventListener("click", () => {
  popupWrong.classList.remove("popup-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

incompleteOk.addEventListener("click", () => {
  popupIncomplete.classList.remove("popup-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

notFoundOk.addEventListener("click", () => {
  popupNotFound.classList.remove("popup-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

btnForgot.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  if (
    email === "" ||
    username === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    popupIncomplete.classList.toggle("popup-toggled");
    overlay.classList.toggle("overlay-toggled");
    centerer.classList.toggle("centerer-toggled");
  } else {
    fetch("/forgot-password/changing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response == 404) {
          popupNotFound.classList.toggle("popup-toggled");
          overlay.classList.toggle("overlay-toggled");
          centerer.classList.toggle("centerer-toggled");
        } else if (data.response == 401) {
          popupWrong.classList.toggle("popup-toggled");
          overlay.classList.toggle("overlay-toggled");
          centerer.classList.toggle("centerer-toggled");
        } else if (data.response == 400) {
          popupForgot.classList.toggle("popup-toggled");
          overlay.classList.toggle("overlay-toggled");
          centerer.classList.toggle("centerer-toggled");
        } else if (data.response == 200) {
          window.location.href = "/login";
        }
      });
  }
});
