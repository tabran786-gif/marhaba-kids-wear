const productList = document.getElementById("product-list");

firebase.database().ref("products").on("value", snapshot => {
  if (!productList) return;

  productList.innerHTML = "";

  snapshot.forEach(child => {
    const p = child.val();
    const id = child.key;

    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart('${id}')">
          Add to Cart
        </button>
      </div>
    `;
  });
});

// 🔥 SINGLE SOURCE OF TRUTH
function addToCart(id) {
  firebase.database().ref("products/" + id).once("value")
    .then(snapshot => {
      const p = snapshot.val();

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === id);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id: id,
          name: p.name,
          price: Number(p.price),
          image: p.image,
          qty: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ Added to cart");
    });
}

