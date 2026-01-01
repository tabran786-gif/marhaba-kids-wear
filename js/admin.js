// 🛒 Add Product Function
function addProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const sizes = document.getElementById("sizes").value.split(",");
  const imgInput = document.getElementById("image");

  if (!name || !price || !imgInput.files[0]) {
    alert("Fill all fields");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
      id: Date.now(),
      name,
      price: Number(price),
      desc,
      sizes,
      image: reader.result
    });

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully");
  };

  reader.readAsDataURL(imgInput.files[0]);
}


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
