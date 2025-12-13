/* --- MOBILE OPTIMIZED MODAL LOGIC (Only runs if screen <= 991px) --- */
if (window.innerWidth <= 991) {
    
    // Select elements
    const mobileModal = document.getElementById('project-modal');
    const mobileCloseBtn = document.querySelector('.close-modal');
    const mobileTitle = document.getElementById('modal-title');
    const mobileCat = document.getElementById('modal-category');
    const mobileDesc = document.getElementById('modal-desc');
    const mobileGallery = document.getElementById('modal-gallery');

    // Helper to lock scrolling on body when modal is open
    const lockScroll = (lock) => {
        if (lock) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };

    // Event Listeners for Project Buttons
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop bubbling
            
            const projectId = btn.getAttribute('data-project');
            const project = projects[projectId];

            if (project) {
                // Populate Content
                mobileTitle.innerText = project.title;
                mobileCat.innerText = project.category;
                mobileDesc.innerText = project.description;
                
                mobileGallery.innerHTML = '';
                
                // Load Images
                project.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = project.title;
                    // On mobile, images might just be scrollable, no lightbox needed
                    mobileGallery.appendChild(img);
                });

                // Show Modal
                mobileModal.style.display = 'flex'; // Flex for full screen alignment
                lockScroll(true);
            }
        });
    });

    // Close Logic
    const closeMobileModal = () => {
        mobileModal.style.display = 'none';
        lockScroll(false);
    };

    mobileCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileModal();
    });

    // Close on background tap (optional for full screen)
    // mobileModal.addEventListener('click', (e) => {
    //     if (e.target === mobileModal) closeMobileModal();
    // });
}