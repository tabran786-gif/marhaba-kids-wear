// 🔥 Firebase Config (USE YOUR REAL DETAILS)
const firebaseConfig = {
apiKey: "AIzaSyC-LQt9f3q73yAmKpyCuCuYbVqARZ984VU",
  authDomain: "marhaba-kids-wear.firebaseapp.com",
  databaseURL: "https://marhaba-kids-wear-default-rtdb.firebaseio.com",
  projectId: "marhaba-kids-wear",
  storageBucket: "marhaba-kids-wear.firebasestorage.app",
  messagingSenderId: "1048025467592",
  appId: "1:1048025467592:web:8ca02c4791b8f8ac0f73fd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Button Click
document.getElementById("addBtn").addEventListener("click", addProduct);

function addProduct() {
  console.log("Add Product clicked");

  const name = document.getElementById("pname").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const sizes = document.getElementById("sizes").value;
  const imageFile = document.getElementById("image").files[0];
  const msg = document.getElementById("msg");

  if (!name || !price || !desc || !sizes || !imageFile) {
    msg.innerText = "❌ Fill all fields";
    msg.style.color = "red";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const productData = {
      name: name,
      price: price,
      desc: desc,
      sizes: sizes.split(","),
      image: reader.result
    };

    firebase.database().ref("products").push(productData)
      .then(() => {
        msg.innerText = "✅ Product Added Successfully";
        msg.style.color = "green";

        // Clear form
        document.getElementById("pname").value = "";
        document.getElementById("price").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("sizes").value = "";
        document.getElementById("image").value = "";
      })
      .catch((error) => {
        msg.innerText = "❌ Firebase Error";
        console.error(error);
      });
  };

  reader.readAsDataURL(imageFile);
}
// 🔄 Show Products in Admin Panel
firebase.database().ref("products").on("value", (snapshot) => {
  const adminList = document.getElementById("adminProducts");
  adminList.innerHTML = "";

  snapshot.forEach((child) => {
    const p = child.val();
    const id = child.key;

    adminList.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;">
        <img src="${p.image}" width="120"><br>
        <strong>${p.name}</strong><br>
        ₹${p.price}<br>
        <small>${p.desc}</small><br>
        Sizes: ${p.sizes.join(", ")}<br><br>
        <button onclick="deleteProduct('${id}')"
          style="background:red;color:white;border:none;padding:6px;">
          Delete
        </button>
      </div>
    `;
  });
});
// ❌ Delete Product
function deleteProduct(id) {
  if (confirm("Delete this product?")) {
    firebase.database().ref("products/" + id).remove();
  }
}


