
let questaosAtual=0;

let perguntasCorretas=0;

let pct=Math.floor((questaosAtual / questions.length) * 100)  //Calculo para barrinha mover

document.querySelector('.progress--bar').style.width=`${pct}%` //mover a barrinha

mostrarQuestao();

const userNameInput = document.getElementById('userName');
let userName = '';

function mostrarQuestao(){
    if(questions[questaosAtual]){
        let q=questions[questaosAtual]; //armazenei na variavel nova

      document.querySelector('.scoreArea').style.display='none'; 
      document.querySelector('.questionArea').style.display='block' //exibir

      document.querySelector('.question').innerHTML=q.question;

      let optionsHtml='';
      for(let i in q.options){
       optionsHtml +=`<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
      }
      document.querySelector('.options').innerHTML=optionsHtml;

//----------------------------------------------------- EVENTO DE CLIQUE PARA ESCOLHER A OPÇÃO 
     document.querySelectorAll('.options .option').forEach(item=>{
        item.addEventListener('click',clicandoOpcao)
      });
    }else{
        finishQuiz()//Finalizando o quiz

    }
}

let respostas = []; // Para armazenar se o usuário acertou ou errou a questão

function clicandoOpcao(e){
    let clickedOption=parseInt(e.target.getAttribute('data-op'))
    let isCorrect = questions[questaosAtual].answer === clickedOption;

    respostas.push({
        question: questions[questaosAtual].question,
        options: questions[questaosAtual].options,
        correctAnswer: questions[questaosAtual].answer,
        selectedAnswer: clickedOption,
        isCorrect: isCorrect
    });

    if(isCorrect) {
        perguntasCorretas++;  //variavel criada inicialmente em 0
        //console.log('Acertou')
    }

    questaosAtual++   //indo para próxima pergunta
    mostrarQuestao();
}

function finishQuiz(){

    let points=Math.floor((perguntasCorretas / questions.length)*100)

    if(points<30){
        document.querySelector('.scoreText1').innerHTML=`Ta ruim em ${userName} !!`
        document.querySelector('.scorePct').style.color='#000'
    }else if(points >= 40 && points<70){
        document.querySelector('.scoreText1').innerHTML=`Boa ${userName} !!`
        document.querySelector('.scorePct').style.color='#FFFF00'
    }else if(points>=70){
        document.querySelector('.scoreText1').innerHTML=`Mandou bem ${userName} !!`;
        document.querySelector('.scorePct').style.color='#0D630D'
    }

    document.querySelector('.scorePct').innerHTML=`${userName} Acertou ${points} %`
    document.querySelector('.scoreText2').innerHTML=`Você respondeu ${questions.length} e acertou ${perguntasCorretas}`

    document.querySelector('.scoreArea').style.display='block';
    document.querySelector('.questionArea').style.display='none'
    document.querySelector('.progress--bar').style.width=`100%`

    // Adicionar eventos aos botões de visualização
    document.querySelector('.btn_correct').addEventListener('click', mostrarAcertos);
    document.querySelector('.btn_error').addEventListener('click', mostrarErros);
}

function resetEvent(){
    questaosAtual=0;
    perguntasCorretas=0;
    mostrarQuestao();
    document.querySelector('.progress--bar').style.width=`0`
}

const reset=document.querySelector('.resetar')
reset.addEventListener('click',resetEvent)

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const modal = document.getElementById('modal');
    const exitBtn = document.getElementById('exitBtn');
    const beginBtn = document.getElementById('beginBtn');
    const closeModal = document.querySelector('.close');
    const intro = document.getElementById('intro');
    const quizArea = document.getElementById('quizArea');

    // Mostra o modal ao clicar no botão "Iniciar"
    startBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        intro.style.display = 'none';
    });

    

    // Fecha o modal e retorna para a tela de introdução
    exitBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        intro.style.display = 'block';
    });

    // Começa o quiz ao clicar no botão "Começar"
    beginBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        quizArea.style.display = 'block'; // Mostra a área do quiz
    });

    // Fecha o modal ao clicar no "X"
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        intro.style.display = 'block';
    });

    // Fecha o modal ao clicar fora do conteúdo do modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            intro.style.display = 'block';
        }
    }
});
 // Exibe o botão "Iniciar" após o nome ser informado
 submitNameBtn.addEventListener('click', () => {
    userName = userNameInput.value.trim();
    if (userName) {
        startBtn.style.display = 'inline-block'; // Exibe o botão "Iniciar"
        
    } else {
        alert('Por favor, informe seu nome.');
    }
});

function mostrarAcertos() {
    
    let acertosHtml = '';
    respostas.forEach((resposta, index) => {
        if (resposta.isCorrect) {
            acertosHtml += `<div>
                <p>Pergunta: ${resposta.question}</p>
                <p>Resposta correta: ${resposta.options[resposta.correctAnswer]}</p>
                <p>Sua resposta: ${resposta.options[resposta.selectedAnswer]}</p>
            </div><br>`;
        }
    });
    document.querySelector('.scoreArea').innerHTML = acertosHtml;
}

function mostrarErros() {
    let errosHtml = '';
    respostas.forEach((resposta, index) => {
        if (!resposta.isCorrect) {
            errosHtml += `<div>
                <p>Pergunta: ${resposta.question}</p>
                <p>Resposta correta: ${resposta.options[resposta.correctAnswer]}</p>
                <p>Sua resposta: ${resposta.options[resposta.selectedAnswer]}</p>
            </div><br>`;
        }
    });
    document.querySelector('.scoreArea').innerHTML = errosHtml;
}
