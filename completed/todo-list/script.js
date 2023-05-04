const todoObject = {
    item: '',
    dueDate: Date
}
const todoArray = [];

//add todo button
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addToDo();
});

//add todo by enter key
document.querySelector('.js-addToDo').addEventListener('keydown', (e) => {
    if(e.key === 'Enter') addToDo();
});

function addToDo() {
    const addTodo = document.querySelector('.js-addToDo');
    const todo = addTodo.value;
    const addDueDate = document.querySelector('.js-addDate');
    const dueDate = addDueDate.value;

    todoArray.push({todo, dueDate});

    addTodo.value = '';
    addDueDate.value = '';

    renderTodoList();
}

function renderTodoList() {
    let todoListHTML = '';

    todoArray.forEach((e) => {
        const html = `
            <div class="todo">${e.todo}</div>
            <div class="dueDate">${e.dueDate}</div>
            <button class="js-delete-todo-button deleteFromList">Delete</button>
            `;
        todoListHTML += html;
    });

    document.querySelector('.js-addItem').innerHTML = todoListHTML;

    //delete todo button
    document.querySelectorAll('.js-delete-todo-button').forEach((e, index) => {
        e.addEventListener('click', () => {
            todoArray.splice(index, 1); 
            renderTodoList();
        });
    });
}

