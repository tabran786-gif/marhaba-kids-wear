/ 📝 REGISTER
function register() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("msg");

  if (!name || !phone) {
    msg.innerText = "Fill all details";
    return;
  }

  firebase.database().ref("customers/" + phone).set({
    name: name,
    phone: phone
  });

  localStorage.setItem("customer", JSON.stringify({ name, phone }));
  window.location.href = "index.html";
}

// 🔐 LOGIN
function login() {
  const phone = document.getElementById("phone").value;
  const msg = document.getElementById("msg");

  firebase.database().ref("customers/" + phone).get()
    .then(snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem("customer", JSON.stringify(snapshot.val()));
        window.location.href = "index.html";
      } else {
        msg.innerText = "User not found, please register";
      }
    });
}

// 🚪 LOGOUT
function customerLogout() {
  localStorage.removeItem("customer");
  window.location.href = "customer-login.html";
}
