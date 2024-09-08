// Selecionando os elementos
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Carregar tarefas salvas do LocalStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Função para adicionar tarefa
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        addTask(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = ''; // Limpar o campo de entrada
    } else {
        alert('Por favor, adicione uma tarefa.');
    }
});

// Função para adicionar uma tarefa à lista
function addTask(taskText) {
    const li = document.createElement('li');

    // Criar o span para o texto da tarefa
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Botões de editar e excluir
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit');
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('delete');
    li.appendChild(deleteButton);

    // Eventos dos botões
    deleteButton.addEventListener('click', function() {
        li.classList.add('removing'); // Adiciona a classe para iniciar a transição
    
        // Aguarda o fim da transição antes de remover o item do DOM
        setTimeout(function() {
            li.remove();
            removeTaskFromLocalStorage(taskText);
        }, 300); // O tempo aqui deve coincidir com a duração da transição (0.3s)
    });
    
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Editar tarefa:', taskText);
        if (newTaskText) {
            taskSpan.textContent = newTaskText;
            updateTaskInLocalStorage(taskText, newTaskText);
        }
    });

    taskList.appendChild(li);
}


// Função para salvar tarefa no LocalStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para remover tarefa do LocalStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para atualizar tarefa no LocalStorage
function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Função para obter tarefas do LocalStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Função para carregar tarefas do LocalStorage ao carregar a página
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(addTask);
}
