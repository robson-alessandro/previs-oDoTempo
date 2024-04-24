// faz o importe de uma lista de objetos que contem a temperatura max, min e a imagem que ira ser colocada em cada data. 
import {previsoes} from "./previsoes.js";

// sao decalarados os elementos html que seram usado no programa.
const datas = document.querySelectorAll('.dia_data')
const listaComDias = document.querySelectorAll('.dia_temperatura')
const listaImagem = document.querySelectorAll('.imagem_previsao')
const dia1Bot = document.querySelector('.card_dia1')
const dia2Bot = document.querySelector('.card_dia2')
const dia3Bot = document.querySelector('.card_dia3')
const dia4Bot = document.querySelector('.card_dia4')
const dia5Bot = document.querySelector('.card_dia5')
const dia6Bot = document.querySelector('.card_dia6')
const dia7Bot = document.querySelector('.card_dia7')


// fução que coloca as informções no card principal
function colocarDadosCardPrincipal(dia){
    let data = document.getElementById(`data_dia${dia}`).innerHTML
    document.getElementById('data_principal').innerHTML = data

    let stringTempMaxMin= document.getElementById(`dia${dia}_temperatura`).innerHTML
    const dividirStringTemperatura = stringTempMaxMin.split(' ')
    const tempMax =dividirStringTemperatura[2]
    const tempMin =dividirStringTemperatura[5]
    document.getElementById('temperatura_max_principal').innerHTML =`max: ${tempMax} ` 
    document.getElementById('temperatura_min_principal').innerHTML = `min: ${tempMin} `
    
    const imagemPrevisaoDia = document.querySelector(`.img${dia}`)
    const img = imagemPrevisaoDia.getAttribute('src')
    const imagemPrincipal = document.querySelector('.img_principal')
    imagemPrincipal.setAttribute('src',img)
}

// todos os card com as previsões que estão servindo como botão, ao clicar em dia no site é colocado as informções desse dia no card principal
dia1Bot.addEventListener("click",() =>{
    const dia = 1
    colocarDadosCardPrincipal(dia)
})

dia2Bot.addEventListener("click",() =>{
    const dia = 2
    colocarDadosCardPrincipal(dia)
})

dia3Bot.addEventListener("click",() =>{
    const dia = 3
    colocarDadosCardPrincipal(dia)
})

dia4Bot.addEventListener("click",() =>{
    const dia = 4
    colocarDadosCardPrincipal(dia)
})

dia5Bot.addEventListener("click",() =>{
    const dia = 5
    colocarDadosCardPrincipal(dia)
})

dia6Bot.addEventListener("click",() =>{
    const dia = 6
    colocarDadosCardPrincipal(dia)
})

dia7Bot.addEventListener("click",() =>{
    const dia = 7
    colocarDadosCardPrincipal(dia)
})

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
        elemento.innerHTML = `temperatura max ${previsaoDoDia.tempMax} <br>min  ${previsaoDoDia.temMin} `
        posicao += 1
    }
)}

// faz o chamado de cada função para o prenchimento do site com temperatura, data e imagem de cada dia.
colocarTemperatura()
colocarDatas()