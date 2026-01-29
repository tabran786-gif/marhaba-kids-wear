// 🛒 Add Product Function
function addProduct() {
  console.log("addProduct called");

  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageInput = document.getElementById("image");
  const descInput = document.getElementById("desc");
  const sizesInput = document.getElementById("sizes");
  const msg = document.getElementById("msg");

  // Safety check
  if (!nameInput || !priceInput || !imageInput || !descInput || !sizesInput) {
    alert("❌ Input fields not found");
    return;
  }

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const desc = descInput.value.trim();
  const sizes = sizesInput.value.split(",").map(s => s.trim());
  const file = imageInput.files[0];

  if (!name || !price || !desc || sizes.length === 0 || !file) {
    alert("❌ Please fill all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const productData = {
      name: name,
      price: price,
      desc: desc,
      sizes: sizes,
      image: e.target.result,
      createdAt: Date.now()
    };

    firebase.database().ref("products").push(productData)
      .then(() => {
        msg.innerText = "✅ Product Added Successfully";
        msg.style.color = "green";

        // Clear form
        nameInput.value = "";
        priceInput.value = "";
        descInput.value = "";
        sizesInput.value = "";
        imageInput.value = "";
      })
      .catch((error) => {
        msg.innerText = "❌ Error adding product";
        msg.style.color = "red";
        console.error(error);
      });
  };
reader.readAsDataURL(imageInput.files[0]);
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
// 📦 SHOW ORDERS IN ADMIN PANEL
firebase.database().ref("orders").on("value", snapshot => {

  const table = document.getElementById("ordersTable");
  if (!table) return;

  table.innerHTML = "";

  let count = 1;

  snapshot.forEach(orderSnap => {
    const o = orderSnap.val();

    let itemsHtml = "";
    o.items.forEach(item => {
      itemsHtml += `
        ${item.name} <br>
        Size: ${item.size} | Qty: ${item.qty} <br><br>
      `;
    });

    table.innerHTML += `
      <tr>
        <td>${count++}</td>
        <td>${o.customer}</td>
        <td>${o.phone}</td>
        <td>${o.address}</td>
        <td>${itemsHtml}</td>
        <td>₹${o.total}</td>
        <td>${o.payment}</td>
        <td>${o.date}</td>
      </tr>
    `;
  });

});
