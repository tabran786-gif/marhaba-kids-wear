function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // 🔐 ADMIN CREDENTIALS (CHANGE IF YOU WANT)
  if (username === "admin" && password === "marhaba123") {
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("msg").innerText = "❌ Invalid Login";
  }
}
