/* --- NAVIGATION & MOBILE MENU --- */
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-links li a');
const bars = document.querySelectorAll('.bar');

function toggleMenu() {
    sidebar.classList.toggle('active');
    
    // Animate Hamburger
    if (sidebar.classList.contains('active')) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.transform = "rotate(-45deg) translate(5px, -5px)";
        // Prevent background scrolling when menu is open on mobile
        if (window.innerWidth <= 991) document.body.style.overflow = 'hidden';
    } else {
        bars[0].style.transform = "none";
        bars[1].style.transform = "none";
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close menu if on mobile
        if (window.innerWidth <= 991) {
            sidebar.classList.remove('active');
            bars[0].style.transform = "none";
            bars[1].style.transform = "none";
            document.body.style.overflow = '';
        }
    });
});

/* --- SCROLL SPY (Optimized for Mobile Performance) --- */
const sections = document.querySelectorAll('section');
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                // Offset calculation for mobile headers
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

/* --- TYPING EFFECT --- */
const typingElement = document.querySelector('.typing-text');
const roles = ["IT Student.", "Android Developer.", "Problem Solver."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
document.addEventListener('DOMContentLoaded', type);


/* --- PROJECT DATA & MODAL LOGIC --- */

// Helper to lock/unlock body scroll
const toggleBodyScroll = (lock) => {
    document.body.style.overflow = lock ? 'hidden' : '';
};

const projects = {
    elderhero: {
        title: "ElderHero",
        category: "Android Mobile App & Web Admin",
        description: "ElderHero is a comprehensive mobile application designed to connect families with personalized caretakers for the elderly. It includes two distinct Android apps (one for families, one for caretakers) and a centralized Web Admin Dashboard for monitoring.",
        images: [
            "images/login.jpeg",
            "images/image.png",       
            "images/images2.jpeg",    
            "images/images3.jpeg",    
            "images/images4.jpeg",    
            "images/images5.jpeg"        
        ]
    },
    toolshare: {
        title: "UiTM Tool Share",
        category: "Android Mobile App",
        description: "UiTM Tool Share is a collaborative platform facilitating tool rental and swapping among university students and staff. The app ensures trust and transparency through a unique QR code status update system.",
        images: [
            "images/toolshare1.jpeg",
            "images/toolshare2.jpeg",
            "images/toolshare3.jpeg",
            "images/toolshare4.jpeg",
            "images/toolshare5.jpeg",
            "images/logo.png"
        ]
    },
    swimhub: {
        title: "SwimHub",
        category: "Web Application",
        description: "SwimHub is a management system built to streamline operations for swimming schools. It tracks swimming schedules, student progress reports, and instructor assignments.",
        images: [
            "images/swim1.jpeg",
            "images/swim2.jpeg",
            "images/swim3.jpeg",
            "images/swim4.jpeg",
            "images/swim5.jpeg",
            "images/logo2.png"
        ]
    }
};

const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

// Open Modal
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
                
                // Lightbox Trigger (Tap to zoom)
                img.onclick = function() {
                    lightbox.style.display = "flex";
                    lightboxImg.src = this.src;
                    // Note: Body is already locked by modal, so we don't need to lock again
                }
                
                modalGallery.appendChild(img);
            });

            modal.style.display = "block";
            toggleBodyScroll(true); // Lock scroll
        }
    });
});

// Close Modal
const hideModal = () => {
    modal.style.display = "none";
    toggleBodyScroll(false); // Unlock scroll
};

closeModal.addEventListener('click', hideModal);
window.addEventListener('click', (e) => {
    if (e.target == modal) hideModal();
});

// Close Lightbox
const hideLightbox = () => {
    lightbox.style.display = "none";
    // We do NOT unlock scroll here because the underlying modal is still open
};

closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) hideLightbox();
});
