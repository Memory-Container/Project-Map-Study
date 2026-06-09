const searchBar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar .bar");
let select = document.querySelectorAll("select");
const tableList = document.querySelector(".tableList");

// Lấy thông tin user hiện tại từ localStorage
const currentUserStr = localStorage.getItem("currentUser");
let loggedInUser = {};
if (currentUserStr) {
    try {
        loggedInUser = JSON.parse(currentUserStr);
    } catch (e) {
        console.error("Lỗi parse loggedInUser:", e);
    }
}
const userRole = loggedInUser.role ? loggedInUser.role.toLowerCase() : "mentor";
const userName = loggedInUser.name || "";

let mentorSelect = null;

function activeMore() {
    select.forEach((selectElement) => selectElement.classList.remove("active"));
    if (searchBar) searchBar.classList.remove("active");
}

if (searchBar) {
    searchBar.addEventListener("click", () => {
        activeMore();
        searchBar.classList.add("active");
    });
}

if (select) {
    select.forEach((selectElement) => {
        selectElement.addEventListener("click", () => {
            activeMore();
            selectElement.classList.add("active");
        });
    });
}

document.addEventListener("click", (e) => {
    const isClickInSearchBar = searchBar && searchBar.contains(e.target);
    const isClickInSelect = Array.from(select).some((selectElement) => selectElement.contains(e.target));
    if (!isClickInSearchBar && !isClickInSelect) activeMore();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        activeMore();
        if (searchInput) searchInput.blur();
        select.forEach((selectElement) => selectElement.blur());
    }
});

// --- THÊM LOGIC RENDER VÀ FILTER DỮ LIỆU ---
let examData = [];
let pendingExamsData = [];
let finishedExamsData = [];
let pendingPage = 1;
let finishedPage = 1;
const itemsPerPage = 6; // Có thể tùy chỉnh số lượng hiển thị trên 1 trang (ví dụ: 8 card)

// Lấy dữ liệu từ file JSON
async function fetchExamData() {
    try {
        // Ưu tiên lấy từ localStorage để giữ lại các thay đổi sau khi chấm bài
        const storedData = localStorage.getItem("examData");
        if (storedData) {
            examData = JSON.parse(storedData);
            
            // Tự động load lại từ file nếu dữ liệu cũ trong localStorage chưa có thuộc tính 'mentor'
            if (examData.length > 0 && !examData[0].hasOwnProperty("mentor")) {
                const response = await fetch("./Data.json");
                examData = await response.json();
                localStorage.setItem("examData", JSON.stringify(examData));
            }
        } else {
            const response = await fetch("./Data.json");
            examData = await response.json();
            localStorage.setItem("examData", JSON.stringify(examData));
        }

        // Thêm select lọc theo Mentor nếu là Admin
        if (userRole === "admin" && !document.getElementById("mentorFilter")) {
            const firstSelect = select[0];
            if (firstSelect && firstSelect.parentNode) {
                firstSelect.insertAdjacentHTML('afterend', `
                    <select id="mentorFilter" style=" width: 150px; padding: 0 4px; border-radius: 8px; border: 2px solid transparent; cursor: pointer;">
                        <option value="all">Tất cả Mentor</option>
                    </select>
                `);
                mentorSelect = document.getElementById("mentorFilter");
                mentorSelect.addEventListener("change", applyFilters);
                
                // Cập nhật lại danh sách select để tái sử dụng hiệu ứng click ra ngoài
                select = document.querySelectorAll("select");
                mentorSelect.addEventListener("click", () => {
                    activeMore();
                    mentorSelect.classList.add("active");
                });
            }
        }

        // Đổ dữ liệu các mentor vào select box nếu là admin
        if (userRole === "admin" && mentorSelect) {
            const uniqueMentors = [...new Set(examData.map(item => item["mentor"]).filter(Boolean))];
            let optionsHTML = `<option value="all">Tất cả Mentor</option>`;
            uniqueMentors.forEach(m => {
                optionsHTML += `<option value="${m}">${m}</option>`;
            });
            mentorSelect.innerHTML = optionsHTML;
        }

        applyFilters();
    } catch (error) {
        console.error("Lỗi tải dữ liệu Data.json:", error);
    }
}

// Hàm tạo HTML cho các nút số trang
function generatePaginationHTML(currentPage, totalPages) {
    if (totalPages <= 1) return `<button class="btnPage active" data-page="1" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ccc; border-radius: 4px; background: var(--primary-color, #1a73e8); color: white;">1</button>`;

    let pagesHTML = "";
    const createBtn = (page) =>
        `<button class="btnPage ${page === currentPage ? "active" : ""}" data-page="${page}" style="padding: 5px 10px; cursor: pointer; border: 1px solid #ccc; border-radius: 4px; transition: all 0.2s; ${page === currentPage ? "background: var(--primary-color, #1a73e8); color: white;" : "background: white; color: black;"}">${page}</button>`;

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pagesHTML += createBtn(i);
        }
    } else {
        pagesHTML += createBtn(1);

        if (currentPage > 3) pagesHTML += `<span style="padding: 5px; user-select: none;">...</span>`;

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage === 1) endPage = Math.min(totalPages - 1, 3);
        if (currentPage === totalPages) startPage = Math.max(2, totalPages - 2);

        for (let i = startPage; i <= endPage; i++) {
            pagesHTML += createBtn(i);
        }

        if (currentPage < totalPages - 2) pagesHTML += `<span style="padding: 5px; user-select: none;">...</span>`;

        pagesHTML += createBtn(totalPages);
    }
    return pagesHTML;
}

function renderSection(sectionDataCard, data, currentPage) {
    const container = document.querySelector(`[data-card="${sectionDataCard}"] .boxListCard`);
    const pagination = document.querySelector(`[data-card="${sectionDataCard}"] .pagination`);
    if (!container) return;

    container.innerHTML = "";

    const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    paginatedData.forEach((item) => {
        const status = item["trạng thái"].toLowerCase();
        const isFinished = status === "đã chấm";
        const point = item["số điểm"];
        const isPassed = point >= 80; // Giả sử >= 80 điểm là Đạt

        // Format hiển thị text và class
        const statusCapitalized = item["trạng thái"].charAt(0).toUpperCase() + item["trạng thái"].slice(1);
        const resultText = isFinished ? (isPassed ? "Đạt" : "Chưa đạt") : "Chưa đạt";
        const blockPointClass = isFinished && isPassed ? "blockPoint obtain" : "blockPoint notObtain";

        const examiner = isFinished && item["người chấm"] ? item["người chấm"] : "Chưa có";

        const cardHTML = `
            <div class="card">
                <div class="statusBadge">${statusCapitalized}</div>
                <div class="tagExercise">${item["loại bài tập"]}</div>
                <div class="nameExercise">${item["tên bài tập"]}</div>
                <div class="nameSubmitter">
                    <i class="fa-regular fa-user"></i>
                    <span>${item["Tên học viên"]}</span>
                </div>
                <div class="${blockPointClass}">
                    <div class="blockContent">
                        <div class="result">${resultText}</div>
                        <div class="examiner">Người chấm: <span>${examiner}</span></div>
                    </div>
                    <div class="pointOfUser"><span id="pointed">${point}</span>%</div>
                </div>
                <div class="wrapTimeAndBtn">
                    <div class="submittionTime">${item["thời gian nộp"]}</div>
                    ${isFinished ? '<div class="secondary btnSubmit">Xem lại</div>' : '<div class="primary btnSubmit"><i class="fa-solid fa-pen-to-square"></i> <span>Chấm bài</span></div>'}
                </div>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", cardHTML);
    });

    if (pagination) {
        const pageNumbers = pagination.querySelector(".pageNumbers");
        if (pageNumbers) pageNumbers.innerHTML = generatePaginationHTML(currentPage, totalPages);

        const btnPrev = pagination.querySelector(".btnPrev");
        const btnNext = pagination.querySelector(".btnNext");

        if (btnPrev) {
            btnPrev.disabled = currentPage === 1;
            btnPrev.style.opacity = currentPage === 1 ? "0.5" : "1";
            btnPrev.style.cursor = currentPage === 1 ? "not-allowed" : "pointer";
        }
        if (btnNext) {
            btnNext.disabled = currentPage === totalPages;
            btnNext.style.opacity = currentPage === totalPages ? "0.5" : "1";
            btnNext.style.cursor = currentPage === totalPages ? "not-allowed" : "pointer";
        }
    }
}

// Render các card bài tập
function renderCards() {
    renderSection("notFinish", pendingExamsData, pendingPage);
    renderSection("finish", finishedExamsData, finishedPage);

    // Cập nhật số lượng bài tập
    const pendingCount = document.querySelector('[data-card="notFinish"] .quantityExam');
    const finishedCount = document.querySelector('[data-card="finish"] .quantityExam');

    if (pendingCount) pendingCount.textContent = pendingExamsData.length;
    if (finishedCount) finishedCount.textContent = finishedExamsData.length;
}

// Hàm lọc dữ liệu
function applyFilters() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedType = select.length > 0 ? select[0].value.toLowerCase() : "all";
    const selectedMentor = mentorSelect ? mentorSelect.value : "all";

    const filteredData = examData.filter((item) => {
        // Nếu là mentor thì chỉ thấy bài của chính mình
        if (userRole === "mentor" && (item["mentor"] || "").trim().toLowerCase() !== userName.trim().toLowerCase()) {
            return false;
        }

        const matchName = item["Tên học viên"].toLowerCase().includes(searchTerm);
        const matchExercise = item["tên bài tập"].toLowerCase().includes(searchTerm);
        // Chỉ cần khớp 1 trong 2: Tên học viên HOẶC Tên bài tập
        const matchSearch = matchName || matchExercise;

        const itemType = item["loại bài tập"].toLowerCase();
        const matchType = selectedType === "all" || itemType === selectedType;

        // Nếu là admin, lọc thêm theo thẻ select mentor
        const matchMentor = (userRole === "admin" && selectedMentor !== "all") ? item["mentor"] === selectedMentor : true;

        return matchSearch && matchType && matchMentor;
    });

    // Phân loại dữ liệu
    pendingExamsData = filteredData.filter((item) => item["trạng thái"].toLowerCase() !== "đã chấm");
    finishedExamsData = filteredData.filter((item) => item["trạng thái"].toLowerCase() === "đã chấm");

    // Reset về trang 1 mỗi khi filter
    pendingPage = 1;
    finishedPage = 1;

    renderCards();
}

// Lắng nghe sự kiện filter từ thanh Search và Option Box
if (searchInput) searchInput.addEventListener("input", applyFilters);
if (select.length > 0) select[0].addEventListener("change", applyFilters);

const btnReset = document.getElementById("btnResetFilters");
if (btnReset) {
    btnReset.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        if (select.length > 0) select[0].value = "All";
        if (mentorSelect) mentorSelect.value = "all";
        applyFilters();
    });
}

// Lắng nghe sự kiện click cho các nút phân trang
document.addEventListener("click", (e) => {
    const btnPrev = e.target.closest(".btnPrev");
    const btnNext = e.target.closest(".btnNext");
    const btnPage = e.target.closest(".btnPage");

    if (btnPrev || btnNext || btnPage) {
        const section = (btnPrev || btnNext || btnPage).closest("section");
        if (section) {
            const dataCard = section.getAttribute("data-card");
            if (dataCard === "notFinish") {
                const totalPages = Math.ceil(pendingExamsData.length / itemsPerPage) || 1;
                if (btnPrev && pendingPage > 1) {
                    pendingPage--;
                } else if (btnNext && pendingPage < totalPages) {
                    pendingPage++;
                } else if (btnPage) {
                    pendingPage = parseInt(btnPage.getAttribute("data-page"));
                }
                renderCards();
            } else if (dataCard === "finish") {
                const totalPages = Math.ceil(finishedExamsData.length / itemsPerPage) || 1;
                if (btnPrev && finishedPage > 1) {
                    finishedPage--;
                } else if (btnNext && finishedPage < totalPages) {
                    finishedPage++;
                } else if (btnPage) {
                    finishedPage = parseInt(btnPage.getAttribute("data-page"));
                }
                renderCards();
            }
        }
    }

    // Xử lý sự kiện nhấn nút "Chấm bài" hoặc "Xem lại"
    const btnSubmit = e.target.closest(".btnSubmit");
    if (btnSubmit) {
        const card = btnSubmit.closest(".card");
        const studentName = card.querySelector(".nameSubmitter span").textContent;
        const exerciseName = card.querySelector(".nameExercise").textContent;

        // Tìm bài tập tương ứng trong mảng dữ liệu
        const itemToGrade = examData.find((item) => item["Tên học viên"] === studentName && item["tên bài tập"] === exerciseName);

        if (itemToGrade) {
            // Lưu thông tin bài đang chấm vào localStorage và chuyển trang
            localStorage.setItem("currentGradingItem", JSON.stringify(itemToGrade));
            window.location.href = "../../pages/grading/index.html";
        }
    }
});

// Khởi chạy việc lấy dữ liệu khi DOM được load
document.addEventListener("DOMContentLoaded", fetchExamData);
