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

    
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    addTodoToUI(newTodo); //


    e.preventDefault();
}

/*function addTodoToUI(newTodo){// string degerini list item olarak UI'ya ekliyecek
//list Item olusturma
    const listItem = document.createAttribute("li");
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

}*/