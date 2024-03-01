import data from '../data.json' assert {'type': 'json'}   

const btn = document.querySelector('#buttonLogin')
btn.addEventListener('click', (event)=>{
    event.preventDefault();

    let user = document.getElementById('userInput').value
    let password = Number(document.getElementById('passwordInput').value)

    console.log(password)

    const login = data.find((object)=>object.usuario === user && object.senha === password)

    if(login){
        window.location.href = '../../index.html'
    }else{
        alert('Usuário não encontrado, tente novamente!')
    }
})