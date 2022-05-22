
const addBtn = document.getElementById('login-btn');

addBtn.onclick = function () {       // Action du bouton Ajouter // 

    const Login = document.querySelector('#login-input').value;
    const Password = document.querySelector('#password-input').value;

    console.log(Login, Password);




    fetch('http://localhost:5000/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ Login, Password })


    })
    .then(response => response.json())



};



