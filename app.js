var todoForm = document.querySelector('.header');
var todoInput = document.querySelector('.new-todo');
var todoUl = document.querySelector('.todo-list');
var todoCompleted = document.querySelector('.completed');
var todoActive = document.querySelector('.active');
var todoAll = document.querySelector('.all')
var todoClear = document.querySelector('.clear-completed')
var todoAllCheck = document.querySelector('label')


function delTodolist(event){
    const btn = event.target;
    const div = btn.parentNode;
    const li = div.parentNode;
    todoUl.removeChild(li);
    const cleanTask = todolist.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    todolist=cleanTask;
    saveTodolist();
}

function saveTodolist(){
    localStorage.setItem(TODOLIST,JSON.stringify(todolist));
}

let todolist = [];

function inputChecked(event){
    const btn = event.target;
    const div = btn.parentNode;
    const li = div.parentNode;
    li.classList.toggle('completed');
}

function paintTodolist(text){
    const li = document.createElement('li');
    const div = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const delbtn = document.createElement('button');
    const newId = todolist.length+1;

    li.setAttribute('class',"");
    div.setAttribute("class","view");
    input.setAttribute("class","toggle");
    input.setAttribute("type","checkbox");
    input.setAttribute("name","todoCheckBox")
    input.addEventListener('click',inputChecked)
    label.innerHTML = text;
    delbtn.setAttribute("class","destroy");
    delbtn.addEventListener("click",delTodolist);
    li.appendChild(div);
    li.id=newId;
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(delbtn)
    todoUl.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    todolist.push(toDoObj);
    saveTodolist();
}


function handleSubmitList(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    saveTodolist(currentValue);
    paintTodolist(currentValue);
    todoInput.value="";
}

function todoAll(){
    alert('안녕')
}



const TODOLIST = "TODOLIST"

function loadtodo(){
    const todoListValue = localStorage.getItem(TODOLIST);
    if(todoListValue !==null){
        const parsedtodoList = JSON.parse(todoListValue);
        parsedtodoList.forEach(function(todo){
            paintTodolist(todo.text);
        });
    }
}

function activeList(){
    checkedList = document.querySelectorAll("input[name=todoCheckBox]");
    filtered = checkedList.forEach(todo => {if(todo.checked === true){
        const todoParent = todo.parentNode;
        todoParent.style.display = 'none';
    }else if(todo.checked===false){
        const todoParent = todo.parentNode;
        todoParent.style.display = 'block';
    }})
}

function completeList(){
    checkedList = document.querySelectorAll("input[name=todoCheckBox]");
    filtered = checkedList.forEach(todo => {if(todo.checked === false){
        const todoParent = todo.parentNode;
        todoParent.style.display = 'none';
    }else if(todo.checked===true){
        const todoParent = todo.parentNode;
        todoParent.style.display = 'block';
    }})
}

function allList(){
    checkedList = document.querySelectorAll("input[name=todoCheckBox]");
    console.log(checkedList)
    filtered = checkedList.forEach(todo => todo.parentNode.style.display = 'block')
}

function clearList(){
    checkedList = document.querySelectorAll("input[name=todoCheckBox]");
    filtered = checkedList.forEach(todo => {if(todo.checked === true){
        const todoParent = todo.parentNode;
        todoParent.parentNode.removeChild(todoParent);
    }})
}

function allCheckList(){
    checkedList = document.querySelectorAll("input[name=todoCheckBox]");
    
    checkedList.forEach(todo => {
        todo.checked = true,
        todo.parentNode.parentNode.classList.add('completed')}
        );
}

function init(){
    loadtodo();
    todoForm.addEventListener('submit',handleSubmitList);
    todoCompleted.addEventListener('click',completeList)
    todoActive.addEventListener('click', activeList)
    todoAll.addEventListener('click',allList)
    todoClear.addEventListener('click',clearList)
    todoAllCheck.addEventListener('click',allCheckList)
}

init();
