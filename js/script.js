/* --- DESKTOP NAV & SCROLL SPY --- */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
            isScrolling = false;
        });
        isScrolling = true;
    }
});

/* --- DESKTOP MODAL LOGIC (Only runs if screen > 991px) --- */
if (window.innerWidth > 991) {
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCat = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalGallery = document.getElementById('modal-gallery');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    const toggleBodyScroll = (lock) => {
        document.body.style.overflow = lock ? 'hidden' : '';
    };

    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const project = projects[projectId];

            if (project) {
                modalTitle.textContent = project.title;
                modalCat.textContent = project.category;
                modalDesc.textContent = project.description;
                
                modalGallery.innerHTML = '';
                
                project.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.title;
                    img.onclick = function() {
                        lightbox.style.display = "flex";
                        lightboxImg.src = this.src;
                    }
                    modalGallery.appendChild(img);
                });

                modal.style.display = "block";
                toggleBodyScroll(true);
            }
        });
    });

    const hideModal = () => {
        modal.style.display = "none";
        toggleBodyScroll(false);
    };

    closeModal.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target == modal) hideModal();
    });

    const hideLightbox = () => {
        lightbox.style.display = "none";
    };

    closeLightbox.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) hideLightbox();
    });
}