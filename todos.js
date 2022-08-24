// tum elementleri secme
const form = document.querySelector("#todo-form");

const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");

const firstCardBody = document.querySelectorAll(".card-body")[0];
const SecondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


addEventListener();

function addEventListener(){ //tum event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    SecondCardBody.addEventListener("click",deleteTodo);
   filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}


function clearAllTodos(e){

    if(confirm("tumunu silmek istedigini emin misin?")){
        //arayuzden todolari temizleme
        //todoList.innerHTML = ""; // yavas 
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }

}


function filterTodos(e){

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
             //bulamadi

             listItem.setAttribute("style","display : none!important");
        }
        else{
            listItem.setAttribute("style","display : block");

        }
    });
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        
        showAlert("success", "todo silindi ");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // Arrayden degeri silme
        }

    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger","Lutfen bir todo gir");
    }
    else {
        addTodoToUI(newTodo); 
        addTodoStorage(newTodo);
        showAlert("success","Basarili");
    }


    e.preventDefault();
}

function getTodosFromStorage(){  //storageden todoslari alicak
    let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos

}

function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
        
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //setTimeout
    setTimeout(function(){
        alert.remove();
    },1000);
}

function addTodoToUI(newTodo){// string degerini list item olarak UI'ya ekliyecek
//list Item olusturma
    const listItem = document.createElement("li");
    // link olusturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

// TextNote ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

// todo list'e List item'i ekleme
todoList.appendChild(listItem);
todoInput.value ="";

}