const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let allProducts = [];

function addToCart(name, amount) {
    let item = allProducts.find(product => product.name === name);

    if (item) {
        quantity++;
    } else {
        allProducts.push({
            id: Date.now(),
            name: name,
            amount: amount,
            quantity: 1,
        });
    }

    RenderCart();
}

function RenderCart() {
    cartItems.innerHTML = "";
    if (allProducts.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart">Cart is empty</div>`;
        cartTotal.innerHTML = `<h3>Total: $0.00</h3>`;
        return;
    }

    let totalPrice = 0;

    allProducts.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        const productName = document.createElement("h3");
        productName.innerHTML = item.name;

        const totalItemDiv = document.createElement("div");
        totalItemDiv.classList.add("quantity-controls");

        const minusButton = document.createElement("button");
        minusButton.innerHTML = "-";
        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                allProducts.splice(index, 1); // Remove the item if there is 1 product left in allProducts
            }
            RenderCart();
        });

        const quantity = document.createElement("span");
        quantity.innerHTML = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.addEventListener("click", () => {
            item.quantity++;
            RenderCart();
        });

        const price = document.createElement("spna");
        price.innerHTML = `$${(item.quantity * item.amount).toFixed(2)}`;
        totalPrice += item.quantity * item.amount;

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.addEventListener("click", () => {
            allProducts = allProducts.filter(p => p.name !== item.name);
            RenderCart();
        });

        totalItemDiv.appendChild(minusButton);
        totalItemDiv.appendChild(quantity);
        totalItemDiv.appendChild(plusButton);
        totalItemDiv.appendChild(price);
        totalItemDiv.appendChild(removeButton);

        div.appendChild(productName);
        div.appendChild(totalItemDiv);

        cartItems.appendChild(div);
        console.log(totalPrice);

        cartTotal.innerHTML = `Total: $${totalPrice}`;
    });
}