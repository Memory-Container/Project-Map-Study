document.addEventListener("DOMContentLoaded", async () => {
    // 1. Lấy dữ liệu bài đang chấm từ localStorage
    const currentGradingItemData = localStorage.getItem("currentGradingItem");
    if (!currentGradingItemData) {
        alert("Không tìm thấy dữ liệu bài cần chấm. Quay lại danh sách!");
        window.location.href = "../../pages/gradingPage/index.html";
        return;
    }

    const currentItem = JSON.parse(currentGradingItemData);
    const basePoint = 0; // Điểm mặc định
    let currentScore = basePoint; // Khởi tạo điểm ban đầu

    // 2. Cập nhật thông tin lên UI
    document.querySelector(".tagExercise").textContent = currentItem["loại bài tập"];
    document.querySelector(".nameExercise").textContent = currentItem["tên bài tập"];

    // Đổi màu badge text dựa vào trạng thái (Chờ chấm / Đã chấm)
    document.querySelector(".tagStatusBadge").textContent = currentItem["trạng thái"].charAt(0).toUpperCase() + currentItem["trạng thái"].slice(1);

    document.getElementById("name").textContent = currentItem["Tên học viên"];
    document.getElementById("timely").textContent = currentItem["thời gian nộp"];

    const scoreDisplay = document.getElementById("blockPointed");
    scoreDisplay.textContent = currentScore;

    // 3. Tải file grading.json để lấy tiêu chí chấm
    try {
        const response = await fetch("grading.json");
        const gradingConfig = await response.json();

        // Map loại bài tập từ Data.json sang định dạng của grading.json
        const typeMapping = {
            JS: "JavaScript",
            HTML: "HTML_CSS",
            CSS: "HTML_CSS",
            C: "C",
            Git: "Git",
        };
        const mappedType = typeMapping[currentItem["loại bài tập"]] || currentItem["loại bài tập"];

        // Tìm đối tượng bài tập tương ứng trong danhSachTieuChiChamDiem
        const gradingData = gradingConfig.danhSachTieuChiChamDiem.find((item) => item.loaiBaiTap === mappedType);
        const criteriaObj = gradingData ? gradingData.tieuChi : {};

        renderCriteria(criteriaObj);

        // Nếu là trạng thái "đã chấm", tiến hành load lại dữ liệu để Xem lại / Cập nhật
        if (currentItem["trạng thái"].toLowerCase() === "đã chấm") {
            if (currentItem["chi tiết chấm"]) {
                currentItem["chi tiết chấm"].forEach((savedInput) => {
                    const el = document.getElementById(savedInput.id);
                    if (el) el.checked = savedInput.checked;
                });
                calculateScore();
            }
            if (currentItem["nhận xét"]) {
                document.getElementById("commentExaminer").value = currentItem["nhận xét"];
            }

            // Cập nhật text nút để rõ nghĩa bề mặt hành động
            document.querySelector(".btnFinish").textContent = "Cập nhật bài chấm";
        } else {
            // Nếu chưa chấm, tính lại điểm để cập nhật điểm từ các tiêu chí được tự động tick
            calculateScore();
        }
    } catch (error) {
        console.error("Lỗi tải tiêu chí chấm:", error);
    }

    // Hàm hỗ trợ dịch các key tiếng Anh/camelCase sang Tiếng Việt có dấu
    function formatText(key) {
        const dictionary = {
            nopDungHan:"Nộp đúng hạn",
            khoiTaoVaRemote: "Khởi tạo và Remote",
            lichSuCommit: "Lịch sử Commit",
            thaoTacBranching: "Thao tác Branching",
            noiDungCommitMessage: "Nội dung Commit Message",
            kichThuocVaTanSuatCommit: "Kích thước và tần suất Commit",
            phanNhanh: "Phân nhánh",
            cauTrucFile: "Cấu trúc File",
            hienThiCoBan: "Hiển thị cơ bản",
            taiNguyen: "Tài nguyên",
            cauTrucHTML_Semantic: "Cấu trúc HTML Semantic",
            cssLayoutVaNaming: "CSS Layout và Naming",
            responsive: "Responsive",
            khongLoiCuPhap: "Không lỗi cú pháp",
            tuongTacCoBan: "Tương tác cơ bản",
            nhungDungCach: "Nhúng đúng cách",
            cauTrucCodeVaBien: "Cấu trúc Code và Biến",
            thaoTacDOMVaSuKien: "Thao tác DOM và Sự kiện",
            logicVaCuPhapHienDai: "Logic và cú pháp hiện đại",
            bienDichThanhCong: "Biên dịch thành công",
            thucThiCoBan: "Thực thi cơ bản",
            khongVongLapVoTan: "Không vòng lặp vô tận",
            doChinhXacVaThuatToan: "Độ chính xác và Thuật toán",
            cauTrucHamVaCleanCode: "Cấu trúc hàm và Clean Code",
            quanLyBoNhoVaConTro: "Quản lý bộ nhớ và Con trỏ",
        };

        if (dictionary[key]) return dictionary[key];

        // Nếu key không có trong từ điển, tự động tách các từ viết hoa (chữ cái đầu) để tạo label
        const result = key.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    // 4. Hàm Render tiêu chí chấm
    function renderCriteria(tieuChi) {
        const boxTaskList = document.querySelector(".boxTaskList");
        boxTaskList.innerHTML = ""; // Xóa rỗng trước khi render

        let index = 0;
        for (const [key, value] of Object.entries(tieuChi)) {
            let taskHTML = "";
            const title = formatText(key);

            // Nếu value là chuỗi (VD: "10%"), nó sẽ là dạng checkbox
            if (typeof value === "string") {
                const point = parseInt(value);
                const isChecked = key === "nopDungHan" ? "checked" : "";
                const isDisabled = key === "nopDungHan" ? "disabled" : "";
                taskHTML = `
                    <div class="task taskChangeFlex">
                        <div class="wrapNameCheckBox">
                            <input type="checkbox" class="eval-input" data-point="${point}" id="check_${index}" ${isChecked} ${isDisabled} />
                            <label for="check_${index}" class="nameCheckBox">${title}</label>
                        </div>
                        <div class="pointTask"><span>${point}</span>%</div>
                    </div>
                `;
                // Nếu value là Object (VD: { "yeu": "3%", ... }), nó sẽ là dạng radio
            } else if (typeof value === "object") {
                let optionsHTML = Object.entries(value)
                    .map(([optKey, optVal], optIdx) => {
                        const optLabel = formatText(optKey);
                        const optPoint = parseInt(optVal);
                        return `
                    <div class="norm">
                        <input type="radio" name="radio_group_${index}" class="eval-input chooseNorm" data-point="${optPoint}" id="radio_${index}_${optIdx}" />
                        <label for="radio_${index}_${optIdx}" class="pointTask" style="cursor: pointer; display: flex; align-items: center; gap: 5px;">
                           <span>${optLabel}</span>
                        </label>
                    </div>
                    `;
                    })
                    .join("");

                taskHTML = `
                    <div class="task">
                        <div class="nameCheckBox">${title}</div>
                        <form class="wrapNorm">
                            ${optionsHTML}
                        </form>
                    </div>
                `;
            }

            boxTaskList.insertAdjacentHTML("beforeend", taskHTML);
            index++;
        }

        // Lắng nghe sự kiện thay đổi để tính điểm
        const evalInputs = document.querySelectorAll(".eval-input");
        evalInputs.forEach((input) => {
            input.addEventListener("change", calculateScore);
        });
    }

    // 5. Hàm tính điểm
    function calculateScore() {
        let total = basePoint; 

        // Cộng điểm từ checkbox
        const checkboxes = document.querySelectorAll(".eval-input[type='checkbox']:checked");
        checkboxes.forEach((cb) => {
            total += parseInt(cb.getAttribute("data-point") || 0);
        });

        // Cộng điểm từ radio
        const radios = document.querySelectorAll(".eval-input[type='radio']:checked");
        radios.forEach((rd) => {
            total += parseInt(rd.getAttribute("data-point") || 0);
        });

        // Đếm tổng số lượng tiêu chí chấm điểm (số class="task" được render)
        const totalCriteria = document.querySelectorAll(".task").length;
        if (totalCriteria > 0) {
            total = Math.round(total / totalCriteria); // Chia trung bình và làm tròn số
        }

        // Đảm bảo điểm không vượt quá 100%
        if (total > 100) total = 100;

        currentScore = total;
        scoreDisplay.textContent = currentScore;
    }

    // 6. Hàm lưu dữ liệu vào localStorage
    function saveGradingData() {
    

        // Lấy lại danh sách Data.json từ localStorage
        let allExamsData = [];
        const storedData = localStorage.getItem("examData");
        if (storedData) {
            allExamsData = JSON.parse(storedData);
        }

        // Tìm index của bài vừa chấm trong mảng lớn
        const itemIndex = allExamsData.findIndex((item) => item["Tên học viên"] === currentItem["Tên học viên"] && item["tên bài tập"] === currentItem["tên bài tập"]);

        if (itemIndex !== -1) {
            // Cập nhật dữ liệu
            allExamsData[itemIndex]["trạng thái"] = "đã chấm";
            allExamsData[itemIndex]["số điểm"] = currentScore;
            
            // Lưu lại tên của người đã tiến hành chấm bài
            const currentUserStr = localStorage.getItem("currentUser");
            if (currentUserStr) {
                try {
                    allExamsData[itemIndex]["người chấm"] = JSON.parse(currentUserStr).name;
                } catch (error) {}
            }

            // Lưu các thông tin chi tiết
            allExamsData[itemIndex]["nhận xét"] = document.getElementById("commentExaminer").value.trim();

            // Trích xuất lại trạng thái chọn của các ô checkbox/radio để tái sử dụng
            const criteriaState = [];
            document.querySelectorAll(".eval-input").forEach((input) => {
                criteriaState.push({
                    id: input.id,
                    checked: input.checked,
                });
            });
            allExamsData[itemIndex]["chi tiết chấm"] = criteriaState;

            // Ghi đè lại vào localStorage
            localStorage.setItem("examData", JSON.stringify(allExamsData));

            // Xóa current item
            localStorage.removeItem("currentGradingItem");

            // Trở về trang danh sách
            window.location.href = "../../pages/gradingPage/index.html";
        } else {
            alert("Có lỗi xảy ra, không tìm thấy bài tập trong hệ thống!");
        }
    }

    const btnFinish = document.querySelector(".btnFinish");
    btnFinish.addEventListener("click", saveGradingData);

    // 7. Chức năng copy link bài làm
    const btnCopy = document.querySelector(".btnCopy");
    const linkSpan = document.getElementById("link");
    
    if (btnCopy && linkSpan) {
        btnCopy.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(linkSpan.textContent.trim());
                const originalHTML = btnCopy.innerHTML;
                // Đổi icon và thêm chữ, đổi màu chữ thành màu xanh lá báo thành công
                btnCopy.innerHTML = '<i class="fa-solid fa-check" style="color: #4CAF50; font-size: 14px; font-weight: 600;"></i> ';
                setTimeout(() => {
                    btnCopy.innerHTML = originalHTML; // Trả lại nội dung cũ sau 2 giây
                }, 2000);
            } catch (err) {
                console.error("Lỗi khi copy: ", err);
            }
        });
    }
});

const btnQues = document.querySelector(".btnQues");
btnQues.addEventListener("click", () =>{
    openModal({
            title: `Hướng dẫn cách tính điểm bài tập`,
            message: `
                <ul class="listNote">
                    <li>Điểm = Tổng số phần trăm / tổng số tiêu chí chấm trong bài đó</li>
                    <li>Không đạt = 0%</li>
                    <li>Rất yếu = 20%</li>
                    <li>Tạm được = 40%</li>
                    <li>Khá = 60%</li>
                    <li>Tốt = 80%</li>
                    <li>Hoàn Hảo = 100%</li>
                </ul>     
            `,
            options: ["hidden"],
        });
});