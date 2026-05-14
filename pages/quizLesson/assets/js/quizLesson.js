import { dataQuestion } from "./dataQuestion.js";
const startQuiz = document.getElementById("quizButton");
const containerQuestion = document.querySelector(".containerQuestion");
const overlayFinishQuiz = document.querySelector(".quizContainer");

containerQuestion.innerHTML = `
            <div class="boxTool">
                <div class="wrapFeedback">
                    <div class="block">
                        <span class="currentQuestion">1</span>
                        /
                        <span class="allQuestion">10</span>
                    </div>
                    <div class="block">
                        <i class="fa-solid fa-check iconColorGreen"></i>
                        <span class="textCorrect">Câu đúng: </span>
                        <span id="correct">0</span>
                    </div>
                    <div class="block">
                        <i class="fa-solid fa-xmark iconColorRed"></i>
                        <span class="textUnCorrect">Câu sai: </span>
                        <span id="unCorrect">0</span>
                    </div>
                </div>
                <div class="timelineBar">
                    <span class="contentNote">Thời gian làm bài: <span id="coutdownTime">15s</span></span>
                </div>
            </div>
            <div class="boxQuestion">Ngôn ngữ lập trình nào được tạo ra bởi Brendan Eich vào năm 1995?</div>
            <div class="boxNoteAnswer"><span class="contentNoteAnswer">Chọn đám án đúng</span></div>
            <div class="boxAnswer">
                <div class="option">A. <span class="answer"></span></div>
                <div class="option">B. <span class="answer"></span></div>
                <div class="option">C. <span class="answer"></span></div>
                <div class="option">D. <span class="answer"></span></div>
            </div>
            <div class="boxExplain">Giải thích: <span id="explainAnswer">JavaScript được Brendan Eich tạo ra chỉ trong 10 ngày vào tháng 5 năm 1995 khi ông đang làm việc tại Netscape Communications. Ban đầu có tên là Mocha, sau đổi thành LiveScript, rồi mới đổi thành JavaScript.</span></div>
            <div class="boxButton">
                <button class="button" id="buttonPrev"><i class="fa-solid fa-angle-left iconButton"></i>Trở lại</button>
                <button class="button" id="checkAnswer">Kiểm tra</button>
            </div>
`;
let time_ = 0;
let allTime = 15 * 1000;
let timeLoop = 10;
let correct = 0;
let unCorrect = 0;
let count = 0;
let percent = 0;

startQuiz.addEventListener("click", function () {
    const quizContainer = document.querySelector("section");
    quizContainer.style.display = "none";
    containerQuestion.style.display = "flex";
    showQuestion();
});
function autoMarkCorrectAnswer() {
    const options = document.querySelectorAll(".boxAnswer .option");
    if (options[dataQuestion[currentQuestion].correctAnswer]) {
        console.log(options[dataQuestion[currentQuestion].correctAnswer]);
        options[dataQuestion[currentQuestion].correctAnswer].classList.add("optionCorrect");
        unCorrect++;
        document.getElementById("unCorrect").textContent = unCorrect;
    }
}
let currentQuestion = 0;
let userSelections = new Array(dataQuestion.length).fill(-1);
let answered = new Array(dataQuestion.length).fill(false);

const options = document.querySelectorAll(".option");
const checkAnswers = document.getElementById("checkAnswer");

const currentQuested = document.querySelector(".currentQuestion");
currentQuested.textContent = count;

const allQuestion = document.querySelector(".allQuestion");
allQuestion.textContent = dataQuestion.length;

const buttonPrev = document.getElementById("buttonPrev");
buttonPrev.style.opacity = "0";

let coutdown;
const coutdownTime = document.querySelector(".timelineBar");
const numberTime = document.getElementById("coutdownTime");
const boxExplain = document.querySelector(".boxExplain");
const explainAnswer = document.getElementById("explainAnswer");

const updateTime = (time_ = 0) => {
    let timeRemaining = allTime - time_;
    numberTime.textContent = `${timeRemaining / 1000}s`;

    coutdownTime.style.setProperty("--after-width", `${(timeRemaining / allTime) * 100}%`);
    if (timeRemaining / allTime > 0.42 && timeRemaining / allTime <= 0.65) {
        coutdownTime.style.setProperty("--after-backgroundColor", "#f59e0b");
    } else if (timeRemaining / allTime > 0.16 && timeRemaining / allTime <= 0.42) {
        coutdownTime.style.setProperty("--after-backgroundColor", "#f97316");
    } else if (timeRemaining / allTime > 0 && timeRemaining / allTime <= 0.16) {
        coutdownTime.style.setProperty("--after-backgroundColor", "#ef4444");
    } else {
        coutdownTime.style.setProperty("--after-backgroundColor", "#22c55e");
    }
};

function countdown() {
    if (coutdown) clearInterval(coutdown);
    updateTime(time_);
    coutdown = setInterval(() => {
        time_ += timeLoop;
        updateTime(time_);
        if (allTime <= time_) {
            clearInterval(coutdown);
            autoMarkCorrectAnswer();
            numberTime.textContent = "0s";
            count++;
            currentQuested.textContent = count;
            boxExplain.style.display = "flex";
            if (dataQuestion[currentQuestion] === dataQuestion[dataQuestion.length - 1]) {
                checkAnswers.innerHTML = "Hoàn thành";
                checkAnswers.id = "finishQuiz";
            } else {
                checkAnswers.innerHTML = "Tiếp theo <i class='fa-solid fa-angle-right iconButton'></i>";
                checkAnswers.id = "buttonNext";
            }
            explainAnswer.textContent = dataQuestion[currentQuestion].explain;
            options.forEach((option) => {
                option.style.pointerEvents = "none";
            });
            answered[currentQuestion] = true;
            unclockButton();
        }
    }, timeLoop);
}
function resetOptions() {
    options.forEach((option) => {
        option.classList.remove("optionTarget", "optionCorrect", "optionUnCorrect");
        option.style.pointerEvents = "all";
    });
}
function showQuestion() {
    resetOptions();
    const boxQuestion = document.querySelector(".boxQuestion");
    const answers = document.querySelectorAll(".answer");
    boxQuestion.textContent = dataQuestion[currentQuestion].question;
    answers.forEach((answer, index) => {
        answer.textContent = dataQuestion[currentQuestion].answerOption[index];
    });
    const currentOptions = document.querySelectorAll(".boxAnswer .option");
    currentOptions.forEach((option) => {
        option.onclick = function () {
            currentOptions.forEach((opt) => opt.classList.remove("optionTarget"));
            this.classList.add("optionTarget");
            if (option.classList.contains("optionTarget")) {
                checkAnswers.style.pointerEvents = "all";
                checkAnswers.style.opacity = "1";
            }
        };
    });
    const selectedOption = userSelections[currentQuestion];
    const correctIndex = dataQuestion[currentQuestion].correctAnswer;
    console.log(answered[currentQuestion]);
    if (answered[currentQuestion]) {
        if (selectedOption !== -1 && currentOptions[selectedOption]) {
            currentOptions[selectedOption].classList.add("optionTarget");
            console.log(currentOptions[selectedOption]);
        }
        if (currentOptions[correctIndex]) {
            currentOptions[correctIndex].classList.add("optionCorrect");
        }
        if (selectedOption !== -1 && selectedOption !== correctIndex && currentOptions[selectedOption]) {
            currentOptions[selectedOption].classList.add("optionUnCorrect");
        }
        const boxExplain = document.querySelector(".boxExplain");
        const explainAnswer = document.getElementById("explainAnswer");
        boxExplain.style.display = "flex";
        explainAnswer.textContent = dataQuestion[currentQuestion].explain;
        checkAnswers.innerHTML = "Tiếp theo <i class='fa-solid fa-angle-right iconButton'></i>";
        checkAnswers.id = "buttonNext";
        options.forEach((option) => {
            option.style.pointerEvents = "none";
        });
    } else {
        currentOptions.forEach((option) => {
            option.onclick = function () {
                currentOptions.forEach((opt) => opt.classList.remove("optionTarget"));
                this.classList.add("optionTarget");
                if (option.classList.contains("optionTarget")) {
                    checkAnswers.style.pointerEvents = "all";
                    checkAnswers.style.opacity = "1";
                }
            };
        });
        document.querySelector(".boxExplain").style.display = "none";
        checkAnswers.innerHTML = "Kiểm tra";
        checkAnswers.id = "checkAnswer";
        time_ = 0;
        countdown();
    }
    buttonPrev.style.opacity = currentQuestion <= 0 ? "0" : "1";
}
function checkAnswer() {
    const options = document.querySelectorAll(".boxAnswer .option");
    const correctOption = dataQuestion[currentQuestion].correctAnswer;
    console.log(correctOption);
    let selectOption = -1;
    options.forEach((option, index) => {
        console.log(option.textContent);
        if (option.classList.contains("optionTarget")) {
            selectOption = index;
        }
        if (index === correctOption) {
            option.classList.add("optionCorrect");
        }
        if (option.classList.contains("optionTarget") && index === correctOption) {
            option.classList.add("optionCorrect");
            correct++;
            document.getElementById("correct").textContent = correct;
        } else if (option.classList.contains("optionTarget") && index !== correctOption) {
            console.log(index);
            option.classList.add("optionUnCorrect");
            unCorrect++;
            document.getElementById("unCorrect").textContent = unCorrect;
        }
    });
    if (selectOption !== -1) {
        userSelections[currentQuestion] = selectOption;
    }
    answered[currentQuestion] = true;
}
const unclockButton = () => {
    checkAnswers.style.pointerEvents = "all";
    checkAnswers.style.opacity = "1";
};
checkAnswers.addEventListener("click", () => {
    if (checkAnswers.id === "checkAnswer") {
        clearInterval(coutdown);
        count++;
        currentQuested.textContent = count;
        const boxExplain = document.querySelector(".boxExplain");
        const explainAnswer = document.getElementById("explainAnswer");
        checkAnswers.innerHTML = "Tiếp theo <i class='fa-solid fa-angle-right iconButton'></i>";
        checkAnswers.id = "buttonNext";
        checkAnswer();
        boxExplain.style.display = "flex";
        explainAnswer.textContent = dataQuestion[currentQuestion].explain;
        options.forEach((option) => {
            option.style.pointerEvents = "none";
        });
        if (currentQuestion == dataQuestion.length - 1) {
            checkAnswers.innerHTML = "Hoàn thành";
            checkAnswers.id = "finishQuiz";
        }
    } else if (checkAnswers.id === "buttonNext") {
        currentQuestion++;
        showQuestion();
        checkAnswers.style.pointerEvents = "none";
        checkAnswers.style.opacity = "0.6";
        if (currentQuestion > 0 && currentQuestion < dataQuestion.length) {
            buttonPrev.style.opacity = "1";
            checkAnswers.innerHTML = "Kiểm tra";
            checkAnswers.id = "checkAnswer";
        }
        if (userSelections[currentQuestion] !== -1) {
            const timelineBar = document.querySelector(".timelineBar");
            timelineBar.style.display = "none";
            if (dataQuestion[currentQuestion] === dataQuestion[dataQuestion.length - 1]) {
                checkAnswers.innerHTML = "Hoàn thành";
                checkAnswers.id = "finishQuiz";
            } else {
                checkAnswers.innerHTML = "Tiếp theo <i class='fa-solid fa-angle-right iconButton'></i>";
                checkAnswers.id = "buttonNext";
            }
        } else {
            const timelineBar = document.querySelector(".timelineBar");
            timelineBar.style.display = "flex";
        }
    } else if (checkAnswers.id === "finishQuiz") {
        containerQuestion.style.display = "none";
        overlayFinishQuiz.style.opacity = "1";
        overlayFinishQuiz.style.pointerEvents = "all";
        overlayFinishQuiz.style.display = "flex";
        overlayFinishQuiz.classList.add("quizChangeHeight");
        overlayFinishQuiz.innerHTML = `
            <div class="resultQuiz"><span class="contentResult">0</span><span class="percent">%</span></div>
            <div class="wrapResult">
                <h2 class="titleResult">Kết quả của bạn</h2>
                <div class="blockResult">
                    <div class="content">Câu đúng: <span>${correct}</span></div>
                    <div class="content">Câu sai: <span>${unCorrect}</span></div>
                </div>
            </div>
            <div class = "wrapButton">
                <button class="secondary" id="playAgain">Làm lại <i class="fa-solid fa-arrow-rotate-left"></i></button>
                <button class="primary" id="backHome">Quay về <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        `;
        percent = Math.abs((correct / dataQuestion.length) * 100).toFixed(2);

        let resultQuiz = document.querySelector(".resultQuiz");
        resultQuiz.style.setProperty("--progress-resultQuiz", `${percent}%`);

        let contentResult = document.querySelector(".contentResult");
        contentResult.textContent = `${percent}`;

        localStorage.setItem("percent", percent);
    }
});

buttonPrev.addEventListener("click", () => {
    currentQuestion--;
    showQuestion();
    const timelineBar = document.querySelector(".timelineBar");
    timelineBar.style.display = "none";
    if (currentQuestion <= 0) {
        buttonPrev.style.opacity = "0";
    } else {
        buttonPrev.style.opacity = "1";
    }
    unclockButton();
});

overlayFinishQuiz.addEventListener("click", (e) => {
    if (e.target.id === "backHome") {
        window.location.href = "../../pages/lesson/index.html";
    }
    if (e.target.id === "playAgain") {
        location.reload();
    }
});
