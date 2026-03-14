let header = document.getElementsByTagName("header")[0] ?? [];
let footer = document.getElementsByTagName("footer")[0] ?? [];
let logo = document.getElementsByClassName("logo");
let menu = document.getElementsByClassName("hamburger");
footer.innerHTML = `
    <div class="footer">
                <div class="container containerFooter">
                    <div class="wrapInformation">
                        <div class="blockInfor">
                            <div class="titleInfor">Địa điểm</div>
                            <div class="contentInfors">
                                <div class="content">12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Ho Chi Minh City, Vietnam</div>
                            </div>
                        </div>
                        <div class="blockInfor">
                            <div class="titleInfor">Khám phá</div>
                            <div class="contentInfors">
                                <a href="../../pages/homepage/index.html" class="content contentHover">Trang chủ</a>
                                <a href="../../pages/homepage/index.html#sectionInforCourse" class="content contentHover"></a>
                                <a href="../../pages/homepage/index.html#sectionPrograme" class="content contentHover"></a>
                                <a href="../../pages/homepage/index.html#sectionFAQ" class="content contentHover"></a>
                            </div>
                        </div>
                        <div class="blockInfor">
                            <div class="titleInfor">Liên hệ và Hỗ trợ</div>
                            <div class="contentInfors">
                                <div class="content">
                                    <span><i class="fa-solid fa-phone"></i></span>: 0909 888 777
                                </div>
                                <div class="content">
                                    <span><i class="fa-solid fa-envelope"></i></span>: mediabancongnghe@gmail.com
                                </div>
                                <div class="content">
                                    <span><i class="fa-brands fa-facebook-f"></i></span>: <a href="https://www.facebook.com/profile.php?id=61572321333029">https://www.facebook.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;
header.innerHTML = `
        <div class="containerHeader flex-r j-between">
            <div class="hamburger"><i class="fa-solid fa-bars"></i></div>
            <ul class="mobileMenu">
                <li class="closeMenu"><i class="fa-solid fa-xmark"></i></li>
                <li class="nav-item">
                    <a class="nav-link" href="../../pages/homepage/" id="homepage">Trang chủ</a>
                </li>
            </ul>
            <div class="logo">
            </div>
            <nav class="main-nav">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/homepage/" id="homepage">Trang chủ</a>
                    </li>

                </ul>
            </nav>
            <div class="flex-r g10 a-center" id="signIn">
                <i class="fa-solid fa-bell"></i>
                <button class="primary signIn">Đăng nhập</button>
                <ul class="signInButton">
                    <li class="icon"><i class="fa-solid fa-circle-user"></i>
                        <ul class="signInMenu">
                            <li class="signIn">Đăng nhập</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
`;
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobileMenu");
const closeMenu = document.querySelector(".closeMenu");
hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("showMenu");
});
closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("showMenu");
});
const signInMenu = document.querySelector(".signInMenu");
const iconSignIn = document.querySelector(".signInButton .icon");
iconSignIn.addEventListener("click", () => {
    iconSignIn.classList.toggle("showSignIn");
});
let currentPage;
function initializeNav() {
    let link = document.querySelectorAll(".nav-link");
    let signIns = document.querySelectorAll(".signIn");
    currentPage = window.location.pathname.match(/[\w]+/gm)[1];
    signIns.forEach((signIn) => {
        signIn.addEventListener("click", () => {
            window.location.assign("../../pages/signIn/");
        });
    });
    if (currentPage == "signIn") {
        document.querySelector("#signIn").style.display = "none";
    }
    for (let i = 0; i < link.length; i++) {
        if (link[i].id == currentPage) {
            link[i].classList.add("active");
        }
    }
}
initializeNav();
