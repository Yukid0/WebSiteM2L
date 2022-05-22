document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAllp')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

const addBtn = document.getElementById('add-cours-btn');

addBtn.onclick = function () {       // Action du bouton Ajouter // 
    console.log('toto');
    const dateInput = document.querySelector('#date-input').value;
    const debutInput = document.querySelector('#heuredebut-input').value;
    const finInput = document.querySelector('#heurefin-input').value;
    const id_prof = document.querySelector('#listeprof').value;
    const groupe = document.querySelector('#listegroupe').value;






    fetch('http://localhost:5000/insertC', { // Envoie les données au backend // 
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ date: dateInput, heuredebut: debutInput, heurefin: finInput, id_prof: id_prof, groupe: groupe })


    })
        .then(response => response.json());


};

function loadHTMLTable(data) {
    const listeprof = document.querySelector('#listeprof');

    let tableHtml = "";

    data.forEach(function ({ id, nom, prenom, date_added }) {   // Retourne les données s'il y en a //


        tableHtml += `<option value="${id}">${nom + ' ' + prenom}</option>`;

    });

    listeprof.innerHTML = tableHtml;

}

