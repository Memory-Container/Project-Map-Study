import { dataStudentOfAdmin } from "./dataStudentOfAdmin.js";

// Sử dụng 'let' để có thể ghi đè mảng khi xóa học viên
let studentsData = dataStudentOfAdmin.map((student) => ({
    ...student,
    isPinned: false,
}));

const searchBar = document.querySelector(".searchBar");
const searchInput = document.querySelector(".searchBar .bar");
const select = document.querySelectorAll("select");
const tableList = document.querySelector(".tableList");

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

// CÁC HÀM TRỢ GIÚP (HELPER)

function getAvatarName(fullName) {
    const words = fullName.trim().split(" ");
    if (words.length >= 2) return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    return words[0][0].toUpperCase();
}

function getCourseValue(courseName) {
    const map = { "Web Dev": "web", "App Dev": "app", Design: "design", "Cơ Bản": "basic" };
    return map[courseName] || "basic";
}

function updateStatistics(students) {
    const dataElements = document.querySelectorAll(".cardContent .data");
    if (dataElements.length >= 3) {
        dataElements[0].innerText = students.length;
        dataElements[1].innerText = students.filter((s) => s.trangThai === "Đang học").length;
        dataElements[2].innerText = students.filter((s) => s.trangThai === "Không HĐ").length;
    }
}

// LOGIC SẮP XẾP (ƯU TIÊN CHECKBOX)

function sortStudentData(data) {
    return [...data].sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        if (a.trangThai !== b.trangThai) return a.trangThai === "Đang học" ? -1 : 1;

        const nameA = a.hocVien.trim().split(" ").pop();
        const nameB = b.hocVien.trim().split(" ").pop();

        if (nameA === nameB) {
            return a.hocVien.localeCompare(b.hocVien, "vi");
        }

        return nameA.localeCompare(nameB, "vi");
    });
}

// RENDER BẢNG & SỰ KIỆN TƯƠNG TÁC

function renderTable(students) {
    const existingRows = document.querySelectorAll(".tableList .tableStudent");
    existingRows.forEach((row) => row.remove());

    let html = "";
    students.forEach((item) => {
        const isOffline = item.trangThai === "Không HĐ";
        const rowClass = isOffline ? "table tableStudent tableOffline" : "table tableStudent tableOnline";
        const statusVal = isOffline ? "offline" : "online";
        const courseVal = getCourseValue(item.khoaHoc);
        const avatar = getAvatarName(item.hocVien);
        const isChecked = item.isPinned ? "checked" : "";

        // Gắn data-zalo vào cả checkbox và nút xóa
        html += `
            <div class="${rowClass}">
                <div class="checkBox">
                    <input type="checkbox" class="targetStudent" data-zalo="${item.zalo}" ${isChecked} />
                </div>
                <div class="students">
                    <div class="studentInfor">
                        <div class="avatar">${avatar}</div>
                        <div class="name">${item.hocVien}</div>
                    </div>
                </div>
                <div class="zalo"><div class="zaloStudent">${item.zalo}</div></div>
                <div class="course"><div class="courseStudent" value="${courseVal}">${item.khoaHoc}</div></div>
                <div class="state"><div class="stateStudent" value="${item.donVi}">${item.donVi}</div></div>
                <div class="state"><div class="stateStudent" value="${statusVal}">${item.trangThai}</div></div>
                <div class="option">
                    <div class="optionChoose">
                        <div class="optionButton seen"><i class="fa-solid fa-eye icon"></i> Xem</div>
                        <div class="optionButton edit"><i class="fa-regular fa-pen-to-square icon"></i> Sửa</div>
                        <div class="optionButton delet" data-zalo="${item.zalo}">
                            <i class="fa-regular fa-trash-can icon"></i> Xóa
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    if (tableList) tableList.insertAdjacentHTML("beforeend", html);
}

// Lắng nghe sự kiện trong bảng (Checkbox và Nút Xóa)
if (tableList) {
    // Sự kiện thay đổi Checkbox (Ghim học viên)
    tableList.addEventListener("change", (e) => {
        if (e.target.classList.contains("targetStudent")) {
            const zalo = e.target.getAttribute("data-zalo");
            const isChecked = e.target.checked;

            const studentIndex = studentsData.findIndex((s) => s.zalo === zalo);
            if (studentIndex !== -1) {
                studentsData[studentIndex].isPinned = isChecked;
            }
            applyFilters();
        }
    });

    // Sự kiện Click (Cho nút Xóa)
    tableList.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".delet");

        if (deleteBtn) {
            const zalo = deleteBtn.getAttribute("data-zalo");

            const studentToDelete = studentsData.find((s) => s.zalo === zalo);

            if (studentToDelete) {
                const isConfirmed = confirm(`Bạn có chắc chắn muốn xóa học viên "${studentToDelete.hocVien}" khỏi danh sách không?`);

                if (isConfirmed) {
                    studentsData = studentsData.filter((student) => student.zalo !== zalo);

                    applyFilters();
                }
            }
        }
    });
}

// BỘ LỌC (FILTER)

function applyFilters() {
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const courseVal = select[0] ? select[0].value : "all";
    const statusText = select[1] ? select[1].options[select[1].selectedIndex].text.trim() : "Tất cả trạng thái";
    const unitVal = select[2] ? select[2].value : "allUnit";

    let filtered = [...studentsData];

    if (keyword !== "") filtered = filtered.filter((item) => item.hocVien.toLowerCase().includes(keyword));

    if (courseVal !== "all") {
        const courseMap = { basic: "Cơ Bản", web: "Web Dev", app: "App Dev", design: "Design" };
        filtered = filtered.filter((item) => item.khoaHoc === courseMap[courseVal]);
    }

    if (statusText !== "Tất cả trạng thái") {
        const expectedStatus = statusText === "Không hoạt động" ? "Không HĐ" : "Đang học";
        filtered = filtered.filter((item) => item.trangThai === expectedStatus);
    }

    if (unitVal !== "allUnit") filtered = filtered.filter((item) => item.donVi === unitVal);

    const finalData = sortStudentData(filtered);

    renderTable(finalData);
    updateStatistics(studentsData);
}

// SỰ KIỆN RESET & KHỞI CHẠY

const btnReset = document.getElementById("btnResetFilters");
if (btnReset) {
    btnReset.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        if (select) select.forEach((sel) => (sel.selectedIndex = 0));
        applyFilters();
    });
}

select.forEach((sel) => sel.addEventListener("change", applyFilters));
if (searchInput) searchInput.addEventListener("input", applyFilters);

applyFilters();
