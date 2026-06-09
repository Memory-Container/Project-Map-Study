import { dataLesson } from "./Data/dataLesson.js";
import { lessonNames } from "./Data/listLessonName.js";
const dataButton = {
    theory: () => {
        let attempts = parseInt(localStorage.getItem(`quizAttempts_${currentLesson}`)) || 0;
        const itemContent = document.querySelector(".itemContent");
        itemContent.innerHTML = `
                <div class="point" id="pointTheory">0<span>%</span></div>
                <p id="notificationTheory">Bạn đã hoàn thành lý thuyết</p>
                <div class="contentParent">
                    <div class="contentChild">
                        <div class="nameContent">Số lần làm</div>
                        <div class="quantity">${attempts}</div>
                        <button class="primary notTarget">Bài tiếp theo <i class="fa-solid fa-arrow-right icon"></i></button>
                    </div>
                </div>
        `;
        const commentMentor = document.querySelector(".itemContent .commentMentor");
        if (commentMentor) {
            commentMentor.remove();
        }
        maxTheory();
        nextLesson();
    },
    practice: () => {
        const itemContent = document.querySelector(".itemContent");
        itemContent.innerHTML = `
                <div class="point" id="pointPratice">0<span>%</span></div>
                    <p id="notificationPractice">Bạn đã hoàn thành bài thực hành</p>
                    <div class="contentParent">
                        <div class="contentChild">
                            <div class="nameContent">Số lần sửa lại</div>
                            <div class="quantity">0</div>
                            <div class="commentMentor">
                            <div class="titleMentor">Nhận xét của Mentor:</div>
                            <div class="contentComment">Bạn vui lòng chờ mentor ghi lời nhận xét!</div>
                        </div>
                    </div>
                </div>
        `;
        const buttonNext = document.querySelector(".itemContent .primary");
        if (buttonNext) {
            buttonNext.remove();
        }
        const notificationPractice = document.getElementById("notificationPractice");
        if (notificationPractice) {
            notificationPractice.style.display = "none";
        }
    },
};

let listname = 0;
let currentLesson = parseInt(localStorage.getItem("currentLesson")) || 0;
let highestUnlockedLesson = parseInt(localStorage.getItem("highestUnlockedLesson")) || currentLesson;
let maxResult = 0;

function maxTheory() {
    const pointTheory = document.getElementById("pointTheory");
    if (!pointTheory) return;

    const currentPercent = parseFloat(localStorage.getItem("percent")) || 0;
    const savedMax = parseFloat(localStorage.getItem(`maxResult_${currentLesson}`)) || 0;

    if (currentPercent > savedMax) {
        maxResult = currentPercent;
        localStorage.setItem(`maxResult_${currentLesson}`, String(maxResult));
    } else {
        maxResult = savedMax;
    }

    pointTheory.innerHTML = `${maxResult} <span>%</span>`;
    pointTheory.style.setProperty("--progress-resultQuiz", `${maxResult}%`);

    const quantityElement = document.querySelector(".contentChild .quantity");
    if (quantityElement) {
        let attempts = parseInt(localStorage.getItem(`quizAttempts_${currentLesson}`)) || 0;
        quantityElement.textContent = attempts;
    }

    const notificationTheory = document.getElementById("notificationTheory");

    const buttonNext = document.querySelector(".itemContent .primary");
    if (maxResult >= 80) {
        buttonNext.classList.remove("notTarget");
        notificationTheory.style.display = "flex";
    } else {
        buttonNext.classList.add("notTarget");
        notificationTheory.style.display = "none";
    }
}
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

const instructHomework = document.querySelector("#instructHomework");
instructHomework.addEventListener("click", () => {
    openModal({
        title: `Hướng dẫn luyện tập`,
        message: `
            <ul class="modalInstruct">
                <li class="titleContent">Đây là phần luyện tập bắt buộc bạn phải làm sau khi bạn đã học xong bài này để giúp bạn ghi nhớ những kiến thức mình vừa học được. Ngoài ra để học bài tiếp theo bạn phải hoàn thành hết tất cả các bài tập có trong phần "Luyện tập" này.</li>
                <li class="content"><span>Trắc nghiệm lý thuyết:</span> Khi bạn nhấn vào đây, nó sẽ dẫn bạn đến một trang page theo phong cách 1 câu hỏi và 4 đáp án. Bạn sẽ có 10s để suy nghĩ và đưa ra câu trả lời cho câu hỏi. Để trả lời bạn phải nhấn vào 1 trong 4 đáp án và nhấn xác nhấn, lúc này đáp án đúng sẽ hiển thị lên trên màng hình của bạn kèm theo lời giải thích cho đáp án đó. Để đến với câu hỏi tiếp theo bạn chỉ cần nhấn nút "Tiếp theo" ngay bên dưới phần góc bên phải bên dưỡi. Tối thiểu số câu hỏi là 10 câu, nó sẽ tùy thuộc vào nội dung bài học của bạn là dài hay ngắn để có số lượng câu hỏi phù hợp. Để tính được số phần trăm tương ứng với một câu hỏi, bạn sẽ lấy 100% chia cho tổng số lượng câu hỏi.</li>
            </ul>
        `,
    });
});
const instructSumPoint = document.querySelector("#instructSumPoint");
instructSumPoint.addEventListener("click", () => {
    openModal({
        title: `Mục đích của từng phần điểm`,
        message: `
            <ul class="modalInstruct">
                <li class="content"><span>"Lý thuyết": Khi bạn đạt 80% thì bạn sẽ được mở khóa bài học tiếp theo.</li>
                <li class="content"><span>"Thực hành":</span> Điểm thực hành sẽ dùng để tích lũy điểm để mở chương mới trong lộ trình. Chỉ cần số điểm tích lũy đạt trên 80% thì bạn sẽ mở được chương mới.</li>
            </ul>
        `,
        options: ["hidden"],
    });
});

const practiceExer = document.querySelector("#practiceExer");
practiceExer.addEventListener("click", () => {
    openModal({
        title: `Nộp bài tập Code`,
        message: `
            <div class="wrapLessonSubmit">
                    <div class="blockLessonSubmit">
                        <div class="noteLessonSubmit">(<span>Yêu cầu: Dán link bài làm bằng Vercel của bạn vào đây để mentor chấm.</span>)</div>
                        <div class="inputLessonSubmit"><input type="text" placeholder="https://exemple.vercel.app/..." id="linkLesson" /></div>
                        <p class="report"></p>
                         <button class="primary" id="linkSend">Gửi bài tập</button>
                    </div>
                </div>
            `,
        options: ["hidden"],
    });
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
        } else if (valueLink.includes(" ")) {
            report.textContent = "Vui lòng nhập link để cho mentor chấm bài!";
        } else {
            report.textContent = "Link đã được gửi thành công cho Mentor!";
            report.style.color = "green";
            linkLesson.value = "";
        }
    });
});

const listLessons = document.querySelector(".lessons");

const renderLesson = () => {
    for (listname; listname <= lessonNames.length - 1; listname++) {
        const lessonName = document.createElement("li");
        const collectName = lessonNames[listname].name;
        const formattedName = collectName.trim().replace(/[\s,]+/g, "_");
        lessonName.dataset.lesson = formattedName;

        const numberName = document.createElement("span");
        numberName.classList.add("numberLesson");
        numberName.textContent = `${listname + 1}`;

        const contentLesson = document.createElement("span");
        contentLesson.classList.add("contentLesson");
        contentLesson.textContent = `${collectName}`;

        lessonName.appendChild(numberName);
        lessonName.appendChild(contentLesson);
        listLessons.appendChild(lessonName);
    }
};

const nextLesson = () => {
    const buttonEventListion = document.querySelector(".contentChild .primary");
    if (!buttonEventListion) return;
    buttonEventListion.addEventListener("click", () => {
        if (buttonEventListion.classList.contains("notTarget")) return;

        const lessons = document.querySelectorAll(".lessons li");
        if (currentLesson < lessons.length - 1) {
            lessons[currentLesson].classList.remove("target");
            currentLesson++;

            if (currentLesson > highestUnlockedLesson) {
                highestUnlockedLesson = currentLesson;
                localStorage.setItem("highestUnlockedLesson", String(highestUnlockedLesson));
            }
            localStorage.setItem("currentLesson", String(currentLesson));
            
            lessons[currentLesson].classList.add("lecture", "target");

            localStorage.setItem("percent", "0");

            const deractionChoosing = document.querySelector(".itemButton .deraction.choosing");
            if (deractionChoosing && deractionChoosing.dataset.item === "theory") {
                maxTheory();
            }
        }

        showLesson();
    });
};

const currentTarget = () => {
    const listLessons = document.querySelector(".lessons");
    listLessons.addEventListener("click", (e) => {
        const clickedLesson = e.target.closest("li");
        if (!clickedLesson) return;
        if (clickedLesson.classList.contains("lecture")) {
            const lessons = document.querySelectorAll(".lessons li");
            const newIndex = Array.from(lessons).indexOf(clickedLesson);

            if (newIndex === currentLesson) return;

            lessons.forEach((l) => l.classList.remove("target"));

            currentLesson = newIndex;
            clickedLesson.classList.add("target");

            localStorage.setItem("currentLesson", String(currentLesson));
            localStorage.setItem("percent", "0");

            const deractionChoosing = document.querySelector(".itemButton .deraction.choosing");
            if (deractionChoosing && deractionChoosing.dataset.item === "theory") {
                maxTheory();
            }
        }
        showLesson();
    });
};

const showLesson = () => {
    const screenLessons = document.querySelectorAll(".lessons .lecture");
    screenLessons.forEach((screenLesson) => {
        const checkedTarget = screenLesson.classList.contains("target");
        if (checkedTarget) {
            const screenTarget = screenLesson.dataset.lesson;
            if (dataLesson[screenTarget]) {
                dataLesson[screenTarget]();
            }
        }
    });
};
window.addEventListener("load", () => {
    currentLesson = highestUnlockedLesson;
    localStorage.setItem("currentLesson", String(currentLesson));
    const deractions = document.querySelectorAll(".itemButton .deraction");
    deractions.forEach((deraction) => {
        const choosing = deraction.classList.contains("choosing");
        if (choosing) {
            console.log(deraction.dataset.item);
            const buttonValue = deraction.dataset.item;
            if (dataButton[buttonValue]) {
                dataButton[buttonValue]();
            }
        }
    });
    renderLesson();
    
    const lessons = document.querySelectorAll(".lessons li");
    for (let i = 0; i <= highestUnlockedLesson; i++) {
        if (lessons[i]) {
            lessons[i].classList.add("lecture");
        }
    }
    
    if (lessons[currentLesson]) {
        lessons[currentLesson].classList.add("target");
    }
    currentTarget();
    showLesson();
});
