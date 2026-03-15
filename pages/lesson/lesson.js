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
                    <div class="nameContent">Số lần sửa lại</div>
                    <div class="quantity">0</div>
                </div>
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
