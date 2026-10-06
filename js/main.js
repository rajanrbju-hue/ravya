/**
 * Ravya Enterprises - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // ===== Quick Enquiry Modal (show on every page load) =====
  const modal = document.getElementById('enquiryModal');
  const modalClose = document.getElementById('modalClose');
  const quickForm = document.getElementById('quickEnquiryForm');

  // Show modal after a short delay
  setTimeout(function () {
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }, 1200);

  // Close modal
  function closeModal() {
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on outside click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Quick enquiry form submit
  if (quickForm) {
    quickForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(quickForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const interest = formData.get('interest');
      const message = formData.get('message') || '';

      // Open WhatsApp with pre-filled message
      const text = encodeURIComponent(
        `Hello Ravya Enterprises,\n\nName: ${name}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${message}`
      );
      window.open(`https://wa.me/919410105257?text=${text}`, '_blank');

      quickForm.reset();
      closeModal();
      showToast('Thank you! Opening WhatsApp...');
    });
  }

  // ===== Contact Form =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const email = formData.get('email') || 'N/A';
      const service = formData.get('service');
      const message = formData.get('message');

      const text = encodeURIComponent(
        `Hello Ravya Enterprises,\n\n*Contact Form Enquiry*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`
      );
      window.open(`https://wa.me/919410105257?text=${text}`, '_blank');

      contactForm.reset();
      showToast('Thank you! Opening WhatsApp to send your message.');
    });
  }

  // ===== Toast Notification =====
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(function () {
        toast.classList.remove('show');
      }, 3500);
    }
  }

  // ===== Sticky Header =====
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== Mobile Menu =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ===== Active Nav Link on Scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ===== Smooth scroll for all anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});
