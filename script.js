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

document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const carousel = document.querySelector(".carousel");

    if (!carouselContainer || !carousel) return;

    const cards = document.querySelectorAll(".testimonial-card");
    const cardWidth = cards[0].offsetWidth + 20; // Ancho de la tarjeta + gap
    let isDragging = false;
    let startX, scrollLeft;
    let autoScrollActive = true;
    let interval; // Variable para el auto-scroll

    // ---- DUPLICAR ELEMENTOS PARA LOOP INFINITO ----
    cards.forEach((card) => {
        let clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    // ---- VERIFICAR Y REINICIAR EL CARRUSEL CUANDO LLEGUE AL FINAL ----
    function checkLoop() {
        const maxScroll = carousel.scrollWidth / 2;
        if (carouselContainer.scrollLeft >= maxScroll) {
            carouselContainer.scrollLeft = 0;
        }
    }

    // ---- AUTO-SCROLL CADA 2 SEGUNDOS ----
    function startAutoScroll() {
        stopAutoScroll(); // Evitar múltiples intervalos activos
        interval = setInterval(() => {
            if (!autoScrollActive || isDragging) return; // No moverse si el usuario está arrastrando
            carouselContainer.scrollTo({
                left: carouselContainer.scrollLeft + cardWidth,
                behavior: "smooth"
            });
            checkLoop();
        }, 2000);
    }

    // ---- DETENER AUTO-SCROLL CUANDO EL USUARIO INTERACTÚA ----
    function stopAutoScroll() {
        clearInterval(interval);
        autoScrollActive = false;
    }

    // ---- REANUDAR AUTO-SCROLL DESPUÉS DE 5 SEGUNDOS SIN INTERACCIÓN ----
    function restartAutoScroll() {
        stopAutoScroll();
        setTimeout(() => {
            autoScrollActive = true;
            startAutoScroll();
        }, 5000);
    }

    // ---- INTERACCIÓN CON EL MOUSE (ARRASTRAR EN PC) ----
    carouselContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        carouselContainer.style.cursor = "grabbing";
        stopAutoScroll();
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        carouselContainer.style.cursor = "grab";
        restartAutoScroll();
    });

    carouselContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselContainer.offsetLeft;
        const moveX = x - startX;
        carouselContainer.scrollLeft = scrollLeft - moveX; // Mantener posición final
    });

    // ---- INTERACCIÓN CON EL DEDO (SWIPE EN MÓVILES) ----
    carouselContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        stopAutoScroll();
    });

    carouselContainer.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - carouselContainer.offsetLeft;
        const moveX = x - startX;
        carouselContainer.scrollLeft = scrollLeft - moveX; // Mantener posición final
    });

    carouselContainer.addEventListener("touchend", () => {
        isDragging = false;
        restartAutoScroll();
    });

    startAutoScroll(); // Iniciar auto-scroll al cargar
});

document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".faqs__content-right-accordion-item");

    accordionItems.forEach(item => {
        const label = item.querySelector(".faqs__content-right-accordion-item-texts-label");
        const cross = item.querySelector(".faqs__content-right-accordion-item-texts-cross");
        const content = item.querySelector(".faqs__content-right-accordion-item-content");

        label.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Close all accordion items
            accordionItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faqs__content-right-accordion-item-texts-label").style.color = "#a57cd8";
                i.querySelector(".faqs__content-right-accordion-item-texts-cross").textContent = "x";
                i.querySelector(".faqs__content-right-accordion-item-content").style.display = " ";
            });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add("active");
                label.style.color = "#a57cd8";
                cross.textContent = "x";
                content.style.display = "block";
            }
        });
    });
});

const titleEl = document.querySelectorAll(".c-accordion01 dt");

// array
Array.from(titleEl).map((item, i) => {
  // item click
  titleEl[i].addEventListener("click", (e) => {
    // target toggle
    const titleTarget = e.target.nextElementSibling;
    titleTarget.classList.toggle("is-show");

    // button
    const titleBtn = e.target.querySelector(".c-accordion01__btn");
    titleBtn.classList.toggle("is-close");

    // target height
    let showHeight = titleTarget.scrollHeight;

    // slideDown
    function slideDown() {
      titleTarget.animate(
        [
          // keyframes
          {
            opacity: 0,
            height: 0
          },
          {
            opacity: 1,
            height: showHeight + "px"
          }
        ],
        {
          // timing
          fill: "forwards",
          duration: 300
        }
      );
    }

    // slideUp
    function slideUp() {
      titleTarget.animate(
        [
          // keyframes
          {
            opacity: 1,
            height: showHeight + "px"
          },
          {
            opacity: 0,
            height: 0
          }
        ],
        {
          // timing
          fill: "forwards",
          duration: 300
        }
      );
    }

    // accordion
    if (titleTarget.classList.contains("is-show")) {
      slideDown();
    } else {
      slideUp();
    }
  });
});

document.getElementById('navbar-toggle').addEventListener('click', function() {
  document.getElementById('navbar-menu').classList.toggle('active');
  document.querySelector('.header__navbar').classList.toggle('active');
});

window.addEventListener('scroll', function() {
  const navbarToggle = document.getElementById('navbar-toggle');
  if (window.scrollY > 50) {
    navbarToggle.classList.add('scrolled');
  } else {
    navbarToggle.classList.remove('scrolled');
  }
});

document.querySelectorAll('.accordion-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(event) {
    event.preventDefault();
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }
  });
});