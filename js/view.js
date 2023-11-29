const goalsContainer = document.querySelector(".goals-container");
const goals = document.querySelector(".goals");
const goalForm = document.querySelector(".goal-form");
const modal = document.querySelector("#deleteModal");
const overlay = document.querySelector(".overlay");
const deleteModalYes = document.querySelector("#deleteYes");
const deleteModalNo = document.querySelector("#deleteNo");
let percentComplete = document.querySelector(".percent-complete");

let goalIdToDelete;
// TODO: Create percentage completion and attatch to the animation
// TODO: Create toggle on click adding the extra

// EVENT LISTENERS

document.addEventListener("DOMContentLoaded", () => {
  // nav menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // add recipe form
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
  const elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);
});

goalsContainer.addEventListener("click", (event) => {
  const delBtn = event.target.closest(".goal-delete");
  const parent = event.target.closest(".goal-toggle");
  if (delBtn) {
    const goalId = parent.id;
    goalIdToDelete = goalId;
    renderDeleteModal();
  } else {
    console.log(parent);
    toggleExpandGoal(parent);
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

deleteModalYes.addEventListener("click", async () => {
  if (goalIdToDelete !== "") {
    await deleteGoal(goalIdToDelete);
  }
  closeDeleteModal();
  goalsContainer.innerHTML = "";
  fetchGoals();
});
deleteModalNo.addEventListener("click", () => {
  goalIdToDelete = "";
  closeDeleteModal();
});

function handleGoalDelete(id) {
  console.log("Delete button clicked!");
  deleteGoal(id);
}
// Rendering Functions

function renderGoals(data) {
  console.log(data);
  let iconHtml = renderModalityIcon(data.modality);

  // **Would potentially be better if API always return completed and empty workout array if not present
  let completed = data.current_distance;
  // if (!data.workouts) {
  //   percentComp = 0;
  // } else {
  percentComp = Math.floor((completed / data.target_distance) * 100);
  // }
  console.log(completed, percentComp);

  const html = `
    <div id="${data.id}" class="goals  container grey-text text-darken-1">
    <div class="card-panel goal goal-toggle white s12 row">
      <div class="s12 workout-icon">${iconHtml}</div>
      <div class="goal-details s6">
      <div class="goal-title">${data.name}</div>
      <div class="goal-target-distance">Target Distance: ${data.target_distance}</div>
      <div class="goal-dropdown-outer no-display">
      <svg width="100" height="100">
      <defs>
      <linearGradient id="GradientColor">
        <stop offset="0%" stop-color="#76b947" />
        <stop offset="100%" stop-color="#2f5233" />
      </linearGradient>
    </defs>
        <circle />
    </svg>
        <div class="goal-dropdown-inner">
          <div class="percent-complete">
            ${percentComp}%
          </div>
        </div>
      </div>
      <div>
        
      </div>
      </div>
      <div class="goal-delete">
      <i class="material-icons">delete_outline</i>
      </div>
      </div>
  </div>
  `;
  goalsContainer.innerHTML += html;
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

function renderDeleteModal() {
  modal.style.display = "block";
  overlay.style.display = "block";
}

function closeDeleteModal() {
  modal.style.display = "none";
  overlay.style.display = "none";
}

function toggleExpandGoal(element) {
  element.classList.toggle("goal-expand");
  element.classList.toggle("goal");
  let childDropdown = element.querySelector(".goal-dropdown-outer");
  childDropdown.classList.toggle("no-display");
}

// Utility Functions
