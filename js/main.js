document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Course slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    
    if (sliderContainer && sliderPrev && sliderNext) {
        sliderPrev.addEventListener('click', function() {
            sliderContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        sliderNext.addEventListener('click', function() {
            sliderContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialCards.length > 0 && testimonialDots.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialCards[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentSlide = index;
        }
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto slide change
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(nextSlide);
        }, 5000);
    }
    
    // Course category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (categoryBtns.length > 0 && courseCards.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                courseCards.forEach(card => {
                    if (category === 'all' || card.classList.contains(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Job department filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    
    if (filterBtns.length > 0 && jobCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const department = this.dataset.department;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                jobCards.forEach(card => {
                    if (department === 'all' || card.classList.contains(department)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Toggle course details
    const toggleDetailsBtns = document.querySelectorAll('.toggle-details');
    
    toggleDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.course-card, .job-card');
            const details = card.querySelector('.course-details, .job-description');
            
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.textContent = 'Hide Details';
            } else {
                this.textContent = 'View Details';
            }
        });
    });
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            this.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(stat);
                }
            });
            
            observer.observe(stat);
        });
    }
    
    // Initialize AOS (Animate On Scroll) for careers page
    if (document.querySelector('[data-aos]')) {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        const animateOnScroll = () => {
            aosElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('aos-animate');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
    }
});