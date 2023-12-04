const URL = "http://localhost:";
const PORT = "8000";
let user = {
  email: "",
  goals: [],
};

console.log("hillo");

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
  console.log(user.email, "user email");
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
  user.goals.forEach((goal) => renderGoals(goal));
}
