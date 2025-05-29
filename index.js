document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.menu');

  if (mobileMenuBtn && menu) {
    mobileMenuBtn.addEventListener('click', function () {
      menu.classList.toggle('active');
      document.body.classList.toggle('menu-open');

      // Toggle hamburger to X
      const spans = this.querySelectorAll('span');
      if (spans.length === 3) {
        if (menu.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', function (event) {
    if (
      menu &&
      menu.classList.contains('active') &&
      !event.target.closest('nav')
    ) {
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');

      // Reset hamburger icon
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (spans.length === 3) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        document.body.classList.remove('menu-open');

        // Reset hamburger icon
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // Learning Plan Tabs - mới
  const planTabs = document.querySelectorAll('.plan-tab');
  const planItems = document.querySelectorAll('.plan-item');

  planTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const targetAge = this.getAttribute('data-age');

      // Remove active class from all tabs and items
      planTabs.forEach((t) => t.classList.remove('active'));
      planItems.forEach((item) => item.classList.remove('active'));

      // Add active class to clicked tab and corresponding item
      this.classList.add('active');
      const targetItem = document.querySelector(
        `[data-content="${targetAge}"]`
      );
      if (targetItem) {
        targetItem.classList.add('active');
      }
    });
  });

  // Theme Slider
  const themeCards = document.querySelectorAll('.theme-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  function updateSlider() {
    // Update active class for cards
    themeCards.forEach((card, index) => {
      card.classList.remove('active');
      if (index === currentIndex) {
        card.classList.add('active');
      }
    });

    // Update active class for dots
    dots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentIndex) {
        dot.classList.add('active');
      }
    });

    // Scroll to active card
    if (themeCards[currentIndex]) {
      const cardWidth = themeCards[currentIndex].offsetWidth;
      const scrollPosition = currentIndex * (cardWidth + 20); // 20px is the gap
      document.querySelector('.theme-cards').scrollLeft = scrollPosition;
    }
  }

  // Initialize slider
  if (themeCards.length > 0) {
    updateSlider();
  }

  // Event listeners for slider controls
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      currentIndex =
        currentIndex > 0 ? currentIndex - 1 : themeCards.length - 1;
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      currentIndex =
        currentIndex < themeCards.length - 1 ? currentIndex + 1 : 0;
      updateSlider();
    });
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
      currentIndex = index;
      updateSlider();
    });
  });

  // Auto slide every 5 seconds
  if (themeCards.length > 0) {
    setInterval(function () {
      if (!document.hidden) {
        // Only auto-slide when page is visible
        currentIndex =
          currentIndex < themeCards.length - 1 ? currentIndex + 1 : 0;
        updateSlider();
      }
    }, 5000);
  }

  // Schedule Animation on Scroll 
  const scheduleItems = document.querySelectorAll('.schedule-item');

  function animateScheduleItems() {
    scheduleItems.forEach((item, index) => {
      // It gets the position of the top of each item relative to the viewport and the current window height.
      const itemTop = item.getBoundingClientRect().top; 
      const windowHeight = window.innerHeight;

      if (itemTop < windowHeight - 100) {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, index * 100);
      }
    });
  }

  // Initialize schedule items as hidden
  scheduleItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
  });

  // Scroll event for animations
  window.addEventListener('scroll', function () {
    animateScheduleItems();

    // Add scroll-based animations for other elements
    const animatedElements = document.querySelectorAll('.plan-card, .feature');

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  });

  // Initialize animated elements
  const animatedElements = document.querySelectorAll('.plan-card, .feature');
  animatedElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
  });

  // Form submission with enhanced validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const childAge = document.getElementById('child-age').value;
      const message = document.getElementById('message').value;

      // Simple validation
      if (!name || !phone || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Email không hợp lệ!', 'error');
        return;
      }

      // Phone validation
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showNotification('Số điện thoại không hợp lệ!', 'error');
        return;
      }

      // Show loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Đang gửi...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        showNotification(
          'Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.',
          'success'
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Notification System
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${
          type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'
        }</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      background-color: ${
        type === 'success'
          ? '#d4edda'
          : type === 'error'
          ? '#f8d7da'
          : '#d1ecf1'
      };
      border: 1px solid ${
        type === 'success'
          ? '#c3e6cb'
          : type === 'error'
          ? '#f5c6cb'
          : '#bee5eb'
      };
      color: ${
        type === 'success'
          ? '#155724'
          : type === 'error'
          ? '#721c24'
          : '#0c5460'
      };
    `;

    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      margin-left: auto;
      color: inherit;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
      removeNotification(notification);
    }, 5000);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
      clearTimeout(autoRemove);
      removeNotification(notification);
    });
  }

  function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Lazy Loading for Images
  const images = document.querySelectorAll('img[src*="placeholder"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Here you would replace with actual image URLs
        // img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Search Functionality (if search input exists)
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      const searchableElements = document.querySelectorAll(
        '.news-card, .program-card, .teacher-card'
      );

      searchableElements.forEach((element) => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
    });
  }

  // Back to Top Button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  // Back to top functionality
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Initialize animations on page load
  setTimeout(() => {
    animateScheduleItems();
  }, 500);

  // Performance optimization: Debounce scroll events
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

  // Apply debounce to scroll events
  const debouncedScroll = debounce(() => {
    animateScheduleItems();
  }, 100);

  window.addEventListener('scroll', debouncedScroll);

  console.log('CUTE-BABY website initialized successfully! 🎈');
});
