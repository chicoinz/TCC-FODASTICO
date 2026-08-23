const card_resumido = document.getElementById('Card-resumido');

if (card_resumido) {
    const cards = card_resumido.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(evento) {
            // Cliques no formulário de compra não devem abrir o detalhe.
            if (evento.target.closest('form')) return;

            const produtoId = this.getAttribute('data-id');
            if (produtoId) {
                window.location.href = `/produto/${produtoId}`;
            }
        });
    });
}
