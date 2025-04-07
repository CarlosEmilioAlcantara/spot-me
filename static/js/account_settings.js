const accountSettings = document.querySelector(".account-settings");

accountSettings.addEventListener("click", () => {
  document
    .querySelector(".account-settings__content")
    .classList.toggle("account-settings__content-toggled");
});
