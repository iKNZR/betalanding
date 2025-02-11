document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero__image");
    const prevBtn = document.querySelector(".hero__prev");
    const nextBtn = document.querySelector(".hero__next");
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function restartAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    prevBtn.addEventListener("click", () => {
        prevSlide();
        restartAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
        nextSlide();
        restartAutoSlide();
    });

    showSlide(currentIndex);
    restartAutoSlide();
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.classList.add('scrolling');
    } else {
        header.classList.remove('scrolling');
    }
});