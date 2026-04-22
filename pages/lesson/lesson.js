import { dataLesson } from "./Data/dataLesson.js";
import { lessonNames } from "./Data/listLessonName.js";
const dataButton = {
    theory: () => {
        const itemContent = document.querySelector(".itemContent");
        itemContent.innerHTML = `
                <div class="point" id="pointTheory">0<span>%</span></div>
                <p id="notificationTheory">Bạn đã hoàn thành lý thuyết</p>
                <div class="contentParent">
                    <div class="contentChild">
                        <div class="nameContent">Số lần làm</div>
                        <div class="quantity">0</div>
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
let maxResult = localStorage.getItem("percent") || 0;
function maxTheory() {
    const pointTheory = document.getElementById("pointTheory");
    if (!pointTheory) return;

    const currentPercent = localStorage.getItem("percent") || 0;
    const savedMax = localStorage.getItem("maxResult") || 0;

    if (currentPercent > savedMax) {
        maxResult = currentPercent;
        localStorage.setItem("maxResult", String(maxResult));
    } else {
        maxResult = savedMax;
    }

    pointTheory.innerHTML = `${maxResult} <span>%</span>`;
    pointTheory.style.setProperty("--progress-resultQuiz", `${maxResult}%`);

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
let listname = 0;
let lessonResults = {};
let currentLesson = 0;

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
    buttonEventListion.addEventListener("click", () => {
        lessonResults[currentLesson] = maxResult;

        const lessons = document.querySelectorAll(".lessons li");
        if (currentLesson < lessons.length - 1) {
            lessons[currentLesson].classList.remove("target");
            currentLesson++;

            localStorage.setItem("currentLesson", String(currentLesson));
            const currentLecture = localStorage.getItem("currentLesson") || 0;
            lessons[currentLecture].classList.add("lecture", "target");

            maxResult = lessonResults[currentLesson] || 0;
            localStorage.setItem("percent", String(maxResult));
            localStorage.setItem("maxResult", String(maxResult));

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

            maxResult = lessonResults[currentLesson] || 0;
            localStorage.setItem("percent", String(maxResult));
            localStorage.setItem("maxResult", String(maxResult));

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
    if (lessons[currentLesson]) {
        lessons[currentLesson].classList.add("lecture", "target");
    }
    currentTarget();
    showLesson();
});
