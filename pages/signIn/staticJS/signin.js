import { dataSignIn } from "./dataSignIn.js";
const signInInfor = document.querySelectorAll(".sign-in-information input");
signInInfor.forEach((input) => {
    input.addEventListener("input", function () {
        const validation = document.querySelector(".validation");
        validation.textContent = "";
    });
});
const signInForm = document.querySelector("#signInForm");
signInForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const mssvInput = document.querySelector("#mssv").value;
    const passwordInput = document.querySelector("#password").value;

    const user = dataSignIn.find((user) => user.mssv === mssvInput && user.password === passwordInput);
    console.log(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (!user) {
        const validation = document.querySelector(".validation");
        validation.textContent = "MSSV hoặc mật khẩu không đúng!";
        return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    if (user.role === "Admin") {
        localStorage.setItem("admin", "true");
        window.location.href = "../../pages/adminDashboard/index.html";
    } else if (user.role === "Student") {
        localStorage.setItem("user", "true");
        window.location.href = "../../pages/homepage/index.html";
    }
});
