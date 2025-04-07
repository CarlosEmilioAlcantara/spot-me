const termsBtns = document.querySelectorAll(".btn-terms");

termsBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    function open() {
      document
        .querySelectorAll(".terms-content")
        [index].classList.toggle("terms-content-toggled");
    }

    setTimeout(open, 0);
  });
});
