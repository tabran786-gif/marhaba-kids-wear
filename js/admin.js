// 🛒 Add Product Function
function addProduct() {
  console.log("addProduct called");

  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");
  const desc = document.getElementById("desc").value;
const sizes = document.getElementById("sizes").value.split(",");

  const msg = document.getElementById("msg");

  if (!nameInput || !priceInput || !imageInput) {
    alert("Input fields not found");
    return;
  }

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const file = imageInput.files[0];

  if (name === "" || price === "" || !file) {
    alert("Please fill all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const productData = {
      name: name,
      price: price,
      image: event.target.result,
      createdAt: Date.now()
    };

    firebase.database().ref("products").push(productData)
      .then(() => {
        msg.innerText = "✅ Product Added Successfully";
        msg.style.color = "green";

        // Clear inputs
        nameInput.value = "";
        priceInput.value = "";
        imageInput.value = "";
      })
      .catch((error) => {
        msg.innerText = "❌ Error adding product";
        msg.style.color = "red";
        console.error(error);
      });
  };

  reader.readAsDataURL(file);
}
// 🔄 Show Products in Admin Panel
firebase.database().ref("products").on("value", snapshot => {
  const adminList = document.getElementById("adminProducts");
  if (!adminList) return;

  adminList.innerHTML = "";

  snapshot.forEach(child => {
    const p = child.val();
    const id = child.key;

    adminList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <input value="${p.name}" id="name-${id}">
        <input value="${p.price}" id="price-${id}">
        <br><br>
        <button onclick="updateProduct('${id}')">Update</button>
        <button onclick="deleteProduct('${id}')">Delete</button>
      </div>
    `;
  });
});

// ✏️ Update
function updateProduct(id) {
  const name = document.getElementById(`name-${id}`).value;
  const price = document.getElementById(`price-${id}`).value;

  firebase.database().ref("products/" + id).update({
    name: name,
    price: price
  });

  alert("Product Updated");
}

// ❌ Delete
function deleteProduct(id) {
  if (confirm("Delete this product?")) {
    firebase.database().ref("products/" + id).remove();
  }
}
