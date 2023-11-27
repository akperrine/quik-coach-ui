const goals = document.querySelector(".goals");

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

function renderGoals(data) {
  const html = `
    <div class="card-panel recipe white row" data-id="${data.id}">
      <img src="/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.name}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${data.id}">delete_outline</i>
      </div>
    </div>
  `;
  goals.innerHTML += html;
}
