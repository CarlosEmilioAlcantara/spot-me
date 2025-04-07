const btnDeleteAcc = document.querySelector("#btn-deleteAcc");
centerer = document.querySelector(".centerer");
overlay = document.getElementById("overlay");

const popupDeleteAcc = document.querySelector(".popup-deleteAcc");
const deleteAccClose = document.querySelector(".deleteAcc-close");
const deleteAccYes = document.querySelector(".deleteAcc-yes");

const popupIncomplete = document.querySelector(".popup-incomplete");
const incompleteOk = document.querySelector(".incomplete-ok");

const popupNotFound = document.querySelector(".popup-notfound");
const notFoundOk = document.querySelector(".notfound-ok");

btnDeleteAcc.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  if (email === "" || username === "" || password === "") {
    popupIncomplete.classList.toggle("popup-incomplete-toggled");
  } else {
    popupDeleteAcc.classList.toggle("popup-deleteAcc-toggled");
  }

  overlay.classList.toggle("overlay-toggled");
  centerer.classList.toggle("centerer-toggled");
});

deleteAccClose.addEventListener("click", () => {
  popupDeleteAcc.classList.remove("popup-deleteAcc-toggled");
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

deleteAccYes.addEventListener("click", () => {
  popupDeleteAcc.classList.remove("popup-deleteAcc-toggled");
  overlay.classList.remove("overlay-toggled");
  centerer.classList.remove("centerer-toggled");

  const email = document.querySelector("#email").value;
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  fetch("/delete-account/deleting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.deleted) {
        popupNotFound.classList.toggle("popup-notfound-toggled");
        overlay.classList.toggle("overlay-toggled");
      } else if (data.deleted) {
        window.location.href = "/";
      }
    })
});