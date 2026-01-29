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

  const name = document.getElementById("cname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!name || !phone || !address) {
    alert("Please fill all customer details");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let total = 0;
  cart.forEach(i => total += i.price * i.qty);

  const orderData = {
    customerName: name,
    phone: phone,
    address: address,
    payment: payment,
    items: cart,
    total: total,
    status: "Pending",
    createdAt: new Date().toLocaleString()
  };

  // 🧾 PRODUCTS TEXT (WITH SIZE + IMAGE LINK)
  let itemsText = cart.map(item => {
    total += item.price * item.qty;

    return `🧸 ${item.name}
📏 Size: ${item.size}
🔢 Qty: ${item.qty}
💰 Price: ₹${item.price * item.qty}
🖼️ Image: ${item.image}`;
  }).join("%0A%0A");

  const ownerNumber = "917972174183"; // WhatsApp number (with country code)

  const message =
`🛍️ *NEW ORDER – Marhaba Kids Wear*%0A
──────────────────%0A
👤 Name: ${name}%0A
📞 Phone: ${phone}%0A
🏠 Address: ${address}%0A
💳 Payment: ${payment}%0A
──────────────────%0A
${itemsText}%0A
──────────────────%0A
💰 *Total: ₹${total}*`;

  // 💳 UPI PAYMENT
  if (payment === "UPI") {

    const upiId = "tabran786@oksbi";
    const note = `Order from ${name}`;

    const upiUrl =
      `upi://pay?pa=${upiId}&pn=Marhaba Kids Wear&am=${total}&cu=INR&tn=${encodeURIComponent(note)}`;

    // Save order backup
    localStorage.setItem("lastOrder", JSON.stringify({
      name, phone, address, cart, total, payment
    }));

    // Open UPI App
    window.location.href = upiUrl;

    // After payment → WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");
    }, 3000);

  } else {
    // 🚚 CASH ON DELIVERY
    window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");
    alert("✅ Order Confirmed! We will contact you soon.");
  }

  // 🔥 SAVE ORDER FOR CUSTOMER & ADMIN
  firebase.database().ref("orders").push(orderData);

  alert("✅ Order Confirmed");

  localStorage.removeItem("cart");
  window.location.href = "my-orders.html";
}



