// --- VARIÁVEIS DOM ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// --- ARMAZENAMENTO DE DADOS (Array de Objetos) ---
// Cada tarefa é um objeto: { text: "Comprar leite", concluida: false }
let tasks = [];

// Função principal para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim(); // .trim() remove espaços em branco no início/fim

    // 1. Validação simples
    if (taskText === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    // 2. CRIAÇÃO do novo Objeto de Tarefa
    const newTask = {
        text: taskText,
        concluida: false
    };

    // 3. Adiciona o Objeto ao Array
    tasks.push(newTask);
    
    // 4. Limpa o campo de input
    taskInput.value = '';

    // 5. Atualiza a interface (DOM)
    renderTasks();
}

// Função para gerar e exibir a lista completa de tarefas no DOM
function renderTasks() {
    // 1. Limpa a lista existente para evitar duplicatas
    taskList.innerHTML = ''; 

    // 2. Itera sobre o Array 'tasks' e cria o HTML para cada tarefa
    // Usaremos forEach, um método essencial de Array
    tasks.forEach((task, index) => {
        // Cria o item da lista <li>
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        
        // Se a tarefa estiver concluída, adiciona a classe CSS
        if (task.concluida) {
            listItem.classList.add('completed');
        }

        // --- Conteúdo HTML do item da lista ---
        listItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="actions">
                <button class="complete-btn" data-index="${index}">✓</button>
                <button class="delete-btn" data-index="${index}">X</button>
            </div>
        `;
        
        // Adiciona o novo <li> à lista <ul> no DOM
        taskList.appendChild(listItem);
    });
    
    // 3. Reconecta os Event Listeners (para os botões que acabamos de criar)
    setupEventListeners();
}

// Função para configurar os listeners nos botões de Ação
function setupEventListeners() {
    // Adiciona listener para o botão de ADICIONAR
    addTaskBtn.addEventListener('click', addTask);
    
    // Adiciona listener para a tecla ENTER no campo de input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Adiciona listeners para os botões COMPLETAR e DELETAR
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', toggleComplete);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

// Inicializa a aplicação
setupEventListeners();
renderTasks(); // Chama para garantir que a lista esteja vazia ao carregar

// --- LÓGICA DE AÇÃO ---

// 1. Alterna o status de 'concluída' de uma tarefa
function toggleComplete(event) {
    // Pega o índice da tarefa que está salvo no botão (data-index)
    const index = event.target.dataset.index;
    
    // Altera a propriedade 'concluida' do objeto no Array 'tasks'
    // O '!' inverte o valor: se era 'true' vira 'false', se era 'false' vira 'true'
    tasks[index].concluida = !tasks[index].concluida;
    
    // Salva o Array atualizado e redesenha o DOM
    renderTasks();
}

// 2. Deleta uma tarefa do Array
function deleteTask(event) {
    // Pega o índice da tarefa que está salvo no botão
    const index = event.target.dataset.index;
    
    // O método 'splice' remove itens de um Array
    // tasks.splice(índice_inicial, quantidade_a_remover)
    tasks.splice(index, 1); // Remove 1 elemento a partir do 'index'
    
    // Salva o Array atualizado e redesenha o DOM
    renderTasks();
}

// Lembre-se que as funções 'setupEventListeners', 'addTask' e 'renderTasks'
// devem estar acima destas novas funções para que a aplicação funcione.