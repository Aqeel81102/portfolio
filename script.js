// Toggle Mobile Menu
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    const bars = document.querySelectorAll('.bar');
    if (sidebar.classList.contains('active')) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
        bars[0].style.transform = "none";
        bars[1].style.transform = "none";
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
            sidebar.classList.remove('active');
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = "none";
            bars[1].style.transform = "none";
        }
    });
});

// Active Link Highlighter
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 4)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

/* --- PROJECT DETAIL MODAL LOGIC --- */
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
        description: "UiTM Tool Share is a collaborative platform facilitating tool rental and swapping among university students and staff. The app ensures trust and transparency through a unique QR code status update system (rented, returned, swapped). Features include item management, image uploads, category filtering, and real-time data synchronization using Firebase Realtime Database.",
        images: [
            "images/toolshare1.jpeg",
            "images/toolshare2.jpeg",
            "images/toolshare3.jpeg",
            "images/toolshare4.jpeg",
            "images/toolshare5.jpeg"
        ]
    },
    swimhub: {
        title: "SwimHub",
        category: "Web Application",
        description: "SwimHub is a management system built to streamline operations for swimming schools. It tracks swimming schedules, student progress reports, and instructor assignments. The system provides an intuitive interface for administrators to manage class slots and for parents to view their child's swimming milestones.",
        images: [
            "images/swim1.jpeg",
            "images/swim2.jpeg",
            "images/swim3.jpeg",
            "images/swim4.jpeg",
            "images/swim5.jpeg",
        ]
    }
};

const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');

// Open Modal on "View Details" Click
document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        const project = projects[projectId];

        if (project) {
            modalTitle.textContent = project.title;
            modalCat.textContent = project.category;
            modalDesc.textContent = project.description;
            
            // Clear previous images
            modalGallery.innerHTML = '';
            
            // Add new images (6 images per project)
            project.images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = project.title + " Screenshot";
                
                // Add click event for lightbox
                img.onclick = function(){
                    const lightbox = document.getElementById('lightbox');
                    const lightboxImg = document.getElementById('lightbox-img');
                    lightbox.style.display = "flex";
                    lightboxImg.src = this.src;
                }
                
                modalGallery.appendChild(img);
            });

            modal.style.display = "block";
        }
    });
});

// Close Modal Logic
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

/* --- LIGHTBOX LOGIC --- */
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.querySelector('.close-lightbox');

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== document.getElementById('lightbox-img')) {
        lightbox.style.display = "none";
    }
});