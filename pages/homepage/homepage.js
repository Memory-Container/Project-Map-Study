function openStartModal() {
    openModal({
        title: "",
        message: `
            <div class="modal123">
                <div class="title">Để hỗ trợ tốt nhất, bạn có muốn BCN giúp bạn xác định mục tiêu và lộ trình cá nhân hóa không?</div>
                <div class="wrapButton">
                </div> 
            </div>
        `,
        options: [
            {
                type: "tertiary",
                message: "Bỏ qua",
                callback: function () {
                    closeModal();
                    window.location.href = "/pages/course/index.html";
                },
            },
            {
                type: "primary",
                message: "Mình cần tư vấn",
                callback: function () {
                    closeModal();
                    window.location.href = "/pages/quiz/index.html";
                },
            },
        ],
    });
}
