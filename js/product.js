const productList = document.getElementById("product-list");

let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
  productList.innerHTML = "<p>No products available</p>";
}

products.forEach(p => {
  productList.innerHTML += `
    <div class="product-card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p>₹${p.price}</p>

      <select id="size-${p.id}">
        ${p.sizes.map(s => `<option>${s.trim()}</option>`).join("")}
      </select>

      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `;
});

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  const size = document.getElementById(`size-${id}`).value;

  cart.push({
    ...product,
    size,
    qty: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}



