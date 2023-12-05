const goalsContainer = document.querySelector(".goals-container");
const goals = document.querySelector(".goals");
const goalForm = document.querySelector(".goal-form");
const addWorkoutForm = document.querySelector(".add-workout-form");
const deleteGoalModal = document.querySelector("#delete-modal");
const overlay = document.querySelector(".overlay");
const deleteModalYes = document.querySelector("#delete-yes");
const deleteModalNo = document.querySelector("#delete-no");
const addWorkoutModal = document.querySelector("#add-workout-modal");
let addWorkoutBtn = document.querySelector(".add-workout-btn");
let percentComplete = document.querySelector(".percent-complete");

let goalIdToDelete;
let selectedGoal;

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
  const addBtn = event.target.closest(".add-workout-btn");
  const logBtn = event.target.closest(".view-log-btn");
  const svgElement = parent.querySelector("circle");
  const percentageText = parent.querySelector(".percent-complete").innerHTML;
  let percent = parseInt(percentageText.split("%")[0]);
  if (delBtn) {
    const goalId = parent.id;
    goalIdToDelete = goalId;
    renderDeleteModal();
  } else if (addBtn) {
    renderAddWorkoutModal();
  } else if (logBtn) {
    console.log("lg");
  } else {
    toggleExpandGoal(parent);

    if (parent.classList.contains("goal-expand")) {
      animateProgressBar(svgElement, percent);
    } else {
      svgElement.style.strokeDashoffset = 240;
    }
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

addWorkoutForm.addEventListener("submit", (e) => {
  const distance = document.getElementById("workout-distance").value;

  let workoutDto = {
    goal_id: selectedGoal.id,
    user_email: user.email,
    distance: parseInt(distance),
    date: Date.now(),
    modality: selectedGoal.modality,
  };
  addNewWorkout(workoutDto);
  // TODO: Render out a toast
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

function addWorkoutBtnListener() {
  let addWorkoutBtn = document.querySelector(".workout-btn");
  addWorkoutBtn.addEventListener("click", () => {
    console.log("cli");
  });
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
  if (percentComp > 100) {
    percentComplete = 100;
  }
  // }
  let lastWorkoutDate;
  if (data.workouts) {
    lastWorkoutDate = formatDate(data.workouts[data.workouts.length - 1].date);
  } else {
    lastWorkoutDate = "N/A";
  }

  const html = `
    <div class="goals  container grey-text text-darken-1">
    <div id="${data.id}" class="card-panel goal goal-toggle white s12 row">
      <div class="s12 workout-icon">${iconHtml}</div>
      <div class="goal-details s6">
      <div class="goal-title">${data.name}</div>
      <div class="goal-target-distance">Target Distance: ${data.target_distance}m</div>
      <div class="goal-dropdown-container no-display">
        <div class="goal-dropdown-top-container">
        <div class="goal-dropdown-outer">
          <svg id="bar-${data.id}" width="100" height="100">
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
          <div class="goal-dropdown-top-right">
            <p><b>Complete:</b> ${completed}m</p>
            <div class="last-workout-container">
              <h6>Last Log</h6>
              <p>${lastWorkoutDate}</p>
            </div>
          </div
      </div>
      
      </div>
      <div class="goal-dropdown-btn-container" >
        <button class="waves-effect waves-light workout-btn add-workout-btn">
        Add workout
        </button>
        <button class="waves-effect waves-light workout-btn view-log-btn" style="background-color: var(--secondary)">
        View Logs
        </button>
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

// Render Modals
function renderDeleteModal() {
  deleteGoalModal.style.display = "block";
  overlay.style.display = "block";
}

function closeDeleteModal() {
  deleteGoalModal.style.display = "none";
  overlay.style.display = "none";
}

function renderAddWorkoutModal() {
  addWorkoutModal.style.display = "block";
  overlay.style.display = "block";
  console.log(user);
}

function closeAddWorkoutModal() {
  addWorkoutModal.style.display = "none";
  overlay.style.display = "none";
}

function toggleExpandGoal(element) {
  element.classList.toggle("goal-expand");
  element.classList.toggle("goal");
  // toggle selected goal
  if (element.classList.contains("goal-expand")) {
    selectedGoal = user.goals.find((goal) => goal.id === element.id);
  } else {
    selectedGoal = "";
  }

  let childDropdown = element.querySelector(".goal-dropdown-container");
  childDropdown.classList.toggle("no-display");
}

function animateProgressBar(svgElement, percentage) {
  let counter = 0;
  let maxCounter = 100;
  const totalOffset = 240;
  let currentOffset = totalOffset;
  const strokeDashoffsetSteps = totalOffset / maxCounter;

  if (percentage > 0) {
    let interval = setInterval(() => {
      // update counter
      counter += 1;
      // update currentOffset
      currentOffset -= strokeDashoffsetSteps;
      if (counter === percentage) {
        clearInterval(interval);
      }
      // update text
      // update dashOffset
      svgElement.style.strokeDashoffset = currentOffset;
    }, 15);
  }
}

// Utility Functions
function formatDate(unixDate) {
  const date = new Date(unixDate);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = String(date.getFullYear()).slice(-2);
  const dateFormat = `${month}/${day}/${year}`;
  return dateFormat;
}
