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
  console.log(data);
  console.log(data.id, data.name);
  const html = `
    <div class="goals container grey-text text-darken-1">
    <div class="card-panel goal white row">
      <span class="material-icons"> directions_run </span>

      <div class="goal-details">
        <div class="goal-title">${data.name}</div>
        <div class="goal-ingredients">Target Distance: ${data.target_distance}</div>
      </div>
      <div class="goal-delete">
        <i class="material-icons">delete_outline</i>
      </div>
    </div>
  </div>
  `;
  goals.innerHTML += html;
}
