function startCourse() {
    let start = document.querySelector('#start-course')
    start.style.display = 'none'
    let firstChapter = document.querySelector('.course-chapter')
    firstChapter.classList.remove('disabled')
    let firstChapterOptions = document.querySelector(".course-chapter .chapter-options")
    firstChapterOptions.classList.remove('hidden')
    closeModal()
}
function startCourseConfirmation() {
    openModal({
        title: "Bạn có muốn theo lộ trình này?",
        message: "Nếu đồng ý bạn sẽ không thể chọn một lộ trình khác cho đến khi hoàn thành lộ trình này hoặc tử bỏ học lộ trình này",
        options: [
            {
                type: 'tertiary',
                message: 'Hủy bỏ', 
                callback: closeModal
            },
            {
                type: 'primary',
                message: 'Chấp nhận', 
                callback: startCourse
            }
        ]
    })
}
function startChapter() {
    let statusContainer = document.querySelector(".chapter-status.hidden")
    let startChapterButton = document.querySelector("#start-chapter")
    let skipChapterButton = document.querySelector(".tertiary.hidden.skip")
    let lock = document.querySelector('.lock')
    lock.classList.add('active')
    lock.textContent = "1"
    skipChapterButton.classList.remove("hidden")
    startChapterButton.classList.add("hidden")
    statusContainer.classList.remove('hidden')
    closeModal()
}
function startChapterConfirmation() {
    openModal({
        title: "Bạn muốn bắt đầu học chương này?",
        message: `
            Bạn sẽ phải làm hết bài tập và đọc hết nội dung của chương này để có thể chuyển qua chương tiếp theo<br>
            <span class="small-info">Bạn vẫn có thể bỏ qua chương này trong quá trình học nếu có nhu cầu</span>
        `,
        options: [
            {
                type: 'tertiary',
                message: 'Hủy bỏ', 
                callback: closeModal
            },
            {
                type: 'primary',
                message: 'Chấp nhận', 
                callback: startChapter
            }
        ]
    })
}