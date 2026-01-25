document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".section1 .container .card");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSlide() {
        const isMobile = window.matchMedia("(max-width: 880px)").matches;
        cards.forEach((card, index) => {
            if (isMobile) {
                if (index === currentIndex) {
                    card.style.opacity = "1";
                    card.style.visibility = "visible";
                    card.style.zIndex = "5";
                } else {
                    card.style.opacity = "0";
                    card.style.visibility = "hidden";
                    card.style.zIndex = "0";
                }
            } else {
                card.style.opacity = "";
                card.style.visibility = "";
                card.style.zIndex = "";
                card.style.transform = "";
            }
        });
    }
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalCards - 1;
            }
            updateSlide();
        });
        nextBtn.addEventListener("click", function () {
            if (currentIndex < totalCards - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlide();
        });
    }
    window.addEventListener("resize", updateSlide);
    updateSlide();
});
