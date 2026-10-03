document.addEventListener('DOMContentLoaded', function() {

    /* ==========================================================================
       1. SCROLL REVEAL OPTIMISÉ POUR 60/120 FPS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }


    /* ==========================================================================
       2. MENU NAVIGATION MOBILE (BURGER DRAWER)
       ========================================================================== */
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMobileMenu() {
        if (!mobileDrawer || !mobileOverlay) return;
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!mobileDrawer || !mobileOverlay) return;
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });


    /* ==========================================================================
       3. RECHERCHE EN DIRECT - COMMUNE DANS LA ZONE D'ACTION
       ========================================================================== */
    const citySearchInput = document.getElementById('city-search');
    const zoneTagsContainer = document.getElementById('zone-tags-container');

    if (citySearchInput && zoneTagsContainer) {
        const zoneTags = zoneTagsContainer.querySelectorAll('.zone-tag');

        citySearchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();

            zoneTags.forEach(tag => {
                const text = tag.textContent.toLowerCase();
                if (text.includes(query)) {
                    tag.classList.remove('hidden');
                } else {
                    tag.classList.add('hidden');
                }
            });
        });
    }


    /* ==========================================================================
       4. FAQ ACCORDÉON INTERACTIF
       ========================================================================== */
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const isOpen = currentItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isOpen) {
                currentItem.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       5. SYSTÈME DE NOTIFICATION TOAST
       ========================================================================== */
    function showToast(title, message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';

        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
            <div class="toast-content">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3500);
    }


    /* ==========================================================================
       6. FORMULAIRE DE CONTACT
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                showToast(
                    'Demande envoyée !',
                    'Merci. Nous avons bien reçu votre message et nous vous répondrons très rapidement.'
                );

                this.reset();
            }, 600);
        });
    }

});