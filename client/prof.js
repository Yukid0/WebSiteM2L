document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAllP')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});

document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});



const updateBtn = document.querySelector('#update-row-btn');


function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function () {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
};




function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {                            // Retourne "Aucun Résultat" si il n'ya a pas de donnée //
        table.innerHTML = "<tr><td class='no-data' colspan='5'>Aucun résultat</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ id, nom, prenom, date_added }) {   // Retourne les données s'il y en a //

        tableHtml += "<tr class>";
        tableHtml += `<td>${nom}</td>`;
        tableHtml += `<td>${prenom}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Supprimer</td>`;
        tableHtml += `<td><button class="edit-row-btn"  data-id=${id}>Modifier</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;

}