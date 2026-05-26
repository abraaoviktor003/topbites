async function loadRestaurant(tipo) {
  try {
    const res = await fetch("../data/restaurants.json");
    const restaurantes = await res.json();
    const r = restaurantes[tipo];

    if (!r) {
      console.error("Restaurante não encontrado:", tipo);
      return;
    }

    // Atualiza título e descrição
    document.querySelector(".restaurant-title").textContent = r.title;
    document.querySelector(".restaurant-description").textContent =
      r.description;

    // Atualiza imagem principal do restaurante
    const img = document.querySelector(".restaurant-image");
    if (img) img.src = "../" + r.image;

    // Renderiza menu como cards
    const menuBox = document.querySelector(".restaurant-menu");
    if (menuBox) {
      menuBox.innerHTML = r.menu
        .map(
          (item, index) => `
        <div class="menu-card" data-index="${index}">
          <img src="../${item.image}" alt="${item.item}">
          <div class="menu-info">
            <h3>${item.item}</h3>
            <p>${item.description}</p>
            <span class="price">${item.price}</span>
          </div>
        </div>
      `,
        )
        .join("");

      // 🔥 MODIFICAÇÃO: adiciona evento de clique em cada card
      document.querySelectorAll(".menu-card").forEach((card) => {
        card.addEventListener("click", () => {
          const index = card.getAttribute("data-index");
          const prato = r.menu[index];
          handleDishClick(prato);
        });
      });
    }

    // Horários
    const hoursBox = document.querySelector(".restaurant-hours");
    if (hoursBox) hoursBox.textContent = "Horários: " + r.hours;

    // Localização
    const locationBox = document.querySelector(".restaurant-location");
    if (locationBox) locationBox.textContent = "Endereço: " + r.location;

    // Contato
    const contactBox = document.querySelector(".restaurant-contact");
    if (contactBox) {
      contactBox.innerHTML = `
        Tel: ${r.contact.phone} <br>
        Email: ${r.contact.email}
      `;
    }

    // Avaliação
    const ratingBox = document.querySelector(".restaurant-rating");
    if (ratingBox) ratingBox.textContent = "Nota: " + r.rating + " ★";

    // Delivery
    const deliveryBox = document.querySelector(".restaurant-delivery");
    if (deliveryBox) {
      deliveryBox.textContent = r.delivery
        ? "Delivery disponível"
        : "Somente presencial";
    }
  } catch (error) {
    console.error("Erro ao carregar restaurante:", error);
  }
}

// 🔥 NOVA FUNÇÃO: chamada ao clicar em um prato
let cart = [];

function handleDishClick(prato) {
  addToCart(prato);
}

// Adiciona prato ao carrinho
function addToCart(prato) {
  const existing = cart.find((item) => item.item === prato.item);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...prato, quantity: 1 });
  }
  renderCart();
}

// Renderiza carrinho
function renderCart() {
  const cartItemsBox = document.querySelector(".cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!cartItemsBox) return;

  if (cart.length === 0) {
    cartItemsBox.innerHTML = "<p>Carrinho vazio</p>";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    return;
  }

  cartItemsBox.innerHTML = cart
    .map(
      (item, index) => `
    <div class="cart-item">
      <span>${item.item} (${item.quantity})</span>
      <button onclick="updateQuantity(${index}, 1)">+1</button>
      <button onclick="updateQuantity(${index}, -1)">-1</button>
      <button onclick="removeFromCart(${index})">Remover</button>
    </div>
  `,
    )
    .join("");

  if (checkoutBtn) {
    checkoutBtn.style.display = "block";

    // 🔥 NOVA FUNÇÃO: redireciona ao checkout com carrinho salvo
    checkoutBtn.onclick = () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "../checkout/checkout.html";
    };
  }
}

// Atualiza quantidade
function updateQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Função para transição ao sair da página
function openRestaurant(page) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = page;
  }, 600); // tempo igual ao CSS
}

// Executa fade-in SEM sobrescrever outras funções
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});
