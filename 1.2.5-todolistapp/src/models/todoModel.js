// Todo structure
// Todo = { id: number, description: string }

let todos = [];
let nextId = 1;

function create(description) {
    const newTodo = { id: nextId++, description };
    todos.push(newTodo);
    return newTodo;
}

function findById(id) {
    return todos.find((t) => t.id === id);
}

function findAll() {
    return todos;
}

function update(id, data) {
    const todo = findById(id);
    if (!todo) return null;

    if (data.description !== undefined) todo.description = data.description;

    return todo;
}

function remove(id) {
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return null;

    return todos.splice(index, 1)[0];
}

module.exports = { create, findById, findAll, update, remove };
