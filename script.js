let tarefas = [];

const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

function renderizar() {
  lista.innerHTML = '';

  tarefas.forEach((tarefa) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = tarefa.texto;

    li.appendChild(span);
    lista.appendChild(li);
  });
}

function adicionarTarefa(texto) {
  tarefas.push({ id: Date.now(), texto, concluida: false });
  renderizar();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  adicionarTarefa(texto);
  input.value = '';
});