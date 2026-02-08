const mockUser = [
    {
        ID: "111111",
        password: "123456",
    },
    {
        ID: "user",
        password: "password",
    },
];
const signUp = document.querySelector(".login");
const statused = document.getElementById("status");

signUp.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.getElementById("ID").value;
    const password = document.getElementById("password").value;

    const loginData = {
        ID: id,
        password: password,
    };
    console.log(loginData);

    const foundUser = mockUser.find(
        (u) => u.ID === loginData.ID && u.password === loginData.password,
    );
    if (!foundUser) {
        statused.innerText = "ID hoặc mật khẩu không đúng";
    } else {
        localStorage.setItem("currentUser", JSON.stringify(loginData));
        setTimeout(() => {
            window.location.href = "/pages/homepage/index.html";
        }, 500);
    }
});
