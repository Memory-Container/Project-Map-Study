import { dataRoadmap } from "./dataRoadmap.js";
const courses = document.querySelectorAll(".blockListCourse .course");
const nextButton = document.querySelector(".tertiary");
const showWrap = document.querySelector(".containerListCourse");
const pageNow = document.getElementById("number");
const contentPage = document.getElementById("choose");
const wrapLearningRoadmap = document.querySelector(".wrapLearningRoadmap");
const homepagePrev = document.querySelector(".homepagePrev");
courses.forEach((course) => {
    course.addEventListener("click", () => {
        courses.forEach((courseElement) => {
            courseElement.classList.remove("active");
        });
        course.classList.add("active");
        nextButton.classList.add("target");
    });
});
function renderLesson(courseID) {
    const selectCourse = dataRoadmap[courseID];
    if (selectCourse && selectCourse.lessons && selectCourse.lessons.length > 1) {
        let block = "";
        selectCourse.lessons.forEach((title, index) => {
            block += `
                <div class = "lessonOfCourse">
                    <span class = "lessonNumber">${index + 1}.</span>
                    <span class = "lessonName">${title}</span>
                </div>
            `;
        });
        document.querySelector(".blockRoadmap").innerHTML = `
            ${block}
            <p class = "warn"><i class="fa-solid fa-triangle-exclamation"></i>  Sau khi xác nhận, bạn <span class = "highlight">không thể đổi lộ trình khác nữa.</span> Nếu muốn thay đổi, cần liên hệ với Ban Cố Vấn.</p>
        `;
    } else {
        document.querySelector(".blockRoadmap").innerHTML = `<p>Dữ liệu lộ trình đang được cập nhật. Xin lỗi bạn vì sự bất tiện này!</p>`;
    }
}
nextButton.addEventListener("click", () => {
    const courseTarget = document.querySelector(".course.active");
    const courseID = courseTarget?.dataset.id;
    const selectCourse = dataRoadmap[courseID];
    const courseContent = courseTarget.innerHTML;

    if (courseTarget && selectCourse && selectCourse.lessons && selectCourse.lessons.length > 1) {
        wrapLearningRoadmap.innerHTML = `
            <div class = "course">${courseContent}</div>
            <div class="blockRoadmap"></div>
            <div class="boxButton">
                <a href="../../pages/roadmapTarget/index.html">
                    <button class = "buttonToRoadmap"><i class="fa-solid fa-lock"></i> Khóa lộ trình học</button>
                </a>
                <button class="tertiary target"><i class="fa-solid fa-arrow-left"></i>Quay lại</i></button>
            </div>
        `;
    } else {
        wrapLearningRoadmap.innerHTML = `
            <div class = "course">${courseContent}</div>
            <div class="blockRoadmap"></div>
            <div class="boxButton">
                <button class="tertiary target prev"><i class="fa-solid fa-arrow-left"></i>Quay lại</i></button>
            </div>
        `;
    }
    renderLesson(courseTarget.dataset.id);
    showWrap.classList.add("showWrap");
    pageNow.textContent = "2";
    contentPage.textContent = "Lộ trình tổng quát";
    homepagePrev.style.display = "none";
});
wrapLearningRoadmap.addEventListener("click", (event) => {
    const backBtn = event.target.closest(".tertiary.target");
    if (backBtn && showWrap.classList.contains("showWrap")) {
        showWrap.classList.remove("showWrap");
        pageNow.textContent = "1";
        contentPage.textContent = "Chọn lộ trình";
        homepagePrev.style.display = "flex";
    }
});
