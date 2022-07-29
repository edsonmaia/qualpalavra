// funcoes auxiliares
function tirarAcentos(palavraAtual) {
    return palavraAtual.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

function bloquearTudo() {
    let letras = document.querySelectorAll('.letra')
    // console.log(letras)
    letras.forEach((letra) => {
        letra.setAttribute('disabled', 'disabled')
    })
}

function sortearPalavra(palavras) {
    let numero = Math.floor(Math.random() * 1001)
    return palavras[numero]
}

/*
    1. Escolher uma palavra na lista
    2. Separar as letras da palavra escolhida
    3. Pegar as letras digitadas pelo usuario
    4. Comparar as letras da palavra escolhida com as da palavra digitada
    5. Respostas visuais para acerto, acerto parcial e erros
*/

let palavrasDigitadas = {
    palavra1: null,
    palavra2: null,
    palavra3: null,
    palavra4: null,
    palavra5: null,
    palavra6: null
}
console.log(palavrasDigitadas)

// console.log(palavras)
// 1 escolher palavra, 2 separar letras
// const palavraSecreta = palavras[0] // 50 tempo
const palavraSecreta = sortearPalavra(palavras)
// document.querySelector('.aviso').innerText = palavraSecreta
const palavraSemAcentos = tirarAcentos(palavraSecreta)
const letrasSeparadas = palavraSemAcentos.split('')
// console.log(letrasSeparadas)

// 3 pegar letras digitadas pelo usuario
function lerLetrasDigitadas(numero) { 
    return document.querySelectorAll(`#linha${numero} .letra`)
}

let palavra = []
function palavraDigitada(numero) {
    let digitada = lerLetrasDigitadas(numero)
    let letras = []
    digitada.forEach((letra) => {
        letras.push((letra.value))
    })
    let palavraDigitada = letras.join().replaceAll(',', '')
    return palavraDigitada
}

function pintarLetras(letrasDigitadas) {
    letrasDigitadas.forEach((letra, posicao) => {
        // console.log(letra.value)
        // CONVERTER PARA MINUSCULAS
        let letraMinuscula = letra.value.toLowerCase()
        // PINTAR AS LETRAS
        if(letra.value !== '') {
            // verificar se a letra não existe na palavra       
            if(!letrasSeparadas.includes(letraMinuscula)) {
                // console.log(`letra ${letra.value} não existe na palavra`)
                letra.classList.add('letraErrada')
            } else if(letraMinuscula == letrasSeparadas[posicao]) {
                // console.log(`letra '${letra.value}' correta na posição ${posicao}`)
                letra.classList.add('letraCertaNaPosicao')  
            } else if(letrasSeparadas.includes(letraMinuscula)) {
                // console.log(`letra ${letra.value} existe na palavra, mas a posição está errada`)
                letra.classList.add('letraCertaSemPosicao')
            } else {
                console.log('Erro na digitação')
            }
        } // fim do if
    }) // fim do forEach
}

//////////////////////////////////////////////////////////////////////////////
/* funcao a ser colocada para avaliar a cada tentativa se a palavra existe */
function buscarPalavraDigitada(palavra) {
    let palavraDigitada = palavra
    console.log(palavraDigitada)
    let existe = palavras.includes(palavraDigitada)
    if(!existe) {
        document.querySelector('.aviso').innerHTML = `Palavra ${palavraDigitada} não existe no nosso banco de palavras`
        setTimeout(() => {
            document.querySelector('.aviso').innerHTML = 'Digite cada letra da palavra, depois use o botão Verde para confirmar'
        }, 2000)
    }
}
//////////////////////////////////////////////////////////////////////////////
let situacao = ''
function gameOver(palavraDigitada) {
    // console.log(palavraDigitada)
    // console.log(palavraSemAcentos)
    if(palavraDigitada.toLowerCase() === palavraSemAcentos) {
        document.querySelector('.aviso').innerHTML = "Você acertou! 🤩"
        bloquearTudo()
        let situacao = 'acertou'
        return situacao
    } else {
        console.log('Não acertou a palavra')
    }
}

// ESCUTADOR DE EVENTOS DE CLICK NO BOTAO ENTER ele finalizada cada tentativa
document.querySelector('.enter').addEventListener('click', () => {
    /*
        1. armazenar as letras digitadas na 1a tentativa
        2. verificar se a palavra1 ja esta armazenada
        3. se nao tiver guardar a palavraDigitada na palavra1
        4. depois pintar letras
    */
    // 1A TENTATIVA
    let letrasDigitadas = ''
    if(palavraDigitada(1) !== '') {
        letrasDigitadas = lerLetrasDigitadas(1)
        if(palavrasDigitadas.palavra1 == null) {
            palavrasDigitadas.palavra1 = palavraDigitada(1)
        }
        situacao = gameOver(palavraDigitada(1))
        pintarLetras(letrasDigitadas)
        if(situacao == 'acertou') {
            console.log(situacao)
            return
        }
        // FIM DA 1A TENTATIVA
    } else {
        console.log('DIGITE UMA PALAVRA')
        return
    }
    
    /////////////////////////////////////////////////////////////
    // 2A TENTATIVA
    // verificar se a 1a tentativa ja foi realizada, vendo se palavra1 não é nula
    // dentro desse if bloquear a linha1 e desbloquear a linha2 para digitacao
    if(palavrasDigitadas.palavra1 !== null || palavrasDigitadas.palavra1 !== '' && gameOver(palavraDigitada(2) == '')) {
        // liberar 2a linha para edição e bloquear a 1a linha
        document.querySelectorAll('#linha1 .letra').forEach((linha) => {
            linha.setAttribute('disabled', 'disabled')
        })
        document.querySelectorAll('#linha2 .letra').forEach((linha) => {
            linha.removeAttribute('disabled')
        })

        // ARMAZENAR PALAVRA2 E PINTAR LETRAS
        letrasDigitadas = lerLetrasDigitadas(2)
        if(palavrasDigitadas.palavra2 == null || palavrasDigitadas.palavra2 == '') {
            palavrasDigitadas.palavra2 = palavraDigitada(2)
        }
        situacao = gameOver(palavraDigitada(2))
        pintarLetras(letrasDigitadas)
        if(situacao == 'acertou') {
            console.log(situacao)
            return
        }
        // FIM 2A TENTATIVA

    } // fim if 2a tentativa

    /////////////////////////////////////////////////////////////
    /// 3A TENTATIVA
    // verificar se a 2a tentativa ja foi realizada, vendo se palavra2 não é nula ou vazia
    // dentro desse if bloquear a linha2 e desbloquear a linha3 para digitacao
    if(palavrasDigitadas.palavra2 !== null && palavrasDigitadas.palavra2 !== '') {
        // console.log(palavrasDigitadas.palavra2)
        document.querySelectorAll('#linha2 .letra').forEach((linha) => {
            linha.setAttribute('disabled', 'disabled')
        })
        document.querySelectorAll('#linha3 .letra').forEach((linha) => {
            linha.removeAttribute('disabled')
        })
        
        // ARMAZENAR PALAVRA3 E PINTAR LETRAS
        letrasDigitadas = lerLetrasDigitadas(3)
        if(palavrasDigitadas.palavra3 == null || palavrasDigitadas.palavra3 == '') {
            palavrasDigitadas.palavra3 = palavraDigitada(3)
        }
        situacao = gameOver(palavraDigitada(3))
        pintarLetras(letrasDigitadas)
        if(situacao == 'acertou') {
            console.log(situacao)
            return
        }
        // FIM 3A TENTATIVA

    } // fim if 3a tentativa

    /////////////////////////////////////////////////////////////
    // 4A TENTATIVA
    // verificar se a 3a tentativa ja foi realizada, vendo se palavra3 não é nula ou vazia
    // dentro desse if bloquear a linha3 e desbloquear a linha4 para digitacao
    if(palavrasDigitadas.palavra3 !== null && palavrasDigitadas.palavra3 !== '') {
        document.querySelectorAll('#linha3 .letra').forEach((linha) => {
            linha.setAttribute('disabled', 'disabled')
        })
        document.querySelectorAll('#linha4 .letra').forEach((linha) => {
            linha.removeAttribute('disabled')
        })
        
        // ARMAZENAR PALAVRA4 E PINTAR LETRAS
        letrasDigitadas = lerLetrasDigitadas(4)
        if(palavrasDigitadas.palavra4 == null || palavrasDigitadas.palavra4 == '') {
            palavrasDigitadas.palavra4 = palavraDigitada(4)
        }
        situacao = gameOver(palavraDigitada(4))
        pintarLetras(letrasDigitadas)
        if(situacao == 'acertou') {
            console.log(situacao)
            return
        }
        // FIM 4A TENTATIVA

    } // fim if 4a tentativa
    /////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////
    // 5A TENTATIVA
    // verificar se a 4a tentativa ja foi realizada, vendo se palavra4 não é nula ou vazia
    // dentro desse if bloquear a linha4 e desbloquear a linha5 para digitacao
    if(palavrasDigitadas.palavra4 !== null && palavrasDigitadas.palavra4 !== '') {
        document.querySelectorAll('#linha4 .letra').forEach((linha) => {
            linha.setAttribute('disabled', 'disabled')
        })
        document.querySelectorAll('#linha5 .letra').forEach((linha) => {
            linha.removeAttribute('disabled')
        })
        
        // ARMAZENAR PALAVRA5 E PINTAR LETRAS
        letrasDigitadas = lerLetrasDigitadas(5)
        if(palavrasDigitadas.palavra5 == null || palavrasDigitadas.palavra5 == '') {
            palavrasDigitadas.palavra5 = palavraDigitada(5)
        }
        situacao = gameOver(palavraDigitada(5))
        pintarLetras(letrasDigitadas)
        if(situacao == 'acertou') {
            console.log(situacao)
            return
        }
        // FIM 5A TENTATIVA

    } // fim if 5a tentativa
    /////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////
    // 6A TENTATIVA
    // verificar se a 5a tentativa ja foi realizada, vendo se palavra5 não é nula ou vazia
    // dentro desse if bloquear a linha5 e desbloquear a linha6 para digitacao
    if(palavrasDigitadas.palavra5 !== null && palavrasDigitadas.palavra5 !== '') {
        document.querySelectorAll('#linha5 .letra').forEach((linha) => {
            linha.setAttribute('disabled', 'disabled')
        })
        document.querySelectorAll('#linha6 .letra').forEach((linha) => {
            linha.removeAttribute('disabled')
        })
        
        // ARMAZENAR PALAVRA6 E PINTAR LETRAS
        letrasDigitadas = lerLetrasDigitadas(6)
        if(palavrasDigitadas.palavra6 == null || palavrasDigitadas.palavra6 == '') {
            palavrasDigitadas.palavra6 = palavraDigitada(6)
        }
        situacao = gameOver(palavraDigitada(6))
        pintarLetras(letrasDigitadas)
        if(situacao == 'acertou') {
            console.log(situacao)
            return
        }
        // FIM 6A TENTATIVA

    } // fim if 6a tentativa
    /////////////////////////////////////////////////////////////
    
    // verificar se ja usou as 6 tentativas
    // bloquear linha6
    // fim do jogo - verificar vitoria ou derrota
    if(palavrasDigitadas.palavra6 !== null && palavrasDigitadas.palavra6 !== '') {
        document.querySelectorAll('#linha6 .letra').forEach((linha) => {
            linha.setAttribute('disabled', 'disabled')
        })
        document.querySelector('.aviso').innerText = `A palavra secreta era ${palavraSecreta}`
        console.log('FIM DO JOGO')
    }

})

function limparLetras() {
    location.reload()
    let letra = document.querySelectorAll('.letra')
    letra.forEach((letra, indice) => {
        letra.value = ''
        letra.classList.remove('letraCertaNaPosicao')
        letra.classList.remove('letraCertaSemPosicao')
        letra.classList.remove('letraErrada')
    })
}

document.querySelector('.back').addEventListener('click', limparLetras)
