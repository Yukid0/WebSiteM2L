







const addBtn = document.getElementById('add-name-btn');

addBtn.onclick = function () {       // Action du bouton Ajouter // 
    console.log('toto');
    const nameInput = document.querySelector('#name-input');
    const ageInput  = document.querySelector('#age-input');
    
    const name = nameInput.value;
    const age = ageInput.value;
   
    nameInput.value = "";
    ageInput.value  = "";
    

    fetch('http://localhost:5000/insertA', { // Envoie les données au backend // 
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name, age : age})
        
        
    })
    .then(response => response.json());
    
    
};



