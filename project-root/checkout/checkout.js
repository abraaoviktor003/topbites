document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("checkout-item");
  const finalizarBtn = document.getElementById("finalizar-btn");

  // 🔥 Lê carrinho salvo no localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>Nenhum item no carrinho.</p>";
    if (finalizarBtn) finalizarBtn.style.display = "none";
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart
    .map((item) => {
      const price = parseFloat(item.price.replace("R$", "").trim());
      const totalItem = price * item.quantity;
      subtotal += totalItem;

      return `
      <div class="checkout-card">
        <img src="../${item.image}" alt="${item.item}">
        <div class="checkout-info">
          <h2>${item.item}</h2>
          <p>${item.description}</p>
          <span class="price">Qtd: ${item.quantity} | Total: R$ ${totalItem.toFixed(2)}</span>
        </div>
      </div>
    `;
    })
    .join("");

  // 🔧 Cálculos inteligentes
  const frete = 12; // frete fixo de exemplo
  const taxaServico = subtotal * 0.05; // 5% taxa de serviço
  const imposto = subtotal * 0.12; // 12% imposto moderado
  const total = subtotal + frete + taxaServico + imposto;

  container.innerHTML += `
    <div class="checkout-summary">
      <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
      <p>Frete: R$ ${frete.toFixed(2)}</p>
      <p>Taxa de Serviço: R$ ${taxaServico.toFixed(2)}</p>
      <p>Impostos: R$ ${imposto.toFixed(2)}</p>
      <h3>Total Final: R$ ${total.toFixed(2)}</h3>
    </div>
  `;

  // 🔥 Evento do botão finalizar
  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      alert("Pedido finalizado! Total: R$ " + total.toFixed(2));
      localStorage.removeItem("cart"); // limpa carrinho
      window.location.href = "../restaurants/Italian.html"; // exemplo: volta para restaurante
    });
  }
});
