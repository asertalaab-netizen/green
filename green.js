document.addEventListener("DOMContentLoaded", function () {
    // 1. Scroll Reveal Observer for Cards & Sections
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                const delay = entry.target.getAttribute("data-delay");
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add("active");
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add("active");
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // 2. Animated SVG Curved Line on Scroll
    const path = document.getElementById("gold-path");
    if (path) {
        const pathLength = path.getTotalLength();
        
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        window.addEventListener("scroll", () => {
            const section = document.querySelector(".creative-path-container");
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;

                let scrollPercentage = (windowHeight - rect.top) / (sectionHeight + windowHeight);
                scrollPercentage = Math.max(0, Math.min(1, scrollPercentage));

                const drawLength = pathLength * (1 - scrollPercentage);
                path.style.strokeDashoffset = drawLength;
            }
        });
    }

    // 3. Mouse Spotlight Interactive Effect on Cards
    const spotlightCards = document.querySelectorAll(".mouse-spotlight");
    spotlightCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });
});