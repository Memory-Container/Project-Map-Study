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
                                <a href="../../pages/homepage/index.html" class="content contentHover">Hoạt động</a>
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
        <div class="containerHeader">
            <div class="hamburger"><i class="fa-solid fa-bars"></i></div>
            <div class="overlay">
                <ul class="mobileMenu">
                    <li class="closeMenu"><i class="fa-solid fa-xmark"></i></li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/homepage/" id="homepage">Trang chủ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/activeUser/" id="activeUser">Hoạt động</a>
                    </li>
                </ul>
            </div>
            <div class="logo">
            </div>
            <nav class="main-nav">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/homepage/" id="homepage">Trang chủ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/activeUser/" id="activeUser">Hoạt động</a>
                    </li>

                </ul>
            </nav>
            <div class="flex-r g10 a-center " id="signIn">
                <div class="bell">
                    <i class="fa-solid fa-bell"></i>
                </div>
                <button class="primary" id="login">Đăng nhập</button>
                <ul> 
                    <li class="logoutButton">
                        <div class="wrapSignIn">
                            <div class = "avatar">NV</div>
                            <div class="blockInfor">
                                <div class="name">Nguyễn Minh Vũ</div>
                                <div class="dynamic">Admin</div>
                            </div>
                            <i class="fa-solid fa-angle-down iconArrow"></i>
                        </div>
                        <ul class="logoutMenu">
                            <li class="logOut">Đăng xuất</li>
                        </ul>
                    </li>
                </ul>
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
const login = document.querySelector("#login");
login.addEventListener("click", function () {
    window.location.assign("../../pages/signIn/index.html");
});

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobileMenu");
const closeMenu = document.querySelector(".closeMenu");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("showMenu");
    overlay.classList.add("overlayOpen");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("showMenu");
    overlay.classList.remove("overlayOpen");
});

const signInMenu = document.querySelector(".signInMenu");
const iconSignIn = document.querySelector(".signInButton .icon");
iconSignIn.addEventListener("click", () => {
    iconSignIn.classList.toggle("showSignIn");
});
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
window.addEventListener("DOMContentLoaded", () => {
    if (currentUser) {
        const loginButton = document.querySelector("#login");
        loginButton.style.display = "none";

        const signIn = document.getElementById("signIn");
        signIn.classList.add("signIned");

        const avatar = document.querySelector(".avatar");
        avatar.textContent = currentUser.name
            .split(" ")
            .filter((word, index, array) => index === 0 || index === array.length - 1)
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
        console.log(avatar.textContent);
        const name = document.querySelector(".name");
        name.textContent = currentUser.name;

        const dynamic = document.querySelector(".dynamic");
        dynamic.textContent = currentUser.role;
    }
});

const logoutButton = document.querySelector(".logoutButton");
logoutButton.addEventListener("click", () => {
    logoutButton.classList.toggle("activeButton");
});

const logOut = document.querySelector(".logOut");
logOut.addEventListener("click", async () => {
    const nameDisplay = document.querySelector(".name");
    if (nameDisplay) nameDisplay.textContent = "Đang đăng xuất...";

    localStorage.removeItem("currentUser");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedCourse");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    window.location.href = "../../pages/homepage/index.html";
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
