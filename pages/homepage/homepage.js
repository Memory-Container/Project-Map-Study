function openStartModal() {
    openModal({
        title: "Hỗ trợ khóa mục tiêu",
        message: `
            Nếu bạn chưa có định hướng là mình sẽ làm gì thì để hỗ trợ bạn tốt nhất. 
            Chúng mình đã tạo ra một số câu trắc nghiệm để giúp bạn lựa chọn và khóa mục tiêu học của mình.<br>
            Nếu bạn đã có định hường học tập thì chọn <b>Xem lộ trình</b> để xem được những mục tiêu học mà bọn mình hiện có
        `,
        options: [
            {
                type: "tertiary",
                message: `Xem lộ trình`,
                callback: () => {window.location.href = "/pages/course/"}
            },
            {
                type: "primary",
                message: "Làm trắc nghiệm",
                callback: () => {window.location.href = "/pages/quiz/"}
            },
        ],
    });
}
