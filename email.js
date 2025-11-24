// ===== Cart Functionality =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay(){
    const totalEl = document.querySelectorAll('#cart-total');
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalEl.forEach(el => el.textContent = total.toFixed(2));

    const tbody = document.getElementById('cart-items');
    if(tbody){
        tbody.innerHTML = '';
        cart.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding:10px;">${item.name}</td>
                <td style="padding:10px; text-align:center;">$${item.price.toFixed(2)}</td>
                <td style="padding:10px; text-align:center;">${item.quantity}</td>
                <td style="padding:10px; text-align:center;">$${(item.price * item.quantity).toFixed(2)}</td>
                <td style="padding:10px; text-align:center;">
                    <button onclick="removeItem(${index})" style="padding:5px 10px; cursor:pointer;">X</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function addToCart(name, price){
    const existing = cart.find(item => item.name === name);
    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({name, price, quantity: 1});
    }
    saveCart();
    alert(`${name} added to cart!`);
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
}

function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! This is a demo checkout.");
    cart = [];
    saveCart();
}

// ===== EmailJS Functionality =====
(function(){
    // EmailJS Public Key (User ID)
    emailjs.init("at44eDEpy73Drrr9");
})();

function sendEmail(event){
    event.preventDefault()
    <form id="contact-form" onsubmit="sendEmail(event)">
    // EmailJS Service ID & Template ID
    emailjs.sendForm('service_9glsnqn, template_rsgdy3i, form)
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
    }, (error) => {
        alert("Failed to send message. Please try again.", error);
    });
}

// Initialize cart display
updateCartDisplay();

