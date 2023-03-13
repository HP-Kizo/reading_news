"use strict";
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const inputUsername = document.getElementById("input-username");
const btnSubmit = document.getElementById("btn-submit");
const KEY = "USER_ARRAY";
const UserArr = JSON.parse(getFromStorage(KEY))
  ? JSON.parse(getFromStorage(KEY))
  : [];

// Tạo function xử lí sự kiện khi nhấp vào register
// -------------------------------------------------------------------------------------------
btnSubmit.addEventListener("click", validate);

// Tạo hàm kiểm tra các giá trị nhập vào
// -------------------------------------------------------------------------------------------

let vali = false;
function validate() {
  let userArr = JSON.parse(getFromStorage(KEY))
    ? JSON.parse(getFromStorage(KEY))
    : [];

  const data = {
    firstName: inputFirstname.value,
    lastName: inputLastname.value,
    username: inputUsername.value,
    password: inputPassword.value,
    passwordConfirm: inputPasswordConfirm.value,
  };
  if (userArr.length == 0) {
    vali = true;
  } else {
    for (let i = 0; i < userArr.length; i++) {
      if (data.username == userArr[i].username) {
        alert("Username already exists");
        vali = false;
        return;
      } else {
        vali = true;
      }
    }
  }

  if (vali) {
    if (data.firstName == "") {
      alert("Please enter First Name");
    } else if (data.lastName == "") {
      alert("Please enter Last Name");
    } else if (data.username == "") {
      alert("Please enter User Name");
    } else if (data.password == "") {
      alert("Please enter Password");
    } else if (data.password.length < 8) {
      alert("Password must be more than 8 characters");
    } else if (data.passwordConfirm == "") {
      alert("Please enter Password Confirm");
    } else if (data.password !== data.passwordConfirm) {
      alert("Confirm password is not correct");
    } else {
      userArr.push(data);
      // -------------------------------------------------------------------------------------------
      saveToStorage(KEY, JSON.stringify(userArr));
      window.location.href = "../pages/login.html";
    }
  }
}
// -------------------------------------------------------------------------------------------
