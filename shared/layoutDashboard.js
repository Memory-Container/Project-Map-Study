let header = document.getElementsByTagName("header")[0] ?? [];
let containerTool = document.getElementsByClassName("containerTool")[0] ?? [];
header.innerHTML = `
        <div class="logo">Logo</div>
            <div class="containerMenu">
                <div class="boxMenu">
                    <div class="dashboardContent">Chính</div>
                    <ul class="listMenu">
                        <li class="nameList showNameList">
                            <a href="../../pages/adminDashboard/index.html" class="nameTarget target targetChange" id="adminDashboard">
                                <div><i class="fa-solid fa-sliders"></i> <span>Cơ bản</span></div>
                                <i class="fa-solid fa-angle-down"></i>
                            </a>
                            <ul class="listSmall">
                                <li>Web Dev</li>
                                <li>App Dev</li>
                                <li>Design</li>
                            </ul>
                        </li>
                        <li>
                            <a href="../../pages/studentListOfAdmin/index.html" class="nameTarget nameTargetChange" id="studentListOfAdmin"><i class="fa-solid fa-user-group"></i> Học viên</a>
                        </li>
                    </ul>
                </div>
                <div class="boxMenu">
                    <div class="dashboardContent">Quản lý</div>
                    <ul class="listMenu">
                        <li>
                            <a href="../../pages/gradingPage/index.html" class="nameTarget nameTargetChange" id="gradingPage"><i class="fa-solid fa-book"></i> Chấm bài tập</a>
                        </li>
                        <li>
                            <a href="../../pages/activeAdmin/index.html" class="nameTarget nameTargetChange" id="activeAdmin"><i class="fa-solid fa-book"></i> Hoạt động</a>
                        </li>
                    </ul>
                </div>
                <div class="boxMenu">
                    <div class="dashboardContent">Hệ thống</div>
                    <ul class="listMenu">
                        <li>
                            <div class="nameTarget nameTargetChange"><i class="fa-solid fa-triangle-exclamation"></i> Cảnh bảo</div>
                        </li>
                    </ul>
                </div>
                <div class="logout">
                    <span>Đăng xuất</span>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
    `;
containerTool.innerHTML = `
            <div class="bell">
                <i class="fa-solid fa-bell"></i>
            </div>
            <div class="boxSignIn">
                <div class="wrapSignIn">
                    <div id="avatar"></div>
                    <div class="blockInfor">
                        <div class="name">Nguyễn Minh Vũ</div>
                        <div class="dynamic">Admin</div>
                    </div>
                </div>
            </div>
`;

const logout = document.querySelector(".logout");
logout.addEventListener("click", function () {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    window.location.href = "../../pages/homepage/index.html";
});

const nameTarget = document.querySelectorAll(".boxMenu .nameTarget");
nameTarget.forEach((item) => {
    item.addEventListener("click", () => {
        nameTarget.forEach((i) => {
            i.classList.remove("target");
        });
        item.classList.add("target");
    });
});

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
window.addEventListener("DOMContentLoaded", () => {
    if (currentUser) {
        const avatar = document.querySelector("#avatar");
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

const pathSegments = window.location.pathname.split("/").filter(Boolean);
const currentPages = pathSegments[1] || "defaultPage";
const nameTargetChange = () => {
    if (currentPages == "signIn") {
        const signIn = document.querySelector("#signIn");
        if (signIn) {
            signIn.style.display = "none";
        }
    }

    nameTarget.forEach((item) => {
        item.classList.remove("target");
    });

    for (let i = 0; i < nameTarget.length; i++) {
        if (nameTarget[i].id === currentPages) {
            nameTarget[i].classList.add("target");
        }
    }
};


nameTargetChange();
