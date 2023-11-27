const goalsContainer = document.querySelector(".goals");
const goals = document.querySelector(".goals");
const goalForm = document.querySelector(".goal-form");
// const title = document.getElementById("title-input").value;
// const targetDistance = document.getElementById("distance-input").value;
// const targetDate = document.getElementById("target-date-input").value;
// const modality = document.getElementById("modality").value;

document.addEventListener("DOMContentLoaded", function () {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
  const elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);
});

goals.addEventListener("click", (event) => {
  const delBtn = event.target.closest(".goal-delete");
  if (delBtn) {
    const parent = event.target.closest(".goals");
    const goalId = parent.id;
    handleGoalDelete(goalId);
  }
});

goalForm.addEventListener("submit", (event) => {
  // event.preventDefault();
  const title = document.getElementById("title-input").value;
  const targetDistance = document.getElementById("distance-input").value;
  const targetDate = document.getElementById("target-date-input").value;
  const modality = document.getElementById("modality").value.toLowerCase();

  const formData = {
    user_email: user.email,
    name: title,
    target_distance: parseFloat(targetDistance),
    start_date: Date.now(),
    target_date: Math.floor(new Date(targetDate).getTime() / 1000),
    modality,
  };

  console.log(formData);
  addNewGoal(formData);
});

function renderGoals(data) {
  console.log(data);
  let iconHtml = renderModalityIcon(data.modality);
  const html = `
    <div id="${data.id}" class="goals container grey-text text-darken-1">
    <div class="card-panel goal white row">
      ${iconHtml}

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

function handleGoalDelete(id) {
  console.log(id);
  console.log("Delete button clicked!");
  deleteGoal(id);
}

function renderModalityIcon(modality) {
  let iconTag;
  switch (modality) {
    case "run":
      iconTag = `<span class="material-symbols-outlined">
      directions_run
      </span>`;
      break;
    case "bike":
      iconTag = `<span class="material-symbols-outlined">
      directions_bike
      </span>`;
      break;
    case "swim":
      iconTag = `<span class="material-symbols-outlined">
      pool
      </span>`;
      break;
    case "row":
      iconTag = `<span class="material-symbols-outlined">
      rowing
      </span>`;
      break;
    default:
      iconTag = `<span class="material-symbols-outlined">
      fitness_center
      </span>`;
  }

  return iconTag;
}
