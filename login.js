const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// Predefined users
const users = [
  { email: "student1@college.com", password: "student123", name: "Alice", role: "student" },
  { email: "student2@college.com", password: "student123", name: "Bob", role: "student" },
  { email: "staff1@college.com", password: "staff123", name: "Mr. Smith", role: "staff" },
  { email: "staff2@college.com", password: "staff123", name: "Mrs. Jones", role: "staff" },
  { email: "admin@college.com", password: "admin123", name: "Principal", role: "admin" }
];

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const user = users.find(u => u.email === email && u.password === password);

  if(!user) {
    errorMsg.textContent = "Invalid credentials! Please try again.";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if(user.role === "student") window.location.href = "index.html";
  else if(user.role === "staff") window.location.href = "staff.html";
  else if(user.role === "admin") window.location.href = "admin.html";
});
