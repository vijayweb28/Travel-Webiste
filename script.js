document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const contactForm = document.getElementById('contact-form');

    // 1. Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Hamburger Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // 3. Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play slider
    setInterval(nextSlide, 7000);

    // 4. Scroll Reveal Animation
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Active Nav Link on Scroll
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'));

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - navHeight - 50) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 6. Contact Form Validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const destinationInput = document.getElementById('destination');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = checkInputs();
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            clearStatusClasses();
        }
    });

    function checkInputs() {
        let formIsValid = true;
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const destinationValue = destinationInput.value;
        const messageValue = messageInput.value.trim();

        if (nameValue === '') {
            setErrorFor(nameInput, 'Full name cannot be blank');
            formIsValid = false;
        } else {
            setSuccessFor(nameInput);
        }

        if (emailValue === '') {
            setErrorFor(emailInput, 'Email cannot be blank');
            formIsValid = false;
        } else if (!isEmail(emailValue)) {
            setErrorFor(emailInput, 'Not a valid email');
            formIsValid = false;
        } else {
            setSuccessFor(emailInput);
        }
        
        if (destinationValue === '') {
            setErrorFor(destinationInput, 'Please choose a destination');
            formIsValid = false;
        } else {
            setSuccessFor(destinationInput);
        }
        
        if (messageValue === '') {
            setErrorFor(messageInput, 'Message cannot be blank');
            formIsValid = false;
        } else {
            setSuccessFor(messageInput);
        }
        
        return formIsValid;
    }

    function setErrorFor(input, message) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('.error-message');
        formGroup.className = 'form-group error';
        small.innerText = message;
    }

    function setSuccessFor(input) {
        const formGroup = input.parentElement;
        formGroup.className = 'form-group success';
    }
    
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function clearStatusClasses() {
        [nameInput, emailInput, destinationInput, messageInput].forEach(input => {
             const formGroup = input.parentElement;
             formGroup.classList.remove('success', 'error');
        });
    }
});