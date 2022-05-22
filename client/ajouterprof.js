







const addBtn = document.getElementById('add-prof-btn');

addBtn.onclick = function () {       // Action du bouton Ajouter // 
    
    const nomInput = document.querySelector('#nom-input');
    const prenomInput  = document.querySelector('#prenom-input');
    
    const nom = nomInput.value;
    const prenom = prenomInput.value;
   
    nomInput.value = "";
    prenomInput.value  = "";
    console.log(prenomInput.value);

    fetch('http://localhost:5000/insertP', { // Envoie les données au backend // 
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ nom : nom, prenom : prenom})
        
        
    })
    .then(response => response.json())
    
    
    
};



