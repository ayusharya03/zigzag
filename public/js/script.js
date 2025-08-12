document.addEventListener('DOMContentLoaded', function() {
  // ===== NAVIGATION FUNCTIONALITY =====

  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinksForActive = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinksForActive.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // ===== CAROUSEL FUNCTIONALITY =====

  const carouselTrack = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicatorsContainer = document.getElementById('carousel-indicators');

  if (carouselTrack && prevBtn && nextBtn) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isTransitioning = false;

    // Create indicators
    if (indicatorsContainer) {
      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
      }
    }

    const indicators = document.querySelectorAll('.indicator');

    function updateCarousel() {
      const translateX = -currentSlide * 100;
      carouselTrack.style.transform = `translateX(${translateX}%)`;

      // Update indicators
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
      });
    }

    function goToSlide(slideIndex) {
      if (isTransitioning) return;

      isTransitioning = true;
      currentSlide = slideIndex;
      updateCarousel();

      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }

    function nextSlide() {
      if (isTransitioning) return;

      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }

    function prevSlide() {
      if (isTransitioning) return;

      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(currentSlide);
    }

    // Event listeners for carousel controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-play carousel
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
      });

      carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    });
  }

  // ===== DONATION AMOUNT SELECTION =====

  const amountButtons = document.querySelectorAll('.amount-btn');
  const donateBtn = document.querySelector('.btn-donate');

  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      amountButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const amount = button.dataset.amount;
      if (donateBtn) {
        donateBtn.textContent = `Donate ₹${button.textContent.replace('₹', '')}`;
      }
    });
  });

  // ===== BACK TO TOP BUTTON =====

  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    }

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initial check
    toggleBackToTop();

    // Listen for scroll events
    window.addEventListener('scroll', () => {
      toggleBackToTop();
      updateActiveNavLink();
    });
  }

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== NAVBAR BACKGROUND ON SCROLL =====

  const navbar = document.querySelector('.navbar');

  if (navbar) {
    function updateNavbarBackground() {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    }

    window.addEventListener('scroll', updateNavbarBackground);
    updateNavbarBackground(); // Initial call
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.about-content, .founder-content, .join-content, .donation-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // ===== FORM VALIDATION (if needed for future forms) =====

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // ===== UTILITY FUNCTIONS =====

  // Debounce function for performance optimization
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimized scroll handler
  const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
    if (navbar) {
      updateNavbarBackground();
    }
    if (backToTopBtn) {
      toggleBackToTop();
    }
  }, 10);

  window.addEventListener('scroll', optimizedScrollHandler);

  // ===== ACCESSIBILITY IMPROVEMENTS =====

  // Add focus management for mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
      }
    });
  }

  // Announce carousel changes to screen readers
  function announceSlideChange() {
    const announcement = `Slide ${currentSlide + 1} of ${totalSlides}`;
    const srAnnouncement = document.createElement('div');
    srAnnouncement.setAttribute('aria-live', 'polite');
    srAnnouncement.setAttribute('aria-atomic', 'true');
    srAnnouncement.className = 'sr-only';
    srAnnouncement.textContent = announcement;
    document.body.appendChild(srAnnouncement);

    setTimeout(() => {
      document.body.removeChild(srAnnouncement);
    }, 1000);
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====

  // Lazy loading for image
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Preload critical images
  function preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  // Preload next carousel image
  if (carouselTrack) {
    const carouselImages = carouselTrack.querySelectorAll('img');
    if (carouselImages.length > 1) {
      preloadImage(carouselImages[1].src);
    }
  }

  console.log('The Mindful Readers website loaded successfully!');
});
