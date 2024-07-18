const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

let todosArr = [
    { id: 1, contents: '영화보기', yesno: 'no' },
    { id: 2, contents: '숙제하기', yesno: 'no' }
];
let count = 3;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// EJS 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// EJS를 사용한 페이지 렌더링
app.get('/', (req, res) => {
    res.render('list', { datalist: todosArr });
});
app.get('/insert', (req, res) => {
    res.render('insert');
});
app.post('/insert', (req, res) => {
    let id_num = count++;
    todosArr.push({
        id: id_num,
        contents: req.body.contents,
        yesno: req.body.yesno
    });
    res.redirect('/');
});
app.get('/delete/:id', (req, res) => {
    let id_num = req.params.id;
    todosArr = todosArr.filter(todo => todo.id != id_num);
    res.redirect('/');
});
app.get('/edit/:id', (req, res) => {
    let editdata = todosArr.find(todo => todo.id == req.params.id);
    res.render('edit', { data: editdata });
});
app.post('/edit/:id', (req, res) => {
    let id_num = req.params.id;
    todosArr = todosArr.map(todo =>
        todo.id == id_num ? { id: todo.id, contents: req.body.contents, yesno: req.body.yesno } : todo
    );
    res.redirect('/');
});

// API 경로 설정
app.get('/api/todos', (req, res) => {
    res.json(todosArr);
});
app.post('/api/todos', (req, res) => {
    let id_num = count++;
    const newTodo = { id: id_num, contents: req.body.contents, yesno: req.body.yesno };
    todosArr.push(newTodo);
    res.status(201).json(newTodo);
});
app.put('/api/todos/:id', (req, res) => {
    const id_num = req.params.id;
    const updatedTodo = { id: id_num, contents: req.body.contents, yesno: req.body.yesno };
    todosArr = todosArr.map(todo => (todo.id == id_num ? updatedTodo : todo));
    res.json(updatedTodo);
});
app.delete('/api/todos/:id', (req, res) => {
    const id_num = req.params.id;
    todosArr = todosArr.filter(todo => todo.id != id_num);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
