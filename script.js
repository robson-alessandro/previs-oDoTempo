const datas = document.querySelectorAll('.dia-data')
const listaTemperaturas = document.querySelectorAll('.dia-temperatura')


function colocarDatas(){
    let data = new Date()
    dia = data.getDate()
    pulardia = 0

    datas.forEach((elemento) => {
        elemento.textContent = `${ dia + pulardia}` 
        pulardia += 1
    });
}

function colocarTemperatura(){
    listaTemperaturas.forEach((elemento) =>{
        elemento.innerHTML = `<p class="dia-temperatura">temperatura max 32 <br>min 25</p> `
    }
)
}

colocarTemperatura()
colocarDatas()