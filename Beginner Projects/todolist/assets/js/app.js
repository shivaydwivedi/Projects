document.addEventListener('DOMContentLoaded', () => {
    // Storage using localStorage
    const storage = {
        getTasks: () => {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        },
        saveTasks: (tasks) => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    };

    // DOM elements
    const input = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');
    const toggleTheme = document.getElementById('toggle-theme');

    // State
    let tasks = storage.getTasks();
    let filter = 'all';

    // Render tasks
    function renderTasks() {
        const visibleTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'active') return !task.completed;
            return true;
        });

        taskList.innerHTML = visibleTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
          <span>${task.text}</span>
          <div class="task-buttons">
            <button class="complete-btn">${task.completed ? '↩️' : '✅'}</button>
            <button class="delete-btn">🗑️</button>
          </div>
        </li>
      `).join('');

        document.getElementById('empty-msg').style.display =
            tasks.length ? 'none' : 'block';
        document.getElementById('task-count').textContent =
            `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
    }

    // Add task
    function addTask() {
        const text = input.value.trim();
        if (!text) return;

        tasks.push({
            id: Date.now(),
            text,
            completed: false
        });

        storage.saveTasks(tasks);
        input.value = '';
        renderTasks();
    }

    // Event listeners
    addBtn.addEventListener('click', addTask);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        const id = Number(li.dataset.id);
        const task = tasks.find(t => t.id === id);

        if (e.target.classList.contains('complete-btn')) {
            task.completed = !task.completed;
        } else if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter(t => t.id !== id);
        }

        storage.saveTasks(tasks);
        renderTasks();
    });

    // Filters
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filter = btn.dataset.filter;
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTasks();
        });
    });

    // Dark mode
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });

    // Initialize
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        toggleTheme.textContent = '☀️';
    }
    renderTasks();
});