const URL = "http://localhost:";
const PORT = "8000";
let user = {
  email: "",
  goals: [],
};

async function loginUser() {
  const response = await fetch(`${URL}${PORT}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "a@example.com",
      password: "123123",
    }),
    credentials: "include",
  }).then((res) => res.json());
  user.email = response.user.email;
  fetchGoals();
}

async function fetchGoals() {
  const response = await fetch(`${URL}${PORT}/goals/user/${user.email}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  const goals = await response.json();
  user.goals = goals;
  user.goals.forEach((goal) => {
    renderGoals(goal);
  });
  addWorkoutBtnListener();
}

async function addNewGoal(goal) {
  const response = await fetch(`${URL}${PORT}/goals/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  }).then((res) => res.json());
  console.log(response);
}

async function deleteGoal(id) {
  try {
    const response = await fetch(`${URL}${PORT}/goals/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }).then((res) => res.json());
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
