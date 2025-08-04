const participantes = [];

const input = document.getElementById('nomeParticipante');
const btnAdicionar = document.getElementById('btnAdicionar');
const btnSortear = document.getElementById('btnSortear');
const divResultado = document.getElementById('resultado');
const mensagemErro = document.getElementById('mensagemErro');
const contadorParticipantes = document.getElementById('contadorParticipantes');

btnAdicionar.addEventListener('click', adicionarParticipante);
btnSortear.addEventListener('click', sortear);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') adicionarParticipante();
});

function adicionarParticipante() {
  const nome = input.value.trim();
  if (nome === '') {
    mostrarMensagemErro('Por favor, insira um nome válido.');
    return;
  }
  if (participantes.includes(nome)) {
    mostrarMensagemErro('Participante já adicionado.');
    input.value = '';
    return;
  }
  participantes.push(nome);
  input.value = '';
  input.focus();
  atualizarContador();
  limparMensagemErro();
  divResultado.style.display = 'none';
}

function atualizarContador() {
  contadorParticipantes.textContent = participantes.length;
}

function sortear() {
  if (participantes.length < 3) {
    mostrarMensagemErro('Adicione pelo menos 3 participantes para sortear.');
    return;
  }
  limparMensagemErro();

  let sorteados = participantes.slice();
  let resultado = {};

  for (const p of participantes) {
    const opcoes = sorteados.filter(s => s !== p);
    if (opcoes.length === 0) {
      mostrarMensagemErro('Erro no sorteio, tente novamente.');
      return;
    }
    const escolha = opcoes[Math.floor(Math.random() * opcoes.length)];
    resultado[p] = escolha;
    sorteados.splice(sorteados.indexOf(escolha), 1);
  }

  mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
  divResultado.innerHTML = '<h2>Olha só quem tirou quem!</h2>';
  for (const [quem, tirou] of Object.entries(resultado)) {
    const p = document.createElement('p');
    p.textContent = `${quem} tirou ${tirou}`;
    divResultado.appendChild(p);
  }
  divResultado.style.display = 'block';
}

function mostrarMensagemErro(msg) {
  mensagemErro.textContent = msg;
}

function limparMensagemErro() {
  mensagemErro.textContent = '';
}
