const divQuadro = document.getElementById("quadro")
const divMain = document.querySelector("main")
const divs = Array.from(divMain.querySelectorAll("div"))

let sequencia = []
let animatingColors = false
let currentColorPosition = 0

divMain.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
        
        document.getElementById('modalTitulo').innerHTML = 'PERDEU PLAYBOY',
        document.getElementById('modalTituloDiv').className = "modal-header text-danger",
        document.getElementById('modalBtn').className = 'btn btn-danger',
        document.getElementById('modalBtn').innerHTML = 'Jogar novamente',
        // mostrar modal
        $('#modalPerdeu').modal('show')
        document.getElementById('modalBtn').addEventListener('click', inicio)

        window.location.href = '../index.html'
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        setTimeout(() => turno(), 3000)
    }
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    console.log('tamo aqui')
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        divQuadro.innerHTML = 'O JOGO COMEÇARÁ EM: '+cnt--
        if(cnt <= 0) {
            turno()
            clearInterval(idx)
        }
    }, 1000)
}


function turno() {
    divQuadro.innerHTML = 'PONTUAÇÃO: '+ sequencia.length
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}