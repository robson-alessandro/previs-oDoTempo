
// faz o importe de uma lista de objetos que contem a temperatura max, min e a imagem que ira ser colocada em cada data. 
import {previsoes} from "./previsoes.js";

// sao decalarados os elementos html que seram usado no programa.
const datas = document.querySelectorAll('.dia-data')
const listaComDias = document.querySelectorAll('.dia-temperatura')
const listaImagem = document.querySelectorAll('.imagem-previsao')
const dia1Bot = document.querySelector('.card_dia1')


//essa função usa a ferramenta Date para criar as datas que sera usado no site e as coloca no site.
function colocarDatas(){
    let data = new Date()
    let dia = data.getDate()
    let pulardia = 0
    

    datas.forEach((elemento) => {
        elemento.textContent = `${ dia + pulardia}` 
        pulardia += 1
    });
}

// essa função coloca no site as informações de temperatura e a imagem da previsão usando como base a lista que foi importada do arquivo previsoes.
function colocarTemperatura(){
    let posicao = 0
    //faz a troca da imagem da previsão de cada dia da semana usando um forEach para percorrer um lista com as imagens de cada dia.
    listaImagem.forEach((elemento) =>{
        let imagem = previsoes[posicao]
        elemento.setAttribute('src',`/imagens/${imagem.imagemPrevisao}.png` )
        posicao += 1 
    })

    //faz a troca da temperatura max e min da previsão de cada dia da semana usando um forEach para percorrer um lista com as temperaturas de cada dia.
    posicao = 0
    listaComDias.forEach((elemento) =>{
        let previsaoDoDia = previsoes[posicao]
        elemento.innerHTML = `temperatura max ${previsaoDoDia.tempMax}<br>min  ${previsaoDoDia.temMin} `
        posicao += 1
    }
)}

// faz o chamado de cada função para o prenchimento do site com temperatura, data e imagem de cada dia.
colocarTemperatura()
colocarDatas()

dia1Bot.addEventListener("click",() =>{
    const valor = document.getElementById('data_dia1').innerHTML
    document.getElementById('data_principal').innerHTML = valor
})
