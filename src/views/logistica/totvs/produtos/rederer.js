const { ipcRenderer } = require("electron");

ipcRenderer.send('produtos')
ipcRenderer.on('produtos-resposta', (e, results)=>{
    document.getElementsByClassName('counter-value')[0].innerHTML = results[0][0].contagem

    //Insere linhas
    for(let i = 0; i <results[1].length; i++){
        document.getElementsByTagName('tbody')[0].insertRow().classList.add(`tabela`);
    }

    //Insere colunas de cada linha
    for(let i = 0; i < document.getElementsByClassName(`tabela`).length; i++){
        document.getElementsByClassName(`tabela`)[i].appendChild(document.createElement('td'));
        document.getElementsByClassName(`tabela`)[i].appendChild(document.createElement('td'));
    }

    //Insere dados do banco em cada td
    for (var i = 0; i < document.getElementById('myTable').rows.length; i++) {
       let primeiraColuna = document.getElementsByClassName(`tabela`)[i].cells[0];
       let segundaColuna = document.getElementsByClassName(`tabela`)[i].cells[1];
       primeiraColuna.innerHTML = results[1][i].cod
       segundaColuna.innerHTML = results[1][i].descri
    }
})

document.getElementById("procura0").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        ipcRenderer.send('produtos', document.getElementById("procura0").value)
    }
});