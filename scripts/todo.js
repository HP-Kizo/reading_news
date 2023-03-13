"use strict";
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
let KeyTodo = "todoArr";
const todoArr = JSON.parse(getFromStorage(KeyTodo))
  ? JSON.parse(getFromStorage(KeyTodo))
  : [];
// Lấy dữ liệu người đăng nhập ra và lưu vào mảng mới
const userLogin = JSON.parse(getFromStorage("login"))
  ? JSON.parse(getFromStorage("login"))
  : [];
console.log(userLogin);
const Task = class {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
};
// Tạo 1 biến để kiểm tra xem đã login hay chưa
let isLogin = getFromStorage("login") ? true : false;
// Tạo sự kiện khi click add
btnAdd.addEventListener("click", addTask);
function addTask() {
  if (isLogin) {
    if (inputTask.value == "") {
      alert("Please enter task");
    } else {
      // Tạo 1 đối tượng lưu trữ Task
      const todo = new Task(inputTask.value, userLogin.username, false);
      // Chèn đối tượng vừa thêm vào mảng
      todoArr.push(todo);
      // Lưu vào Local
      saveToStorage(KeyTodo, JSON.stringify(todoArr));
      renderTask();
      // Làm mới ô nhập dữ liệu
      inputTask.value = "";
    }
  } else {
    alert("You are not logged in");
    return;
  }
}
console.log(todoArr);
// Tạo function hiển thị lại các Task đã được thêm đúng với username
function renderTask() {
  let tam = "";
  let dataTaskUser = todoArr.filter(
    (todo) => todo.owner === userLogin.username
  );

  dataTaskUser.forEach(
    (owner, index) =>
      (tam =
        tam +
        ` <li onclick="checkDone(event, ${index})" class="task ${
          owner.isDone ? "checked" : ""
        }">${owner.task}<span class="close">×</span></li>
        `)
  );
  console.log(tam);
  todoList.innerHTML = tam;
}
renderTask();
function checkDone(e, i) {
  console.log(i);
  if (e.target.className.includes("task")) {
    e.target.classList.toggle("checked");
    //
    // Tạo biến dem tìm vị trí của phần tử cần sửa

    var dem = 0;
    for (let j = 0; j < todoArr.length; j++) {
      if (todoArr[j].owner == userLogin.username) {
        dem = dem + 1;
      }
      if (dem == i + 1) {
        todoArr[j].isDone = todoArr[j].isDone === false ? true : false;
        saveToStorage(KeyTodo, JSON.stringify(todoArr));
        console.log(todoArr);
        break;
      }
    }
    //
  }
  if (e.target.className.includes("close")) {
    const isDelete = confirm("Are you sure ?");
    // Tạo biến dem tìm vị trí của phần tử cần xóa
    if (isDelete) {
      var dem = -1;
      for (let j = 0; j < todoArr.length; j++) {
        if (todoArr[j].owner == userLogin.username) {
          dem = dem + 1;
        }
        if (dem == i) {
          // console.log(j);
          todoArr.splice(j, 1);
          break;
        }
      }
      saveToStorage(KeyTodo, JSON.stringify(todoArr));
      renderTask();
    }
  }
}
