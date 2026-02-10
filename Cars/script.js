
let lastScrollY = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
        if (window.scrollY > lastScrollY) {
            navbar.classList.add("nav-hidden");
        } else {
            navbar.classList.remove("nav-hidden");
        }
        lastScrollY = window.scrollY;
    });
});

function startCountUp() {
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1200;
        const frameRate = 30;
        const totalFrames = Math.round(duration / (1000 / frameRate));
        let frame = 0;

        // Reset to 0 every time before starting again
        counter.innerText = 0;

        const updateCounter = () => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.floor(target * progress);

            counter.innerText = currentValue;

            if (frame < totalFrames) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

// YOUR SECTION
const abtSection = document.querySelector('.abt-btn');

// Trigger animation every time section enters view
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCountUp();
    }
}, { threshold: 0.6 });

observer.observe(abtSection);


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    }).then(() => {
        // reload the page
        location.reload();
    });
});
