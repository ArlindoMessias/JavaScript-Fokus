const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');

const banner = document.querySelector('.app__image');
const textoPrincipal = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');

const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImagem = document.querySelector('.app__card-primary-butto-icon')

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop=true;

const tempoNaTela = document.querySelector('#timer')

const somPause = new Audio('/sons/pause.mp3');
const somPlay  = new Audio('/sons/play.wav');
const fimTempo = new Audio('/sons/beep.mp3');

const startPauseBt = document.querySelector('#start-pause');
let tempoDecorridoEmSegundos = 1500;
let intervaloId=null;

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco');

    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo');

    longoBt.classList.add('active');
    
})

musicaFocoInput.addEventListener('change', ()=> {
    if(musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)

    switch(contexto){
        case "foco":
            textoPrincipal.innerHTML=`Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            textoPrincipal.innerHTML=`Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;

        case "descanso-longo":
            textoPrincipal.innerHTML=`Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    
    if(tempoDecorridoEmSegundos<=0){
        
        fimTempo.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos-=1
    console.log('Temporizador: '+ tempoDecorridoEmSegundos)
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    somPlay.play()
    if(intervaloId){
        somPause.play()
        zerar()
        return
    }
    intervaloId=setInterval(contagemRegressiva, 1000)

    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarImagem.setAttribute('src', 'imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarImagem.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId=null
}

function mostrarTempo(){
    const tempo = new Date((tempoDecorridoEmSegundos*1000));
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()