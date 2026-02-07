const clickImage = document.querySelectorAll(".image");
clickImage.forEach((images) => {
    images.addEventListener("click", () => {
        window.location.assign("/pages/roadmap/index.html");
    });
});
