// Lê parâmetros da URL
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    item: params.get("item"),
    price: params.get("price"),
    image: params.get("image"),
    desc: params.get("desc"),
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const prato = getParams();
  const container = document.getElementById("checkout-item");

  if (prato.item) {
    container.innerHTML = `
      <div class="checkout-card">
        <img src="../${prato.image}" alt="${prato.item}">
        <div class="checkout-info">
          <h2>${prato.item}</h2>
          <p>${prato.desc}</p>
          <span class="price">${prato.price}</span>
        </div>
      </div>
    `;
  }

  document.getElementById("finalizar-btn").addEventListener("click", () => {
    alert("Pedido finalizado: " + prato.item);
  });
});
