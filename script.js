document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.main-nav');
    
    // 1. Funcionalidade do Menu Hamburger
    if (hamburger && nav) {
        // Alterna a classe 'is-open' (que deve estar definida no seu CSS)
        hamburger.addEventListener('click', () => {
            // ACESSIBILIDADE: Adicionar/remover aria-expanded (para leitores de tela)
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('is-open');
        });

        // Fecha o menu se um link for clicado (melhora a UX mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                hamburger.setAttribute('aria-expanded', 'false'); // Atualiza o aria-expanded
            });
        });
    }
    
    // 2. Chama a função de validação de formulário (CORRETA)
    setupFormValidation();
});


// 3. DEFINIÇÃO DA FUNÇÃO DE VALIDAÇÃO (ÚNICA VEZ)
function setupFormValidation() {
    // Aponta para o formulário no cadastro.html
    const form = document.querySelector('.form-cadastro'); 

    if (!form) return; // Sai se não estiver na página de cadastro

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão para rodar a validação
        let isValid = true;
        
        // Remove mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        // Validação de TODOS os campos obrigatórios
        form.querySelectorAll('input[required], select[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                displayError(input, 'Este campo é obrigatório.');
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                 isValid = false;
                 displayError(input, 'Insira um e-mail válido.');
            }
        });
        
        // Se for válido, simula o envio e dá um feedback
        if (isValid) {
            alert('Cadastro enviado com sucesso! Agradecemos seu interesse.');
            // Aqui seria onde você enviaria os dados (fetch/XMLHttpRequest)
            form.reset(); 
        }
    });
}

// Função auxiliar para exibir a mensagem de erro
function displayError(inputElement, message) {
    // Cria um elemento <span> para a mensagem
    const error = document.createElement('span');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.85em';
    error.textContent = message;

    // Insere a mensagem logo após o campo
    inputElement.parentNode.insertBefore(error, inputElement.nextSibling);
    
    // Adiciona uma classe de erro para estilização CSS (opcional)
    inputElement.classList.add('input-error');
    // ACESSIBILIDADE: Move o foco para o campo com erro
    inputElement.focus();
}

// Função auxiliar para validação básica de email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}