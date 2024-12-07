const products = [
    { id: 1, name: "Classic Burger", price: 12.99 },
    { id: 2, name: "Hamburger", price: 11.99 },
    { id: 3, name: "Cheeseburger", price: 11.99 },
    { id: 4, name: "Veggie Burger", price: 10.99 },
    { id: 5, name: "Klassische Pommes", price: 4.99 },
    { id: 6, name: "Süßkartoffelpommes", price: 6.99 },
    { id: 7, name: "Curly Fries", price: 5.99 },
    { id: 8, name: "Chili Cheese Fries", price: 5.99 },
    { id: 9, name: "Hausgemachte BBQ-Sauce", price: 1.99 },
    { id: 10, name: "Käse-Dip", price: 2.49 },
    { id: 11, name: "Aioli", price: 1.79 },
    { id: 12, name: "Sriracha Mayo", price: 1.89 },
    { id: 13, name: "Hausgemachte Limonade", price: 2.99 },
    { id: 14, name: "Cola", price: 2.49 },
    { id: 15, name: "Eistee", price: 2.79 },
    { id: 16, name: "Bier", price: 3.99 }
];

let cart = [];
let deliveryCost = 0;

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        showMessage(`${product.name} wurde zum Warenkorb hinzugefügt.`);
    }
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        const productName = cart[productIndex].name;
        cart.splice(productIndex, 1);
        showMessage(`${productName} wurde aus dem Warenkorb entfernt.`);
        updateCart();
    }
}

function decreaseQuantity(productId) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
            showMessage(`Die Menge von ${existingProduct.name} wurde verringert.`);
        } else {
            removeFromCart(productId);
        }
        updateCart();
    }
}

function updateDeliveryOption() {
    const selectedOption = document.querySelector('input[name="delivery-option"]:checked').value;
    if (selectedOption === 'delivery') {
        deliveryCost = 5;
        document.getElementById('delivery-fields').style.display = 'block';
        showMessage("Lieferoption ausgewählt. Bitte füllen Sie die Lieferdetails aus.");
    } else {
        deliveryCost = 0;
        document.getElementById('delivery-fields').style.display = 'none';
        showMessage("Abholoption ausgewählt. Keine Lieferdetails erforderlich.");
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="product-name">${item.name}</div>
            <div class="product-controls">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span class="product-quantity">${item.quantity}</span>
                <button onclick="addToCart(${item.id})">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="product-price">${(item.price * item.quantity).toFixed(2)} €</div>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    const totalPriceElement = document.getElementById('total-price');
    totalPrice += deliveryCost;
    totalPriceElement.innerHTML = `
        <span class="price-label">Gesamtpreis:</span><br>
        <span class="price-amount">${totalPrice.toFixed(2)} €</span>
    `;
}

function showMessage(message) {
    const messageContainer = document.getElementById('cart-message');
    messageContainer.innerHTML = message;
    messageContainer.style.display = 'block';

    messageContainer.onclick = function() {
        messageContainer.style.display = 'none';
    };
}

function checkout() {
    if (cart.length === 0) {
        showMessage("Ihr Warenkorb ist leer!");
        return;
    }

    const selectedOption = document.querySelector('input[name="delivery-option"]:checked').value;

    if (selectedOption === 'delivery') {
        const name = document.getElementById('name').value.trim();
        const street = document.getElementById('street').value.trim();
        const postalCode = document.getElementById('postal-code').value.trim();
        const city = document.getElementById('city').value.trim();

        if (!name || !street || !postalCode || !city) {
            showMessage("Bitte füllen Sie alle erforderlichen Felder aus: Name, Straße, Postleitzahl und Stadt.");
            return;
        }

        showMessage("Danke für Ihre Bestellung! Ihre Lieferung wird in 30 Minuten eintreffen.");
    } else {
        showMessage("Danke für Ihre Bestellung! Die Bestellung kann in 30 Minuten abgeholt werden.");
    }

    cart = [];
    updateCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);
        const product = products.find(item => item.name === name && item.price === price);
        if (product) {
            addToCart(product.id);
        }
    });
});

window.scrollTo({
    top: 0,
    behavior: 'smooth'
});

document.addEventListener("DOMContentLoaded", function() {
    const cartButton = document.getElementById('cart-button');

    function toggleCartButtonVisibility() {
        if (window.innerWidth < 1180) {
            cartButton.style.display = 'block';
        } else {
            cartButton.style.display = 'none';
        }
    }

    toggleCartButtonVisibility();
    window.addEventListener('resize', toggleCartButtonVisibility);

    cartButton.addEventListener('click', function(event) {
        event.preventDefault();
        const basket = document.getElementById('cart');
        if (basket) {
            basket.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
