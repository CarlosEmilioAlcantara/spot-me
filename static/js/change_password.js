const btnChange = document.querySelector("#btn-change");
centerer = document.querySelector(".centerer");
overlay = document.getElementById("overlay");

const popupChangePW = document.querySelector(".popup-changePW");
const changePWClose = document.querySelector(".changePW-close");
const changePWYes = document.querySelector(".changePW-yes");

const popupIncomplete = document.querySelector(".popup-incomplete");
const incompleteOk = document.querySelector(".incomplete-ok");

const popupNotFound = document.querySelector(".popup-notfound");
const notFoundOk = document.querySelector(".notfound-ok");

btnChange.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const newPassword = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  if (
    email === "" ||
    username === "" ||
    newPassword === "" ||
    confirmPassword === ""
  ) {
    popupIncomplete.classList.toggle("popup-incomplete-toggled");
  } else {
    popupChangePW.classList.toggle("popup-changePW-toggled");
  }

  overlay.classList.toggle("overlay-toggled");
  centerer.classList.toggle("centerer-toggled");
});

changePWClose.addEventListener("click", () => {
  popupChangePW.classList.remove("popup-changePW-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

incompleteOk.addEventListener("click", () => {
  popupIncomplete.classList.remove("popup-incomplete-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

notFoundOk.addEventListener("click", () => {
  popupNotFound.classList.remove("popup-notfound-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");
});

changePWYes.addEventListener("click", () => {
  popupChangePW.classList.remove("popup-changePW-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");

  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const newPassword = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  fetch("/change-password/changing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.changed) {
        popupNotFound.classList.toggle("popup-notfound-toggled");
        overlay.classList.toggle("overlay-toggled");
      } else if (data.changed) {
        window.location.href = "/index";
      }
    });
});
