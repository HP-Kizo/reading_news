"use strict";
const btnLogin = document.getElementById("login");
const logout = document.getElementById("btn-logout");
// Tạo biến kiểm tra xem trong Localstorage đã có login chưa. Đây là điều kiện để biết đã đăng nhập hay chưa
let isLogin = getFromStorage("login") ? true : false;
if (isLogin) {
  btnLogin.style.display = "none";
  register.style.display = "none";
  logout.style.display = "inline-block";
} else {
  logout.style.display = "none";
  register.style.display = "inline-block";
}
// Tạo function để đăng xuất tài khoản
logout.addEventListener("click", logOut);
function logOut() {
  deleteItem("login");
  window.location.href = "../pages/login.html";
  btnLogin.style.display = "inline-block";
  deleteItem("pagesize");
}
