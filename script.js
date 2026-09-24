let tarefas = [];

const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

function renderizar() {
    lista.innerHTML = '';

    tarefas.forEach((tarefa) => {
        const li = document.createElement('li');
        if (tarefa.concluida) li.classList.add('concluida');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;

        const span = document.createElement('span');
        span.textContent = tarefa.texto;

        li.appendChild(checkbox);
        li.appendChild(span);
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = '🗑';
        btnExcluir.className = 'btn-excluir';
        btnExcluir.setAttribute('aria-label', 'Excluir tarefa');
        btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
        li.appendChild(btnExcluir);
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

function excluirTarefa(id) {
    if (!confirm('Deseja realmente excluir esta tarefa?')) return;

    tarefas = tarefas.filter((t) => t.id !== id);
    renderizar();
}