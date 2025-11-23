/* -------------------------------
      GLOBAL CART SYSTEM
--------------------------------*/

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* -------------------------------
      SAVE CART
--------------------------------*/
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* -------------------------------
      ADD TO CART
--------------------------------*/
function addToCart(productName, productPrice, productImage) {
  let existing = cart.find(item => item.name === productName);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      image: productImage,
      qty: 1
    });
  }

  saveCart();
  alert(productName + " added to cart!");
}

/* -------------------------------
      REMOVE ITEM
--------------------------------*/
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

/* -------------------------------
      CHANGE QUANTITY
--------------------------------*/
function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    removeItem(index);
  } else {
    saveCart();
    renderCart();
  }
}

/* -------------------------------
      RENDER CART (cart.html)
--------------------------------*/
function renderCart() {
  const container = document.querySelector(".cart-items");
  const subtotalBox = document.querySelector(".subtotal");
  const totalBox = document.querySelector(".total");

  if (!container) return; // not on cart page

  container.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>$${item.price}</p>
        </div>

        <div class="item-qty">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>

        <p class="item-total">$${itemTotal}</p>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  let shipping = subtotal > 0 ? 5 : 0;
  let total = subtotal + shipping;

  subtotalBox.innerHTML = `$${subtotal}`;
  totalBox.innerHTML = `$${total}`;
}

/* -------------------------------
      AUTO-RENDER IF CART PAGE
--------------------------------*/
document.addEventListener("DOMContentLoaded", renderCart);
