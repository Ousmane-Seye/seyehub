document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('scroll', () => {
        let navBar = document.querySelector('nav');
        if (window.scrollY >0) {
            navBar.style.background = 'white';
            navBar.style.boxShadow = '0 5px 20px rgba(190, 190, 190, 0.15)'
        }
        else {
            navBar.style.background = 'transparent';
            navBar.style.boxShadow = 'none'
        }
    })
})

// Ajout d'animations pour les éléments en scroll
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".collection-item, .product-item, .promo-box");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => observer.observe(element));
});

// Ajout d'animation au clic des boutons
const buttons = document.querySelectorAll(".blue-button, .white-button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("clicked");
        setTimeout(() => button.classList.remove("clicked"), 300);
    });
});

// Animation du menu navbar lors du scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Animation de type "smooth scroll" pour les liens
const links = document.querySelectorAll("a[href^='#']");
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
