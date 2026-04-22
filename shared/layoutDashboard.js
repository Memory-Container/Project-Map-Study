let header = document.getElementsByTagName("header")[0] ?? [];
let containerTool = document.getElementsByClassName("containerTool")[0] ?? [];
header.innerHTML = `
        <div class="logo">Logo</div>
            <div class="containerMenu">
                <div class="boxMenu">
                    <div class="dashboardContent">Chính</div>
                    <ul class="listMenu">
                        <li class="nameList showNameList">
                            <div class="nameTarget target">
                                <div><i class="fa-solid fa-sliders"></i> <span>Cơ bản</span></div>
                                <i class="fa-solid fa-angle-down"></i>
                            </div>
                            <ul class="listSmall">
                                <li>Web Dev</li>
                                <li>App Dev</li>
                                <li>Design</li>
                            </ul>
                        </li>
                        <li>
                            <div class="nameTarget nameTargetChange"><i class="fa-solid fa-user-group"></i> Học viên</div>
                        </li>
                    </ul>
                </div>
                <div class="boxMenu">
                    <div class="dashboardContent">Quản lý</div>
                    <ul class="listMenu">
                        <li>
                            <div class="nameTarget nameTargetChange"><i class="fa-solid fa-book"></i> Bài tập</div>
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
                    <i class="fa-solid fa-circle-user icon"></i>
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
