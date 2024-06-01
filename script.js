const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const tempoNaTela = document.querySelector('#timer');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicafoco = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true
const musicaFinal = new Audio('/sons/beep.mp3');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaIniciar = new Audio('/sons/play.wav');
const imagemPlayId = document.querySelector('.app__card-primary-butto-icon')

let tempoDecorridoSegundos = 1500
let intervaloId = null

// Criando o evento de play na musica

musicafoco.addEventListener('change', ()=>{
    if (musica.paused) {
        musica.play()
    }
    else 
    {
        musica.pause()
    }
})

// Criando evento de click // o aero fuction ()=>{} define o que eu quero alterar primeiro no caso o 
//data-contexto do html para o que eu desejo alterar que é o estilo de foco,descanso etc

focoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 1600
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', ()=>{
    tempoDecorridoSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

//Fuction para automatizar a troca de contexto de cada botão

//innerHtml serve para alterar um texto html através do js

function alterarContexto(contexto){
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
   
    switch (contexto) {
        case 'foco':
            titulo.innerHTML =`Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            ` 
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br> 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>  
            <strong class="app__title-strong"> Faça uma pausa longa. </strong>
            `
            break;
        default:
            break;
    }
}

// Criando o cronometro regressivo

const contaRegressiva = () => {
    if(tempoDecorridoSegundos <= 0 ){
        musicaFinal.play();
        alert("Tempo finalizado")
        zerar()
        return
    }
    tempoDecorridoSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener('click',iniciarOuPausar)

// setInterval serve para automatizar mediante ao tempo escolhido, obs: ele conta em milisegundos.
function iniciarOuPausar(){
    if(intervaloId){
        zerar()
        musicaPause.play();
        return
    }
    musicaIniciar.play();
    intervaloId = setInterval(contaRegressiva,1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imagemPlayId.setAttribute('src', `/imagens/pause.png`)
}

// clearInterval serve para interromper a execução do código
function zerar (){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    imagemPlayId.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

// função para demonstrar o tempo do cronometro
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-break",{minute: "2-digit", second: "2-digit"}, )
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

// Colocando a função no escopo global a função global

mostrarTempo()