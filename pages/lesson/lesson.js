const linkLesson = document.getElementById("linkLesson");
linkLesson.textContent = "";
const linkSend = document.getElementById("linkSend");
linkLesson.addEventListener("input", () => {
    const report = document.querySelector(".report");
    const valueLink = linkLesson.value.trim();
    if (valueLink.includes(" ")) {
        report.textContent = "Link không hợp lệ vì chứa khoảng trắng ở giữa. Vui lòng kiểm tra lại!";
        return;
    } else {
        report.textContent = "";
    }
});
linkSend.addEventListener("click", () => {
    const report = document.querySelector(".report");
    const valueLink = linkLesson.value.trim();
    const checkLink = /^https?:\/\/[a-zA-Z0-9-.]+\.vercel\.app(\/.*)?$/.test(valueLink);
    if (!checkLink) {
        report.textContent = "Vui lòng nhập đúng định dạng link Vercel (VD: https://exemple.vercel.app/)!";
    } else {
        report.textContent = "Link đã được gửi thành công cho Mentor!";
        report.style.color = "green";
        linkLesson.value = "";
    }
});
const dataButton = {
    sum: () => {
        const constParent = document.querySelector(".contentParent");
        constParent.innerHTML = `
                <div class="contentChild">
                    <div class="nameContent">Số lần làm</div>
                    <div class="quantity">0</div>
                </div>
        `;
        const buttonNext = document.querySelector(".itemContent .primary");
        const commentMentor = document.querySelector(".itemContent .commentMentor");
        if (buttonNext) {
            buttonNext.add();
        }
        if (commentMentor) {
            commentMentor.remove();
        }
        const itemContent = document.querySelector(".itemContent");
        const nextLesson = document.createElement("button");
        nextLesson.classList.add("primary");
        nextLesson.classList.add("notTarget");
        nextLesson.innerHTML = `
            Bài tiếp theo <i class="fa-solid fa-arrow-right icon"></i>
        `;
        itemContent.appendChild(nextLesson);
    },
    practice: () => {
        const constParent = document.querySelector(".contentParent");
        constParent.innerHTML = `
                <div class="contentChild">
                    <div class="nameContent">Số lần sửa lại</div>
                    <div class="quantity">0</div>
                </div>
        `;
        const buttonNext = document.querySelector(".itemContent .primary");
        if (buttonNext) {
            buttonNext.remove();
        }
        const itemContent = document.querySelector(".itemContent");
        const commentMentor = document.createElement("div");
        commentMentor.classList.add("commentMentor");
        commentMentor.innerHTML = `
            <div class="titleMentor">Nhận xét của Mentor:</div>
            <div class="contentComment">Bạn vui lòng chờ mentor ghi lời nhận xét!</div>
        `;
        itemContent.appendChild(commentMentor);
    },
    theory: () => {
        const constParent = document.querySelector(".contentParent");
        constParent.innerHTML = `
                <div class="contentChild">
                    <div class="nameContent">Số lần làm</div>
                    <div class="quantity">0</div>
                </div>
        `;
        const buttonNext = document.querySelector(".itemContent .primary");
        const commentMentor = document.querySelector(".itemContent .commentMentor");
        if (buttonNext) {
            buttonNext.remove();
        }
        if (commentMentor) {
            commentMentor.remove();
        }
    },
};
const deractions = document.querySelectorAll(".deraction");
deractions.forEach((deraction) => {
    deraction.addEventListener("click", () => {
        deractions.forEach((deraction) => {
            deraction.classList.remove("choosing");
        });
        deraction.classList.add("choosing");
        const buttonValue = deraction.dataset.item;
        if (dataButton[buttonValue]) {
            dataButton[buttonValue]();
        }
    });
});
const notification = document.querySelector("#notification");
notification.style.display = "none";
const instructHomework = document.querySelector("#instructHomework");
instructHomework.addEventListener("click", () => {
    openModal({
        title: `Hướng dẫn luyện tập`,
        message: `
            <ul class="modalInstruct">
                <li class="titleContent">Đây là phần luyện tập bắt buộc bạn phải làm sau khi bạn đã học xong bài này để giúp bạn ghi nhớ những kiến thức mình vừa học được. Ngoài ra để học bài tiếp theo bạn phải hoàn thành hết tất cả các bài tập có trong phần "Luyện tập" này.</li>
                <li class="content"><span>Trắc nghiệm lý thuyết:</span> Khi bạn nhấn vào đây, nó sẽ dẫn bạn đến một trang page theo phong cách 1 câu hỏi và 4 đáp án. Bạn sẽ có 10s để suy nghĩ và đưa ra câu trả lời cho câu hỏi. Để trả lời bạn phải nhấn vào 1 trong 4 đáp án và nhấn xác nhấn, lúc này đáp án đúng sẽ hiển thị lên trên màng hình của bạn kèm theo lời giải thích cho đáp án đó. Để đến với câu hỏi tiếp theo bạn chỉ cần nhấn nút "Tiếp theo" ngay bên dưới phần góc bên phải bên dưỡi. Tối thiểu số câu hỏi là 10 câu, nó sẽ tùy thuộc vào nội dung bài học của bạn là dài hay ngắn để có số lượng câu hỏi phù hợp. Để tính được số phần trăm tương ứng với một câu hỏi, bạn sẽ lấy 100% chia cho tổng số lượng câu hỏi. Và để tính được số phần trăm cho bài tập "Trắc nghiệm lý thuyết", bản chỉ lấy số phần trăm cho một câu hỏi nhân với số lượng câu hỏi bạn làm đúng. Số phần trăm hoàn thành của bạn sẽ được hiển thị ở góc bên phải.</li>
            </ul>
        `,
    });
});
const instructSumPoint = document.querySelector("#instructSumPoint");
instructSumPoint.addEventListener("click", () => {
    openModal({
        title: `Hướng dẫn tính điểm`,
        message: `
            <ul class="modalInstruct">
                <li class="titleContent">Bạn muốn mở khóa bài học tiếp theo thì bắt buộc phần "Kết quả" bạn phải trên 80%</li>
                <li class="content"><span>"Kết quả":</span> Đây là phần được xem là tổng số phần trăm mà bạn đạt được khi bạn đã làm ở phần "Phần trắc nghiệm lý thuyết".</li>
                <li class="content"><span>"Lý thuyết":</span> Đây là phần thể hiện số phần trăm mà bạn đã hoàn thành ở phần "Trắc nghiệm lý thuyết". Ngoài ra ở bên dưới có phần đếm số lần bạn làm lại bài tập trắc nghiệm này.</li>
            </ul>
        `,
    });
});
