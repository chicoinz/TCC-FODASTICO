const card_resumido = document.getElementById('Card-resumido');

if (card_resumido) {
    const cards = card_resumido.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const animalId = this.getAttribute('data-id');
            if (animalId) {
                window.location.href = `/produto/${animalId}`;
            }
        });
    });
}