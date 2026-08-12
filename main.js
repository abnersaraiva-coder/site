(function() {
    "use strict";

    // ===== REFERÊNCIAS =====
    const body = document.body;
    const sizeButtons = document.querySelectorAll('.size-btn');
    const currentLabel = document.getElementById('current-size-label');

    // Mapeamento dos tamanhos para exibição
    const sizeNames = {
        small: 'Pequena',
        medium: 'Média',
        large: 'Grande',
        xlarge: 'Muito grande'
    };

    // ===== FUNÇÃO PARA APLICAR TAMANHO =====
    function setSize(size) {
        // Remove todas as classes de tamanho
        body.classList.remove('size-small', 'size-medium', 'size-large', 'size-xlarge');

        // Aplica a classe correspondente (se for um tamanho válido)
        if (size && sizeNames[size]) {
            body.classList.add('size-' + size);
            // Atualiza o rótulo
            if (currentLabel) {
                currentLabel.textContent = sizeNames[size];
            }
        } else {
            // fallback: tamanho médio
            body.classList.add('size-medium');
            if (currentLabel) {
                currentLabel.textContent = sizeNames.medium;
            }
        }

        // Atualiza o estado ARIA dos botões
        sizeButtons.forEach(btn => {
            const btnSize = btn.getAttribute('data-size');
            const isPressed = (btnSize === size);
            btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
        });
    }

    // ===== EVENTO DE CLICK NOS BOTÕES =====
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const size = this.getAttribute('data-size');
            if (size && sizeNames[size]) {
                setSize(size);
            }
        });

        // Suporte para teclado: Enter e Espaço já funcionam nativamente em <button>
        // mas garantimos que o foco seja visível (já temos :focus-visible)
    });

    // ===== DEFINE O TAMANHO INICIAL (MÉDIO) =====
    // Garante que o estado inicial seja 'medium'
    setSize('medium');

    // ===== NAVEGAÇÃO POR TECLADO MELHORADA NOS CARDS =====
    // Os cards já possuem tabindex="0", mas permitimos que Enter ou Espaço
    // disparem um pequeno feedback (opcional) – mas mantemos sem ação extra
    // apenas para demonstrar que são focáveis.
    const cards = document.querySelectorAll('.principio-card');
    cards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Pequeno feedback visual: um alerta silencioso ou apenas foco
                // Neste caso, apenas mostramos um breve destaque via estilo
                this.style.outline = '3px solid #ffb347';
                setTimeout(() => {
                    this.style.outline = '';
                }, 400);
            }
        });
    });

    console.log('✅ Acessibilidade ativa: tamanho de texto, navegação por teclado e legendas simbólicas.');
})();