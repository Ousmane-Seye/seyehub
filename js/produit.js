const CART_STORAGE_KEY = "cart";

function loadCart() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
        return [];
    }

    try {
        const parsedCart = JSON.parse(savedCart);
        if (!Array.isArray(parsedCart)) {
            throw new Error("Le contenu du panier enregistré n'est pas une liste.");
        }

        return parsedCart.filter(item =>
            item &&
            typeof item.name === "string" &&
            typeof item.image === "string" &&
            Number.isFinite(Number(item.price)) &&
            Number(item.price) >= 0
        );
    } catch (error) {
        console.error("Impossible de lire le panier enregistré.", error);
        return [];
    }
}

let cart = loadCart();

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(price) {
    return `${Number(price).toLocaleString("fr-FR")} frc`;
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    if (!cartContainer || !cartTotal) {
        return;
    }

    cartContainer.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "cart-empty";
        emptyMessage.textContent = "Votre panier est vide.";
        cartContainer.appendChild(emptyMessage);
    }

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("span");
        name.className = "cart-item-name";
        name.textContent = item.name;

        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = formatPrice(item.price);

        const removeButton = document.createElement("button");
        removeButton.className = "cart-remove-button";
        removeButton.type = "button";
        removeButton.dataset.cartIndex = String(index);
        removeButton.textContent = "Retirer";
        removeButton.setAttribute("aria-label", `Retirer ${item.name} du panier`);

        details.append(name, price);
        listItem.append(image, details, removeButton);
        cartContainer.appendChild(listItem);
    });

    cartTotal.textContent = formatPrice(total);
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".product-item");
        const nameElement = product && product.querySelector(".product-title");
        const priceElement = product && product.querySelector(".product-price");
        const imageElement = product && product.querySelector(".product-image img");

        if (!nameElement || !priceElement || !imageElement) {
            console.error("Impossible d'ajouter ce produit : ses informations sont incomplètes.");
            return;
        }

        const name = nameElement.textContent.replace(/\s+/g, " ").trim();
        const price = Number(priceElement.textContent.replace(/[^\d]/g, ""));
        const image = imageElement.getAttribute("src");

        if (!name || !Number.isFinite(price) || !image) {
            console.error("Impossible d'ajouter ce produit : son nom, son prix ou son image est invalide.");
            return;
        }

        cart.push({ name, price, image });
        saveCart();
        renderCart();
        alert("Produit ajouté au panier !");
    });
});

const cartContainer = document.getElementById("cart-items");
if (cartContainer) {
    cartContainer.addEventListener("click", event => {
        const removeButton = event.target.closest("[data-cart-index]");
        if (!removeButton) {
            return;
        }

        const index = Number(removeButton.dataset.cartIndex);
        if (!Number.isInteger(index) || index < 0 || index >= cart.length) {
            return;
        }

        cart.splice(index, 1);
        saveCart();
        renderCart();
    });

    renderCart();
}
