document.addEventListener('DOMContentLoaded', () => {
    const shopContent = document.querySelector('.shop-content');
    if (!shopContent) return;

  
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

   
    function renderCarrinho() {
        shopContent.innerHTML = '';

        if (carrinho.length === 0) {
            shopContent.innerHTML = '<p>Seu carrinho está vazio.</p>';
            return;
        }

        carrinho.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('row');

            div.innerHTML = `
                <h3>${item.nome}</h3>
                <p>Preço: ${item.preco}</p>
                <p>Adicionais: ${item.adicionais && item.adicionais.length > 0 ? item.adicionais.join(', ') : 'Nenhum'}</p>
                <p>Observações: ${item.observacoes || 'Nenhuma'}</p>
                <div class="in-text">
                    <button class="btn-plus" data-index="${index}">+</button>
                    <button class="btn-minus" data-index="${index}">-</button>
                </div>
            `;

            shopContent.appendChild(div);
        });
    }

    
    shopContent.addEventListener('click', e => {
        if (e.target.classList.contains('btn-plus')) {
            const idx = e.target.getAttribute('data-index');
            const itemDuplicado = JSON.parse(JSON.stringify(carrinho[idx])); 
            carrinho.push(itemDuplicado);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderCarrinho();
        }

        if (e.target.classList.contains('btn-minus')) {
            const idx = e.target.getAttribute('data-index');
            carrinho.splice(idx, 1);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            renderCarrinho();
        }
    });

    
    renderCarrinho();
});
