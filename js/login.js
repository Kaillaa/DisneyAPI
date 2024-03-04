import data from '../data.json';
const btn = document.querySelector('#buttonLogin')

// Adiciona um evento para o clique no botão de login
btn.addEventListener('click', (event)=>{
    // Previne o comportamento padrão de enviar o formulário
    event.preventDefault();

    // Obtém o nome de usuário e a senha inseridos pelo usuário
    let user = document.getElementById('userInput').value
    let password = Number(document.getElementById('passwordInput').value)

    // Procura pelo usuário nos dados importados
    const login = data.find((object)=>object.usuario === user && object.senha === password)

    // Se o login for encontrado, redireciona para a página inicial
    if(login){
        window.location.href = '../../index.html'
    }else{
        // Caso contrário, exibe um alerta de usuário não encontrado
        alert('Usuário não encontrado, tente novamente!')
    }
})
