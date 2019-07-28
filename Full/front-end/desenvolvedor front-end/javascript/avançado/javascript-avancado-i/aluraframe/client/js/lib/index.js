//Arquivo de revisão do JavaScript

var camposForm = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tr = document.createElement('tr');

document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();

    camposForm.forEach(function(campo) {
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    })

    var tdVolume = document.createElement('td');
    tdVolume.textContent = camposForm[1].value * camposForm[2].value;
    tr.appendChild(tdVolume);
    document.querySelector('table tbody').appendChild(tr);

    camposForm[0].value = '';
    camposForm[1].value = 1;
    camposForm[2].value = 0;

    camposForm[0].focus();

})