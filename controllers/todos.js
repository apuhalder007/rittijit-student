const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

exports.getTodos = (req, res) => {
fs.readFile("todos.json", "utf8", (err, data) => {  
    if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
    }
    res.send(JSON.parse(data));
    });

}

exports.addTodo = (req, res) => { 
    console.log(req.body);
    const { title, description } = req.body;
    const id = uuidv4();
    const todo = { id, title, description };    
    fs.readFile('./todos.json', 'utf8', (err, data) => {
    if (err) {  
        console.error(err);
        res.status(500).send('Server error');
        return;
    }
    const todos = JSON.parse(data);
    todos.push(todo);
    fs.writeFile('./todos.json', JSON.stringify(todos), err => {
        if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
        }
        res.send(todo);
    });
    }); 
}

exports.deleteTodo = (req, res) => { 
    console.log(req.params.id);
    const id = req.params.id;
    fs.readFile('./todos.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
    }
    const todos = JSON.parse(data);
    const newTodos = todos.filter(todo => todo.id !== id);
    fs.writeFile('./todos.json', JSON.stringify(newTodos), err => {
        if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
        }
        res.send(newTodos);
    });
    });
}