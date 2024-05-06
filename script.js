// sao decalarados os elementos html que seram usado no programa.
const tempCardPrincipal = document.querySelector('#temperatura_max_principal')
const sectionCardDias = document.querySelector('.card_dias')
const botBuscar = document.querySelector('.botao_buscar')
const cidade = document.querySelector('.resultado_cidade')
const nomeCidade = document.querySelector('.nome_cidade')
const imagemPrincipal = document.querySelector('.img_principal')
const divPrincipal = document.querySelector('.card_principal')

/*cria duas listas, listaDias armazena as data que iram ser mostradas as previsões , listaObejetoDia armazena 
as previsões em forma de objeto */
let listaDias = []
let listaObjetoDia = []

//criada a estrutura do objeto dia que receberar os dados das previsões 
const Dia = {
    init: function(data, tempMax, tempMin,imagem){
        this.data = data
        this.tempMax = tempMax
        this.tempMin = tempMin
        this.imagem = imagem
    }
}

/*cria a ação de click no botão de busca, limapa o html caso ja esta feito uma busca antes,
 faz a chamada das duas funções para buscar os dados nas apis*/

botBuscar.addEventListener("click",()=>{
    let resultado = cidade.value
    while(sectionCardDias.firstChild){
        sectionCardDias.removeChild(sectionCardDias.firstChild)
    }
    criaTemperaturaDiaDeHoje(resultado)
    criarTemperaturaVariosDias(resultado)
    cidade.value = ' '
})


// esta funçõa cria os o elementos html para preencher a pagina com as previsões, recebe a lista de objetos dias com os dados
function criarHtml(lista){

    lista.forEach((element)=>{
        let div = document.createElement('div')
        let paragrafo1 = document.createElement('p')
        paragrafo1.innerHTML = element.data
        paragrafo1.setAttribute('class', 'dia_data')
        let paragrafo2 = document.createElement('p')
        paragrafo2.innerHTML = `max: ${element.tempMax}<br>
        min: ${element.tempMin}`
        paragrafo2.setAttribute('class','dia_temperatura')
        let imagem = document.createElement('img')
        imagem.setAttribute('class','imagem-previsao')
        imagem.setAttribute('src',`imagens/${element.imagem}.png`)
        div.appendChild(paragrafo1)
        div.appendChild(paragrafo2)
        div.appendChild(imagem)
        div.setAttribute('class',"card_dia")
        sectionCardDias.appendChild(div)
    })
    
}

/* faz o cahamado para a api que retorna a previsão para a cidade num intervalo de 3 horas , os dados são tratados e divididos em temperatura minima
e maxima para cada dia e depois é cahamado a função para prencher o html*/
async function criarTemperaturaVariosDias(cidade){
    listaObjetoDia = []
    listaDias = []
    
    const key = '89c300e1df23f0d4cbf38f1f2fe48e4b'
    let dados = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cidade +"&appid=" + key + "&lang=pt_br" +"&units=metric").then(resposta => resposta.json() )
    
    dados.list.forEach((element) => {
        let data = `${element.dt_txt[8]+element.dt_txt[9]}/${element.dt_txt[5]+element.dt_txt[6]}`
       
        if(listaDias.includes(data)){
            listaObjetoDia.forEach((x) =>{
                if(x.data == data){
                    if(x.tempMax < element.main.temp){
                        x.tempMax = element.main.temp
                        x.imagem = element.weather[0].description
                    }
                    if(x.tempMin > element.main.temp){
                        x.tempMin = element.main.temp
                        x.imagem = element.weather[0].description
                    }
                }
            })
        }else{
            let objDia = Object.create(Dia)
            objDia.init(data, element.main.temp, element.main.temp, element.weather[0].description)
            listaObjetoDia.push(objDia)
            listaDias.push(data)
        }
    })
    console.log(listaObjetoDia)
    criarHtml(listaObjetoDia)

}

//faz o cahamado para a api que traz as previsões para a data de hoje, cria os elementos html e preenche o card principal
async function criaTemperaturaDiaDeHoje(cidade){
    const key = '89c300e1df23f0d4cbf38f1f2fe48e4b'
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cidade + "&appid=" + key + "&lang=pt_br" +"&units=metric").then(resposta => resposta.json())
    nomeCidade.innerHTML = dados.name
    tempCardPrincipal.innerHTML = `${dados.main.temp}°C`
    imagemPrincipal.setAttribute('src',`imagens/${dados.weather[0].description}.png `)
    divPrincipal.removeAttribute('style')
}

