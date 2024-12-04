// Retrieve cart data from localStorage or initialize an empty array
let cartData = JSON.parse(localStorage.getItem("cart")) || [];

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = ""; // Clear the cart before rendering

    let total = 0;
    cartData.forEach((item, index) => {
        const price = parseFloat(item.price) || 0; // Ensure price is a valid number
        const quantity = parseInt(item.quantity) || 1; // Ensure quantity is a valid number

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.name}</span>
            <span>$${price.toFixed(2)}</span>
            <input type="number" class="quantity-input" min="1" value="${quantity}" 
                   onchange="updateQuantity(${index}, this.value)">
            <span>Subtotal: $${(price * quantity).toFixed(2)}</span>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(li);
        total += price * quantity;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    saveCart();
}

// Function to update the quantity of an item
function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity); // Ensure the new quantity is a valid number
    if (!isNaN(quantity) && quantity > 0) {
        cartData[index].quantity = quantity;
        renderCart();
    } else {
        alert("Quantity must be a positive number.");
        renderCart(); // Re-render to reset invalid changes
    }
}

// Function to add a new item to the cart
function addItem(event) {
    event.preventDefault(); // Prevent form submission

    const itemName = document.getElementById("item-name").value.trim();
    const itemPrice = parseFloat(document.getElementById("item-price").value);
    const itemQuantity = parseInt(document.getElementById("item-quantity").value) || 1;

    if (itemName && !isNaN(itemPrice) && itemPrice > 0 && itemQuantity > 0) {
        cartData.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
        renderCart();
        document.getElementById("add-item-form").reset(); // Clear the form
    } else {
        alert("Please enter a valid name, price, and quantity.");
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cartData.splice(index, 1); // Remove item at the specified index
    renderCart();
}

// Save cart data to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartData));
}

// Navigate to the checkout page
function goToCheckout() {
    if (cartData.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
    } else {
        window.location.href = "checkout.html";
    }
}

// Initialize the page by rendering the cart
renderCart();

// Add event listener for the Add Item form
document.getElementById("add-item-form").addEventListener("submit", addItem);
