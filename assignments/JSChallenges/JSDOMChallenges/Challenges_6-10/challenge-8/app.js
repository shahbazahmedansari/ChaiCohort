const cartItems = document.getElementById("cart-items");
const totalAmountContainer = document.getElementById("cart-total");

const allProducts = [];

function addToCart(product, amount) {
    let totalAmount = amount;

    let quantity = 1;
    cartItems.innerHTML = "";
    const parentNewProduct = document.createElement("div");
    console.log(product);
    console.log(products);
    const clickedProduct = products.find(p => p.title === product);
    console.log(clickedProduct.title);

    const childNewProduct = document.createElement("div");
    childNewProduct.classList.add("cart-item");
    const productTitle = document.createElement("h3");
    productTitle.innerHTML = clickedProduct.title;

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-controls");

    const quantityPara = document.createElement("p");
    quantityPara.innerHTML = quantity;

    const amountContainer = document.createElement("p");
    amountContainer.innerHTML = `$${amount}`;

    const minusButton = document.createElement("button");
    minusButton.innerHTML = "-";
    minusButton.addEventListener("click", () => {
        if (quantity >= 1) {
            quantity = quantity - 1;
            quantityPara.innerHTML = quantity;
            totalAmount -= amount;
            totalAmount = parseFloat(totalAmount.toFixed(2));
            amountContainer.innerHTML = `$${totalAmount}`;
        } else if (quantity === 0) {
            childNewProduct.remove();
        }
    });

    const plusButton = document.createElement("button");
    plusButton.innerHTML = "+";
    plusButton.addEventListener("click", () => {
        quantity = quantity + 1;
        quantityPara.innerHTML = quantity;
        totalAmount += amount;
        amountContainer.innerHTML = `$${totalAmount}`;
    });


    const removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", () => {
        childNewProduct.remove();
    });

    quantityContainer.appendChild(minusButton);
    quantityContainer.appendChild(quantityPara);
    quantityContainer.appendChild(plusButton);
    quantityContainer.appendChild(amountContainer);
    quantityContainer.appendChild(removeButton);


    childNewProduct.appendChild(productTitle);
    childNewProduct.appendChild(quantityContainer);
    parentNewProduct.appendChild(childNewProduct);
    cartItems.appendChild(parentNewProduct);
}



