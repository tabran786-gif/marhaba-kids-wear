const cartDiv = document.getElementById("cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  let total = 0;
  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <p>Qty: ${item.qty}</p>
          <p>Size: <strong>${item.size}</strong></p>

          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
      <hr>
    `;
  });

  cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();

function confirmOrder() {
  const name = document.getElementById("cname").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🧾 Order text
  let itemsText = cart.map(
    item => `• ${item.name} x ${item.qty} = ₹${item.price * item.qty}`
  ).join("%0A");

  const ownerNumber = "917972174183"; // WhatsApp number
  const message =
`🛍️ *New Order - Marhaba Kids Wear*%0A
👤 Name: ${name}%0A
📞 Phone: ${phone}%0A
🏠 Address: ${address}%0A
💳 Payment: ${payment}%0A
──────────────%0A
${itemsText}%0A
──────────────%0A
💰 Total: ₹${total}`;

  if (payment === "UPI") {
    const upiId = "tabran786@okaxis";
    const note = `Order from ${name}`;
    const upiUrl = `upi://pay?pa=${upiId}&pn=Marhaba Kids Wear&am=${total}&cu=INR&tn=${encodeURIComponent(note)}`;

    // Save order
    localStorage.setItem("lastOrder", JSON.stringify({ name, phone, address, cart, total }));

    // Open UPI
    window.location.href = upiUrl;

    // After short delay, open WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");
    }, 3000);

  } else {
    // COD
    window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");

    alert("Order Confirmed! Our team will contact you.");

    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  }
}
const orderData = {
  name,
  phone,
  address,
  cart,
  total,
  payment,
  date: new Date().toLocaleString()
};

saveOrder(orderData);



  // Clear cart after order
  localStorage.removeItem("cart");
  cart = [];
  renderCart();


// Initial render
renderCart();



