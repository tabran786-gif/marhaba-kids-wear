// 🛒 Add Product Function
function addProduct() {
  console.log("Add Product clicked");

  const name = document.getElementById("pname").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;
  const sizesInput = document.getElementById("sizes").value;
  const imageInput = document.getElementById("image");

  if (!name || !price || !desc || !sizesInput || !imageInput.files[0]) {
    alert("Please fill all fields");
    return;
  }

  const sizes = sizesInput.split(",");

  const reader = new FileReader();

  reader.onload = function () {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    const product = {
      id: Date.now(),
      name: name,
      price: Number(price),
      desc: desc,
      sizes: sizes,
      image: reader.result
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("✅ Product added successfully");

    // Clear form
    document.getElementById("pname").value = "";
    document.getElementById("price").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("sizes").value = "";
    document.getElementById("image").value = "";
  };

  reader.readAsDataURL(imageInput.files[0]);
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
