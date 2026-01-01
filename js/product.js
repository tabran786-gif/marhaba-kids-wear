const productList = document.getElementById("product-list");

firebase.database().ref("products").on("value", snapshot => {
  if (!productList) return;
productList.innerHTML += `
  <div class="product-card">
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <p class="price">₹${p.price}</p>

    <select id="size-${id}">
      ${p.sizes.map(size => `<option value="${size.trim()}">${size.trim()}</option>`).join("")}
    </select>

    <button onclick="addToCart('${id}', '${p.name}', ${p.price}, '${p.image}')">
      Add to Cart
    </button>
  </div>
`;

 
  });


// 🔥 SINGLE SOURCE OF TRUTH
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: Number(price),
      image: image,
      size: size,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}



