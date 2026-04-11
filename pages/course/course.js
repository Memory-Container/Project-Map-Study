const nameListCourses = document.querySelectorAll(".boxListCourse .wrapListCourse .nameListCourse");
nameListCourses.forEach((nameListCourse) => {
    nameListCourse.addEventListener("click", (e) => {
        const wrapListCourse = e.currentTarget.closest(".wrapListCourse");
        if (wrapListCourse) {
            wrapListCourse.classList.toggle("active");
        }
    });
});
const nameDetailedListCourses = document.querySelectorAll(".nameDetailedListCourse");
nameDetailedListCourses.forEach((nameDetailedListCourse) => {
    nameDetailedListCourse.addEventListener("click", () => {
        nameDetailedListCourses.forEach((item) => {
            item.classList.remove("choose");
        });
        nameDetailedListCourse.classList.add("choose");
    });
});
function openOverlay() {}
