const URL = "http://localhost:";
const PORT = "8000";
let userEmail;

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
  userEmail = response.user.email;
  console.log(userEmail, "user email");
  fetchGoals();
}
loginUser();

async function fetchGoals() {
  const response = await fetch(`${URL}${PORT}/goals/user/${userEmail}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
  const goals = await response.json();
  console.log(goals);
}
