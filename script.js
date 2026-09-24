let tarefas = JSON.parse(localStorage.getItem('taskflow:tarefas')) || [];
let filtroAtual = 'todas';

const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

function salvar() {
  localStorage.setItem('taskflow:tarefas', JSON.stringify(tarefas));
}

function tarefasFiltradas() {
  if (filtroAtual === 'pendentes') return tarefas.filter((t) => !t.concluida);
  if (filtroAtual === 'concluidas') return tarefas.filter((t) => t.concluida);
  return tarefas;
}

function renderizar() {
  lista.innerHTML = '';

  tarefasFiltradas().forEach((tarefa) => {
    const li = document.createElement('li');
    if (tarefa.concluida) li.classList.add('concluida');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida;
    checkbox.addEventListener('change', () => alternarConclusao(tarefa.id));

    const span = document.createElement('span');
    span.textContent = tarefa.texto;

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '🗑';
    btnExcluir.className = 'btn-excluir';
    btnExcluir.setAttribute('aria-label', 'Excluir tarefa');
    btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

function adicionarTarefa(texto) {
  tarefas.push({ id: Date.now(), texto, concluida: false });
  salvar();
  renderizar();
}

function alternarConclusao(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) return;

  tarefa.concluida = !tarefa.concluida;
  salvar();
  renderizar();
}

function excluirTarefa(id) {
  if (!confirm('Deseja realmente excluir esta tarefa?')) return;

  tarefas = tarefas.filter((t) => t.id !== id);
  salvar();
  renderizar();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  adicionarTarefa(texto);
  input.value = '';
});

document.querySelectorAll('.filtro').forEach((btn) => {
  btn.addEventListener('click', () => {
    filtroAtual = btn.dataset.filtro;

    document.querySelectorAll('.filtro').forEach((b) => {
      b.classList.toggle('ativo', b === btn);
    });

    renderizar();
  });
});

renderizar();

const btnTema = document.getElementById('btn-tema');

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-tema', tema);
  btnTema.textContent = tema === 'escuro' ? '☀️' : '🌙';
  localStorage.setItem('taskflow:tema', tema);
}

btnTema.addEventListener('click', () => {
  const atual = document.documentElement.getAttribute('data-tema');
  aplicarTema(atual === 'escuro' ? 'claro' : 'escuro');
});

aplicarTema(localStorage.getItem('taskflow:tema') || 'claro');
