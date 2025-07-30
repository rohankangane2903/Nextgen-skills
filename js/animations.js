document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .scale-in, .pop-in');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
                    entry.target.classList.add(entry.target.classList.contains('pop-in') ? 'pop-in' : 'animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Gallery image lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${imgSrc}" alt="Campus Image">
                        <button class="lightbox-close">&times;</button>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', () => {
                    lightbox.remove();
                });
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.remove();
                    }
                });
            });
        });
    }
    
    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            this.innerHTML = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        });
    }
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox.show {
        opacity: 1;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        border-radius: 8px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
`;

document.head.appendChild(lightboxStyles);