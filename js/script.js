/* =========================================
   1. PROJECT DATA
   ========================================= */
const projects = {
    elderhero: {
        title: "ElderHero",
        category: "Android Mobile App & Web Admin",
        description: "ElderHero is a comprehensive mobile application designed to connect families with personalized caretakers for the elderly. It includes two distinct Android apps (one for families, one for caretakers) and a centralized Web Admin Dashboard for monitoring. Key features include real-time chat (text/voice/image), specialized filtering for caretaker expertise, and secure user authentication via Firebase.",
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
        description: "UiTM Tool Share is a collaborative platform facilitating tool rental and swapping among university students and staff. The app ensures trust and transparency through a unique QR code status update system. Features include item management, image uploads, category filtering, and real-time data synchronization.",
        images: [
            "images/toolshare1.jpeg", 
            "images/toolshare2.jpeg",
            "images/toolshare3.jpeg",
            "images/toolshare4.jpeg",
            "images/toolshare5.jpeg",
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
        ]
    }
};

/* =========================================
   2. DOM ELEMENTS
   ========================================= */
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');
const mobileCloseBtn = document.querySelector('.close-modal-btn');
const desktopCloseBtn = document.querySelector('.desktop-close-btn');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.querySelector('.close-lightbox');

/* =========================================
   3. EVENT LISTENERS
   ========================================= */

// Open Modal Triggers
document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        const project = projects[projectId];

        if (project) {
            populateAndOpenModal(project);
        }
    });
});

// Close Modal Triggers
if (mobileCloseBtn) mobileCloseBtn.onclick = closeModal;
if (desktopCloseBtn) desktopCloseBtn.onclick = closeModal;

// Close Modal when clicking outside content (Desktop mainly)
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

/* =========================================
   4. LOGIC FUNCTIONS
   ========================================= */

function populateAndOpenModal(project) {
    // 1. Set Text Content
    modalTitle.innerText = project.title;
    modalCat.innerText = project.category;
    modalDesc.innerText = project.description;

    // 2. Build Gallery based on screen size preference
    modalGallery.innerHTML = '';
    
    project.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.title;
        
        // On Desktop (> 991px), clicking image opens Lightbox
        // On Mobile, it's just a static image
        img.onclick = () => {
            if (window.innerWidth > 991) {
                openLightbox(imgSrc);
            }
        };

        modalGallery.appendChild(img);
    });

    // 3. Show Modal & Lock Scroll
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

/* =========================================
   5. LIGHTBOX UTILITIES (Desktop)
   ========================================= */

function openLightbox(src) {
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Close lightbox on click outside image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });
}
