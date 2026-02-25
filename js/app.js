document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTION SIDEBAR
    const burger = document.querySelector('.menu-icon');
    const closeBtn = document.querySelector('.close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    const toggleMenu = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if (burger) burger.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // 2. GESTION SECTIONS
    const DURATION = 900; // ms — doit correspondre à la transition CSS
    const CLOSED_H = 280; // px — hauteur fermée mobile
    const OPEN_H   = 600; // px — hauteur ouverte mobile

    const sections = document.querySelectorAll('.section:not(.engage)');

    function closeSection(section) {
        const content = section.querySelector('.section-content');
        // 1. Cacher le texte immédiatement
        content.classList.remove('visible');
        // 2. Réduire la hauteur
        section.style.height = CLOSED_H + 'px';
        section.classList.remove('active');
    }

    function openSection(section) {
        const content = section.querySelector('.section-content');
        // 1. Agrandir la hauteur
        section.style.height = OPEN_H + 'px';
        section.classList.add('active');
        // 2. Faire apparaître le texte à mi-chemin de l'animation
        setTimeout(() => {
            content.classList.add('visible');
        }, DURATION * 0.45);
    }

    sections.forEach(section => {
        const container = section.querySelector('.section-container');
        if (!container) return;

        // Initialiser la hauteur en inline pour que la transition CSS fonctionne
        if (window.innerWidth < 1024) {
            section.style.height = CLOSED_H + 'px';
        }

        container.addEventListener('click', () => {
            if (window.innerWidth >= 1024) return;

            const isActive = section.classList.contains('active');

            // Fermer toutes les autres
            sections.forEach(s => {
                if (s !== section) closeSection(s);
            });

            if (isActive) {
                closeSection(section);
            } else {
                openSection(section);
            }
        });
    });

    // Réinitialiser les hauteurs inline si on redimensionne vers desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            sections.forEach(s => {
                s.style.height = '';
                s.classList.remove('active');
                const content = s.querySelector('.section-content');
                if (content) content.classList.remove('visible');
            });
        } else {
            sections.forEach(s => {
                if (!s.classList.contains('active')) {
                    s.style.height = CLOSED_H + 'px';
                }
            });
        }
    });
});