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

    // Atualiza imagem
    const img = document.querySelector(".restaurant-image");
    if (img) img.src = "../" + r.image;

    // Renderiza menu
    const menuBox = document.querySelector(".restaurant-menu");
    if (menuBox) {
      menuBox.innerHTML = r.menu
        .map((item) => `<li>${item.item} - ${item.price}</li>`)
        .join("");
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
