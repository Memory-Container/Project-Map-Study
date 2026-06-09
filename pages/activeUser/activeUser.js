document.addEventListener('DOMContentLoaded', () => {
    const boxListCard = document.querySelector('.containerCards[data-card="actives"] .boxListCard');
    const quantityActive = document.querySelector('.containerCards[data-card="actives"] .quantityActive');
    const paginationContainer = document.querySelector('.containerCards[data-card="actives"] .pagination');
    const pageNumbersContainer = paginationContainer ? paginationContainer.querySelector('.pageNumbers') : null;
    const btnPrev = paginationContainer ? paginationContainer.querySelector('.btnPrev') : null;
    const btnNext = paginationContainer ? paginationContainer.querySelector('.btnNext') : null;
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const btnResetFilter = document.getElementById('btnResetFilter');
    const filterForm = document.getElementById('filterForm');
    const upcomingContainer = document.querySelector('.blockSecond .boxSecond:last-child .card');

    let currentPage = 1;
    const itemsPerPage = 6; // 3 ngang x 2 dọc = tối đa 6 card 1 trang
    let allActivities = [];
    let filteredActivities = [];

    // Hàm lấy dữ liệu từ API
    async function fetchActivities() {
        try {
            const response = await fetch('https://6a252caf5447714a6f8339b4.mockapi.io/actives');
            if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
            const data = await response.json();
            console.log("Dữ liệu trả về từ API:", data); // In ra Console để kiểm tra
            return data;
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu hoạt động:', error);
            if (boxListCard) {
                boxListCard.innerHTML = `<p class="text-danger w-100 text-center">Đã xảy ra lỗi khi tải dữ liệu: ${error.message}</p>`;
            }
            return null;
        }
    }

    // Hàm xác định trạng thái và giao diện nút
    function calculateStatus(startDateStr, endDateStr) {
        const now = new Date();
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);

        if (now < start) {
            return {
                text: "Sắp diễn ra",
                btnText: "Nhắc hẹn",
                badgeClass: "text-bg-warning",
                btnClass: "primary border-0 btn-warning",
                textColor:"#F0A000"
            };
        } else if (now >= start && now <= end) {
            return {
                text: "Đang diễn ra",
                btnText: "Tham gia ngay",
                badgeClass: "text-bg-success",
                btnClass: "primary border-0 btn-warning",
                textColor:"#00B44E"
            };
        } else {
            return {
                text: "Đã kết thúc",
                btnText: "Đã kết thúc",
                badgeClass: "text-bg-secondary",
                btnClass: "btn-secondary",
                textColor:"#64748B",
                disabled: true
            };
        }
    }

    // Hàm tính số ngày còn lại
    function calculateDaysLeft(targetDateStr) {
        const now = new Date();
        const target = new Date(targetDateStr);
        const diffTime = target.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    }

    // Hàm định dạng ngày tháng
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "Chưa cập nhật";
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Hàm chuẩn hóa ngày từ API (để fix lỗi DD/MM/YYYY bị JS hiểu nhầm thành MM/DD/YYYY)
    function parseDateFromAPI(dateVal, fallbackTime) {
        if (!dateVal) return new Date(fallbackTime).toISOString();
        
        if (typeof dateVal === 'string') {
            // Kiểm tra nếu API trả về đúng định dạng DD/MM/YYYY hoặc DD-MM-YYYY
            const parts = dateVal.split(/[\/\-]/);
            if (parts.length === 3 && parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length === 4) {
                const day = parts[0].padStart(2, '0');
                const month = parts[1].padStart(2, '0');
                const year = parts[2];
                const parsedDate = new Date(`${year}-${month}-${day}T00:00:00`); // Ép về chuẩn ISO an toàn
                if (!isNaN(parsedDate.getTime())) return parsedDate.toISOString();
            }
        }
        
        // Thử parse bằng Date mặc định với các format khác
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) return new Date(fallbackTime).toISOString();
        
        return d.toISOString();
    }

    // Hàm xử lý và sắp xếp dữ liệu
    function processAndSortData(dataArray) {
        const now = new Date().getTime();

        const enrichedData = dataArray.map(item => {
            const startDateStr = parseDateFromAPI(item.startDate || item.createdAt, now);
            const endDateStr = parseDateFromAPI(item.endDate, now + 7 * 24 * 60 * 60 * 1000); 
            const name = item.name || "Chưa có tên hoạt động";
            const describe = item.describe || item.description || "Chưa có thông tin mô tả chi tiết";
            const attend = item.attend || item.attendees || 0;
            
            const statusInfo = calculateStatus(startDateStr, endDateStr);
            
            let priority;
            let timeDiff;
            
            if (statusInfo.text === "Đang diễn ra") {
                priority = 1;
                timeDiff = new Date(endDateStr).getTime() - now; // Càng sát giờ kết thúc càng lên đầu
            } else if (statusInfo.text === "Sắp diễn ra") {
                priority = 2;
                timeDiff = new Date(startDateStr).getTime() - now; // Càng sát giờ bắt đầu càng lên đầu
            } else {
                priority = 3;
                timeDiff = now - new Date(endDateStr).getTime(); // Càng mới kết thúc càng lên đầu
            }

            return { 
                ...item, startDateStr, endDateStr, name, describe, attend, statusInfo, priority, timeDiff 
            };
        });

        // Sắp xếp: Ưu tiên trạng thái trước, sau đó tới thời gian ngắn nhất
        enrichedData.sort((a, b) => {
            if (a.priority !== b.priority) return a.priority - b.priority;
            return a.timeDiff - b.timeDiff;
        });

        return enrichedData;
    }

    // Hàm render 6 card trên trang hiện tại
    function renderPage() {
        if (!boxListCard) return;
        boxListCard.innerHTML = ''; 

        const totalPages = Math.ceil(filteredActivities.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = filteredActivities.slice(startIndex, startIndex + itemsPerPage);
        
        if (filteredActivities.length === 0) {
            boxListCard.innerHTML = '<p class="text-muted w-100 text-center mt-3">Không tìm thấy hoạt động nào phù hợp.</p>';
            if (paginationContainer) paginationContainer.style.display = 'none';
            return;
        }

        paginatedData.forEach(item => {
            const { startDateStr, endDateStr, name, describe, attend, statusInfo } = item;
            
            let daysLeftHTML = '<div></div>'; 
            if (statusInfo.text === "Sắp diễn ra") {
                daysLeftHTML = `<span class="badge border-radius-lg py-1 px-3 fw-medium" style="font-size: 13px; border: 2px solid #e67c04; color: #e67c04; width: fit-content; background-color:#fff7ee;">Còn ${calculateDaysLeft(startDateStr)} ngày</span>`;
            } else if (statusInfo.text === "Đang diễn ra") {
                daysLeftHTML = `<span class="badge border-radius-lg py-1 px-3 fw-medium" style="font-size: 13px; border: 2px solid #e67c04; color: #e67c04; width: fit-content; background-color:#fff7ee;">Còn ${calculateDaysLeft(endDateStr)} ngày</span>`;
            }

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="d-flex justify-content-between align-items-center w-100">
                    <span style="color:${statusInfo.textColor}; font-size: 16px; font-weight: 700;">${statusInfo.text}</span>
                    ${daysLeftHTML}
                </div>
                <div class="text-center mt-2">
                    <i class="fa-solid fa-calendar-check fa-3x" style="color: #ffa135;"></i>
                </div>
                <h5 class="text-center fw-bold m-0 mt-2" style="color: var(--color-title);">${name}</h5>
                <p class="text-muted small m-0 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-align: justify;" title="${describe}">${describe}</p>
                <div class="d-flex flex-column gap-2 mt-auto pt-2">
                    <div class="d-flex justify-content-between align-items-center flex-wrap w-100 gap-1">
                        <div class="small d-flex align-items-center gap-2"><i class="fa-regular fa-calendar-plus text-secondary" style="width: 16px;"></i><span>Bắt đầu: <strong>${formatDate(startDateStr)}</strong></span></div>
                        <div class="small d-flex align-items-center gap-2"><i class="fa-regular fa-calendar-xmark text-secondary" style="width: 16px;"></i><span>Kết thúc: <strong>${formatDate(endDateStr)}</strong></span></div>
                    </div>
                    <div class="small d-flex align-items-center gap-2"><i class="fa-solid fa-users text-secondary" style="width: 16px;"></i><span>Tham gia: <strong style="color: #e36111;">${attend}</strong> người</span></div>
                    <button class="btn w-100 ${statusInfo.btnClass} fw-bold mt-2" style="border-radius: 8px;" ${statusInfo.disabled ? 'disabled' : ''}>${statusInfo.btnText}</button>
                </div>`;
            boxListCard.appendChild(card);
        });

        renderPagination(totalPages);
    }

    // Hàm render cụm số trang
    function renderPagination(totalPages) {
        if (!pageNumbersContainer || !btnPrev || !btnNext) return;

        pageNumbersContainer.innerHTML = '';
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        } else {
            paginationContainer.style.display = 'flex';
        }

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.style.padding = "5px 12px";
            btn.style.fontWeight = "bold";
            btn.style.borderRadius = "8px";
            
            if (i === currentPage) {
                btn.className = 'btnPage btn btn-primary primary';
                btn.style.border = "1px solid #ffa135";
            } else {
                btn.className = 'btnPage btn';
                btn.style.backgroundColor = "white";
                btn.style.color = "#ffa135";
                btn.style.border = "1px solid #ffa135";
            }

            btn.addEventListener('click', () => {
                currentPage = i;
                renderPage();
            });
            pageNumbersContainer.appendChild(btn);
        }

        btnPrev.disabled = currentPage === 1;
        btnPrev.style.opacity = currentPage === 1 ? '0.5' : '1';
        btnNext.disabled = currentPage === totalPages;
        btnNext.style.opacity = currentPage === totalPages ? '0.5' : '1';
    }

    // Gán sự kiện lùi/tới cho nút điều hướng phân trang
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage();
            }
        });
    }
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredActivities.length / itemsPerPage) || 1;
            if (currentPage < totalPages) {
                currentPage++;
                renderPage();
            }
        });
    }

    // Hàm xử lý lọc dữ liệu
    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const selectedStatus = categorySelect ? categorySelect.value : 'all';

        filteredActivities = allActivities.filter(item => {
            const matchName = item.name.toLowerCase().includes(searchTerm);
            const matchStatus = (selectedStatus === 'all' || selectedStatus === '') ? true : item.statusInfo.text === selectedStatus;
            return matchName && matchStatus;
        });

        if (quantityActive) quantityActive.textContent = filteredActivities.length;
        currentPage = 1;
        renderPage();
    }

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyFilters);
    if (btnResetFilter) {
        btnResetFilter.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (categorySelect) categorySelect.value = 'all';
            applyFilters();
        });
    }
    if (filterForm) {
        filterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            applyFilters();
        });
    }

    // Hàm render danh sách "Những hoạt động sắp diễn ra" (cột bên phải)
    function renderUpcomingActivities(activities) {
        if (!upcomingContainer) return;
        
        // Lọc ra các hoạt động có trạng thái "Sắp diễn ra"
        const upcomingActivities = activities.filter(item => item.statusInfo.text === "Sắp diễn ra");
        
        if (upcomingActivities.length === 0) {
            upcomingContainer.innerHTML = '<p class="text-muted text-center m-0 py-2">Không có hoạt động nào sắp diễn ra.</p>';
            upcomingContainer.style.overflowY = 'hidden';
            return;
        }

        // Giới hạn chiều cao cho khoảng 5 sự kiện (khoảng ~350px) và bật thanh cuộn (scroll)
        if (upcomingActivities.length > 5) {
            upcomingContainer.style.maxHeight = '350px';
            upcomingContainer.style.overflowY = 'auto';
        } else {
            upcomingContainer.style.maxHeight = 'none';
            upcomingContainer.style.overflowY = 'hidden';
        }

        upcomingContainer.innerHTML = upcomingActivities.map((item, index) => `
            <div class="d-flex align-items-center gap-3 ${index < upcomingActivities.length - 1 ? 'border-bottom pb-3 mb-3' : 'pb-1'}">
                <div class="text-center" style="width: 30px;">
                    <i class="fa-regular fa-calendar-check fa-xl" style="color: #ffa135;"></i>
                </div>
                <div class="fw-bold" style="color: var(--color-title); font-size: 14.5px; line-height: 1.4;">${item.name}</div>
            </div>
        `).join('');
    }

    // Hàm nhận dữ liệu từ API và khởi chạy hiển thị
    function renderCards(activities) {
        console.log("Đã vào hàm renderCards", activities);
        if (!boxListCard) {
            console.error("Lỗi: Không tìm thấy thẻ HTML chứa class .boxListCard!");
            return;
        }
        
        let dataArray = [];
        if (Array.isArray(activities)) {
            dataArray = activities;
        } else if (activities && Array.isArray(activities.data)) {
            dataArray = activities.data;
        } else if (activities && Array.isArray(activities.items)) {
            dataArray = activities.items;
        } else {
            console.warn("API trả về không phải là một Mảng (Array) hợp lệ:", activities);
        }

        if (dataArray.length === 0) {
            boxListCard.innerHTML = '<p class="text-muted w-100 text-center mt-3">Hiện chưa có hoạt động nào hoặc dữ liệu API sai cấu trúc.</p>';
            if (paginationContainer) paginationContainer.style.display = 'none';
            if (quantityActive) quantityActive.textContent = 0;
            return;
        }

        allActivities = processAndSortData(dataArray);
        applyFilters();
        renderUpcomingActivities(allActivities);
    }

    // Hàm khởi tạo để điều phối logic
    async function init() {
        console.log("👉 Bắt đầu gọi API...");
        const activities = await fetchActivities();
        console.log("👉 Kết quả gọi API trong hàm init:", activities);
        if (activities) {
            renderCards(activities);
        } else {
            console.error("Không thể gọi renderCards vì dữ liệu bị null hoặc lỗi.");
        }
    }
    init();
});
