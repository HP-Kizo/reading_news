"use strict";
const readPage = document.getElementById("news-container");
const numberPage = document.getElementById("numberPage");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

const New = async function (country, category, pageSize, page, aniKey) {
  const pos = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${aniKey}`
  )
    .then((respon) => respon.json())
    .then((data) => {
      // let iPage = data.totalResults / pageSize;
      // iPage = iPage.toFixed();
      // console.log(iPage);
      // Tạo 1 biến lưu trữ số thứ tự của trang
      let currenPage = 1;

      // Tạo 1 mảng mới lưu trữ các bài viết trong 1 trang

      // Tạo biến lưu trữ số lượng bài tối đa của 1 trang

      // Tạo function khi nhấn vào các nút next và preview
      btnPrev.addEventListener("click", function () {
        currenPage = currenPage - 1;
        renderNew(currenPage);
      });
      btnNext.addEventListener("click", function () {
        currenPage = currenPage + 1;
        renderNew(currenPage);
      });
      renderNew(currenPage);
      function renderNew(currenPage) {
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

      // -------------------------------------------------------------------------------------------

      // Tạo function render từng trang
      // -------------------------------------------------------------------------------------------
    });
};

New(
  "us",
  "business",
  JSON.parse(getFromStorage("pagesize")) * 2
    ? JSON.parse(getFromStorage("pagesize")) * 2
    : 20,
  5,
  "6430a187100742b98e2d1a02a8473b32"
);
