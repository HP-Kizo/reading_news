"use strict";

const inputPassword = document.getElementById("input-password");

const inputUsername = document.getElementById("input-username");
const btnSubmit = document.getElementById("btn-submit");
const register = document.getElementById("register");
let check = false;
const KEY = "USER_ARRAY";
const UserArr = JSON.parse(getFromStorage(KEY))
  ? JSON.parse(getFromStorage(KEY))
  : [];
btnSubmit.addEventListener("click", checkUser);
// Tạo function kiểm tra xem thông tin tài khoản có đúng ko
function checkUser() {
  if (inputUsername.value == "") {
    alert("Please enter User Name");
  } else if (inputPassword.value == "") {
    alert("Please enter password");
  } else {
    for (let index = 0; index < UserArr.length; index++) {
      if (
        inputUsername.value == UserArr[index].username &&
        inputPassword.value == UserArr[index].password
      ) {
        alert(`Welcome ${UserArr[index].firstName}`);
        let currentUser = {
          username: inputUsername.value,
          password: inputPassword.value,
        };
        // Nếu đúng thì sẽ lưu vào 1 trong Local dữ liệu vừa đăng nhập
        saveToStorage("login", JSON.stringify(currentUser));

        window.location.href = "../pages/news.html";
        check = true;
      }
    }
    if (!check) {
      alert("Incorrect information");
    }
  }
}
