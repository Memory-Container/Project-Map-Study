function modalInput(input, event) {
    switch(event) {
        case 'skipChapter':
            handleChapterEvent(input, 'skip')
    }
}
function handleChapterEvent(input, type) {
    switch(type) {
        case 'skip':
            if (input == 'accept') {
                document.querySelector("#start-course").style.display = 'none'
                document.querySelector('.course-chapter').classList.remove = 'disabled'
            }
            closeModal()
    }
}
function closeModal() {
    let modal = document.querySelector('.backdrop')
    modal.style.display = 'none'
}
function openModal(content) {
    let title = content?.title ?? 'Sample Title'
    let message = content?.message ?? 'Sample Message'
    let options = content?.options !== undefined ? [...content.options] : [
        {
            type: 'tertiary',
            message: 'Close', 
            callback: closeModal
        },
        {
            type: 'primary',
            message: 'Accept', 
            callback: closeModal
        }
    ]
    createModal()
    flushModal()
    let header = document.querySelector(".modal-header")
    let content2 = document.querySelector(".modal-message")
    let choices = document.querySelector('.modal-choices')
    header.textContent = title
    content2.innerHTML = message
    for (item of options) {
        console.log(item)
        let button = document.createElement('button')
        button.classList.add(item.type ?? "primary")
        button.textContent = item.message ?? "Sample Text"
        button.addEventListener('click', item.callback ?? closeModal())
        choices.appendChild(button)
    }
}
function createModal() {
    if (!document.querySelector('.backdrop')) {
        let container = document.querySelector("main")
        let backdrop = document.createElement('div')
        backdrop.classList.add('backdrop')
        backdrop.innerHTML = `
            <div class="backdrop">
                <div class="modal-container">
                    <h2 class="modal-header">
                    </h2>
                    <div class="modal-message">
                    </div>
                    <div class="modal-choices">
                    </div>
                </div>
            </div>
        `
        container.appendChild(backdrop)
    } else [
        document.querySelector('.backdrop').style.display = 'block'
    ]
}
function flushModal() {
    let header = document.querySelector(".modal-header")
    let content2 = document.querySelector(".modal-message")
    let choices = document.querySelector('.modal-choices')
    header.innerHTML = ''
    content2.innerHTML = ''
    choices.innerHTML = ''
}