"use strict";
const inputPage = document.getElementById("input-page-size");
const Category = document.getElementById("input-category");
const Submit = document.getElementById("btn-submit-setting");
// Tạo sự kiện khi click vào
Submit.addEventListener("click", function () {
  deleteItem("pagesize");
  if (inputPage.value == "") {
    alert("Please enter Page new");
  } else {
    // Lưu giá trị vào local để sử dụng
    saveToStorage("pagesize", JSON.stringify(Number.parseInt(inputPage.value)));
    document.location.href = "../pages/news.html";
    inputPage.value == "";
  }
});
