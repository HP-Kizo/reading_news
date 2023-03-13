"use strict";
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const readPage = document.getElementById("news-container");

btnSubmit.addEventListener("click", function () {
  if (inputQuery == "") {
    alert("  Please enter the information you want to search");
  } else {
    search(inputQuery.value);
  }
});
function search(key) {
  fetch(
    `https://newsapi.org/v2/everything?q=${key}&apiKey=6430a187100742b98e2d1a02a8473b32`
  )
    .then((prom) => prom.json())
    .then((data) => {
      let currenPage = 1;
      let page = 2;
      // Tạo function khi nhấn vào các nút next và preview
      // -------------------------------------------------------------------------------------------
      let pageSize =
        JSON.parse(getFromStorage("pagesize")) * 2
          ? JSON.parse(getFromStorage("pagesize")) * 2
          : 10;
      btnPrev.addEventListener("click", function () {
        currenPage = currenPage - 1;
        renderSearch(currenPage);
      });
      btnNext.addEventListener("click", function () {
        currenPage = currenPage + 1;
        renderSearch(currenPage);
      });
      // -------------------------------------------------------------------------------------------

      // Tạo 1 mảng mới lưu trữ các bài viết trong 1 trang

      // -------------------------------------------------------------------------------------------

      renderSearch(currenPage);
      function renderSearch(currenPage) {
        let tam = "";
        let Arr = [];
        let index = Math.ceil(pageSize / page);
        console.log(index);
        for (let index = 0; index < pageSize; index++) {
          Arr.push(data.articles[index]);
        }
        console.log(Arr);
        let listData = [];
        listData = Arr.slice(
          (currenPage - 1) * index,
          (currenPage - 1) * index + index
        );
        // }

        listData.forEach((element) => {
          {
            tam =
              tam +
              `<div class="card flex-row flex-wrap">
              <div class="card mb-3" style="">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src=${element.urlToImage}
                      class="card-img"
                      alt="${element.title}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.content}</p>
                      <a href=${element.url}
                        class="btn btn-primary">View</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          }
        });
        // data.totalResults = pageSize;
        // Tạo 2 câu lệnh kiểm tra đây là trang thứ mấy
        // -------------------------------------------------------------------------------------------
  
        if (currenPage == 1) {
          btnPrev.style.display = "none";
        } else {
          btnPrev.style.display = "inline-block";
        }
        if (currenPage == page) {
          btnNext.style.display = "none";
        } else {
          btnNext.style.display = "inline-block";
        }
        pageNum.textContent = currenPage;
        readPage.innerHTML = tam;
      }
    });
}
// search("java");
