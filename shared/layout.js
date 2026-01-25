let header = document.getElementsByTagName("header")[0] ?? []
let footer = document.getElementsByTagName("footer")[0] ?? []
let logo = document.getElementsByClassName("logo")
let menu = document.getElementsByClassName("hamburger")
footer.innerHTML = `
`
header.innerHTML = `
        <div class="container flex-r j-between">
            <div class="logo">
            </div>
            <nav class="main-nav">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/homepage/" id="homepage">Trang chủ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/roadmap/" id="roadmap">Khóa học</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/introduction/" id="introduction">Giới thiệu</a>
                    </li>
                </ul>
            </nav>
            <div class="flex-r g10 a-center">
            </div>
        </div>
`
let currentPage
function initializeNav() {
    let link = document.querySelectorAll(".nav-link")
    currentPage = window.location.pathname.match(/[\w]+/gm)[1]
    for (let i = 0; i < link.length; i++) {
        if (link[i].id == currentPage) {
            link[i].classList.add("active")
        }
    }
}
initializeNav()