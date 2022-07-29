document.addEventListener("DOMContentLoaded", function () {
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
  M.Slider.init(document.querySelectorAll(".slider"));
  M.Carousel.init(document.querySelectorAll(".carousel"));
  M.Modal.init(document.querySelectorAll(".modal"));
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  let options = {
    alignment: "left",
  };
  var instances = M.Dropdown.init(elems, options);
});
