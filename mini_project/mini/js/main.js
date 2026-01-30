// -------------------- 다크모드 유지 --------------------
const savedTheme = localStorage.getItem("theme");
document.body.classList.add(savedTheme === "dark" ? "dark-mode" : "light-mode");

document.getElementById("darkModeBtn").addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// -------------------- 상품 데이터 --------------------
const product_data = [
  { category: "상의", brand: "Supreme", product: "박스로고 후드티", price: "390,000", gender: "남성" },
  { category: "하의", brand: "DIESEL", product: "트랙 팬츠", price: "188,000", gender: "남성" },
  { category: "신발", brand: "Nike", product: "에어포스 1", price: "137,000", gender: "여성" },
  { category: "패션잡화", brand: "Music&Goods", product: "키링", price: "29,000", gender: "여성" },
  { category: "상의", brand: "ZARA", product: "니트", price: "59,000", gender: "여성" }
];

// -------------------- 전역 변수 --------------------
const tableBody = document.getElementById("product_data_Table");
const pagination = document.getElementById("pagination");

const itemsPerPage = 2;
let currentPage = 1;
let filteredData = [...product_data];

// -------------------- 테이블 렌더링 --------------------
function renderTable(data, page) {
  tableBody.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = data.slice(start, end);

  pageData.forEach(item => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = item.category;
    row.insertCell(1).innerText = item.brand;
    row.insertCell(2).innerText = item.product;
    row.insertCell(3).innerText = item.price;
  });
}

// -------------------- 페이지네이션 렌더링 --------------------
function renderPagination(data) {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(data.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;

    const a = document.createElement("a");
    a.className = "page-link";
    a.innerText = i;

    a.addEventListener("click", () => {
      currentPage = i;
      renderTable(filteredData, currentPage);
      renderPagination(filteredData);
    });

    li.appendChild(a);
    pagination.appendChild(li);
  }
}

// -------------------- 조회 버튼 필터 기능 --------------------
document.getElementById("searchBtn").addEventListener("click", () => {
  const category = document.querySelector('select[name="category_data_table"]').value;
  const gender = document.querySelectorAll("select")[1].value;
  const keyword = document.querySelector("input").value.trim();

  filteredData = product_data.filter(item => {
    return (
      (category === "카테고리" || item.category === category) &&
      (gender === "성별" || item.gender === gender) &&
      (keyword === "" || item.product.includes(keyword))
    );
  });

  currentPage = 1;
  renderTable(filteredData, currentPage);
  renderPagination(filteredData);
});

// -------------------- 초기 실행 --------------------
renderTable(filteredData, currentPage);
renderPagination(filteredData);
