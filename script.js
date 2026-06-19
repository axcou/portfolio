/* ============================================================
   NAVBAR – scroll & burger
============================================================ */
const navbar = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ============================================================
   REVEAL ON SCROLL
============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings inside the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ============================================================
   PROJECT TABS
============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById('tab-' + target).classList.add('active');

    // Re-trigger reveal for newly visible cards
    document.getElementById('tab-' + target).querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => observer.observe(el), 50);
    });
  });
});

/* ============================================================
   DRAG-TO-SCROLL on project carousels
============================================================ */
document.querySelectorAll('.projects-grid').forEach(slider => {
  let isDown = false, startX, scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => { isDown = false; });
  slider.addEventListener('mouseup',    () => { isDown = false; });
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  slider.addEventListener('wheel', e => {
    e.preventDefault();
    slider.scrollBy({ left: e.deltaY, behavior: 'smooth' });
  }, { passive: false });
});

/* ============================================================
   CONTACT FORM (demo – no backend)
============================================================ */
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message envoyé !';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Envoyer le message';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});

/* ============================================================
   FOOTER YEAR
============================================================ */
document.getElementById('year').textContent = new Date().getFullYear();
