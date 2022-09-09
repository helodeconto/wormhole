var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var criaMosquitoTempo = 1500

var nivel = window.location.search  // serach nos dá o ? e o que estiver a direita do '?'
//para tirar o ponto de ?
nivel = nivel.replace('?', '')
if (nivel === 'normal'){
    criaMosquitoTempo = 1500
}
else if (nivel === 'dificil'){
    criaMosquitoTempo = 1000
}
else if (nivel === 'chuck'){
    criaMosquitoTempo = 750
}

// encontrar altura e largura da pagina
function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    
    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){
    tempo -=1

    if (tempo<0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href='vitoria.html'
    }
    else {
        //innerHTML: interir algo entre as tags
    document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

function posicaoRandomica(){

    //remover o mosquito anterior caso exista 
    if (document.getElementById('mosquito')){
    document.getElementById('mosquito').remove()

        if (vidas > 3){
            //gameover
            window.location.href = 'fimDeJogo.html'
        }
        else {
            document.getElementById('v'+vidas).src = 'imagens/coracao_vazio.png'
            vidas++
        }
    }

    //criando posições randômicas
    var posicaox = Math.floor(Math.random()* largura) - 90
    var posicaoy = Math.floor(Math.random()* altura) - 90

    // para garantir que a imagem não irá sumir, sendo menor que 0
    posicaox = posicaox < 0 ? 0 : posicaox
    posicaoy = posicaoy < 0 ? 0 : posicaoy

    console.log('posicao: '+posicaox, posicaoy)

    // criar elemento html > img
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() +' '+ ladoAleatorio()
    mosquito.style.left = posicaox + 'px' // px para trazer informação de pexel
    mosquito.style.top = posicaoy + 'px' // px para trazer informação de pexel
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        
        //remover elemento html (mosquito) sem perda de vida
        this.remove()
    }

    document.body.appendChild(mosquito)

}

// definir tamanho aleatório do mosquito
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random()*3)
    console.log(classe)

    switch(classe){
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

// mudar o lado que o mosquito esta olhando
function ladoAleatorio(){
    var classe = Math.floor(Math.random()*2)
    console.log(classe)

    switch(classe){
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}
