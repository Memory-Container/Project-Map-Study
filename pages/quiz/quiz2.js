let bar = document.querySelector(".progress");
let answer = [];
let questionList = [
    "Bạn thích làm việc với thứ nào hơn?",
    "Khi bạn thấy một ứng dụng hoặc website đẹp, bạn thường nghĩ điều gì đầu tiên?",
    "Khi sử dụng một trang web hoặc app, bạn chú ý điều gì trước tiên?",
    "Khi xem video hướng dẫn, bạn thích nội dung kiểu nào hơn?",
    "Khi đang lướt mạng xã hội bạn bị thu hút bởi loại nội dung nào sau đây?",
    "Điều nào khiến bạn tò mò nhất?",
    "Khi làm việc, bạn thích điều gì?",
    "Khi bạn tưởng tượng tạo ra một thứ gì đó cho người khác dùng, bạn muốn làm gì?",
];

let answerList = [
    ["Máy tính, trình duyệt", "Điện thoại, ứng dụng", "Hình ảnh, màu sắc, bố cục"],
    ["Không biết họ làm trang web này như thế nào nhỉ?", "Không biết app này chạy ra sao trên điện thoại?", "Màu sắc và bố cục này phối đẹp ghê!"],
    ["Cách nó hoạt động, bấm vào đây thì ra gì", "Nó có tiện dùng trên điện thoại không", "Màu sắc, bố cục, hình ảnh có đẹp không"],
    ["Xây dựng trang web từ những bước nhỏ", "Làm app đơn giản ", "Hướng dẫn làm poster, logo, hình minh họa"],
    ["Website, công nghệ mới", "App điện thoại, tính năng mới của smartphone", "Video thiết kế đẹp, màu sắc, logo, UI/UX"],
    ["Cách website hoạt động", "Tính năng trên điện thoại", "Những thứ mang tính thẩm mỹ"],
    ["Làm ra thứ hoạt động tốt và có logic", "Làm ra thứ mà người dùng có thể chạm vào trên điện thoại", "Làm ra thứ nhìn đẹp, gọn, đúng ý đồ thiết kế"],
    ["Một trang web mọi người có thể xem bằng trình duyệt", "Một ứng dụng ai cũng có thể dùng trên điện thoại", "Một thiết kế đẹp: banner, poster, hình minh họa"],
];
function updateProgress() {
    let progress = (answer.length / questionList.length) * 100;
    bar.style.width = `${progress}%`;
    if (progress >= 100) {
        bar.style.borderRadius = "5px";
        bar.style.width = `100%`;
    }
    document.querySelector(".progress-info").textContent = ` ${answer.length}/${questionList.length}`;
}
let question = document.querySelector(".question");
let answerCard = document.getElementsByClassName("card");
let current = 0;
function setActive(index, mode = 0) {
    let nextBtn = document.getElementById("next");
    if (mode > 0) {
        if (answer[current] !== undefined) {
            nextBtn.classList.remove("disabled");
        } else {
            nextBtn.classList.add("disabled");
        }
    } else {
        answer[current] = index;
        nextBtn.classList.remove("disabled");
    }
    updateProgress();
    document.querySelector(".progress-info").textContent = ` ${answer.length}/${questionList.length}`;
    for (let i = 0; i < 3; i++) {
        answerCard[i].classList.remove("active");
        if (i == index - 1) {
            answerCard[i].classList.add("active");
        }
    }
}
function updateQuestion(mode) {
    if (mode == "next") {
        if (current == questionList.length - 1) {
            window.location.assign("/pages/roadmap/index.html");
            return;
        }
        current++;
    }
    if (mode == "previous") {
        if (current > 0) {
            current--;
        }
    }
    if (current === 0) {
        document.getElementById("prev").classList.add("disabled");
    } else {
        document.getElementById("prev").classList.remove("disabled");
    }
    question.innerHTML = `
        <span> ${questionList[current]} </span>
    `;
    for (let i = 0; i < 3; i++) {
        answerCard[i].innerHTML = `
        <span>${answerList[current][i]}</span>
    `;
    }
    setActive(answer[current], 1);
}
document.getElementById("next").addEventListener("click", () => updateQuestion("next"));
document.getElementById("prev").addEventListener("click", () => updateQuestion("previous"));
updateQuestion();
//Progress Bar
