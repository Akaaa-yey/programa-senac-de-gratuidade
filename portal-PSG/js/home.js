// Seleciona todos os botões do FAQ
const botoesFAQ = document.querySelectorAll('.card-faq');

// Para cada botão, adicionamos um evento de clique
botoesFAQ.forEach((botao) => {
  botao.addEventListener('click', () => {
    // Exemplo simples: mostra um alerta ao clicar no botão
    alert(`Você clicou em: "${botao.innerText}"`);
  });
});