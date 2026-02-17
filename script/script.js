let currentLang = 'pt';

/* =========================
   LANGUAGE SYSTEM (CLEAN)
========================= */

function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    updateContent();
    updateLanguageButton();
    localStorage.setItem('lang', currentLang);
}

function updateContent() {
    document.querySelectorAll('[data-pt]').forEach(element => {
        const translation = element.getAttribute(`data-${currentLang}`);
        if (translation) {
            element.innerHTML = translation;
        }
    });
}

function updateLanguageButton() {
    const langButton = document.querySelector('.lang-toggle');
    if (langButton) {
        langButton.textContent = currentLang === 'pt' ? 'EN' : 'PT';
        langButton.classList.toggle('active', currentLang === 'en');
    }
}

/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =========================
   NAV SCROLL EFFECT
========================= */

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navigation');
    if (!nav) return;

    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

/* =========================
   ANIMATION ON SCROLL
========================= */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

/* =========================
   FAQ
========================= */

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

/* =========================
   PARALLAX (DESKTOP ONLY)
========================= */

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 1024) return;

    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    ['.hero', '.process-section', '.cta-section'].forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.backgroundPositionY = `${rate}px`;
        }
    });
});

/* =========================
   INIT
========================= */

document.addEventListener('DOMContentLoaded', function () {

    // Restore saved language
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
    }

    updateContent();
    updateLanguageButton();

    const langButton = document.querySelector('.lang-toggle');
    if (langButton) {
        langButton.addEventListener('click', toggleLanguage);
    }

});