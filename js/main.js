/**
 * squote.ai Landing Page — Main Script
 *
 * Handles:
 * - Intersection Observer for scroll-triggered animations
 * - Parallax effect on hero + problem sections
 * - Counter animations (social proof, stats)
 * - Sticky header show/hide
 * - Find Your Trade background crossfade
 * - Annual/monthly pricing toggle
 */

// Intersection Observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add staggered delay based on element index within parent
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.animate-in'));
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 100}ms`;
      
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-in').forEach(el => {
  observer.observe(el);
});

// Sticky header show/hide with smooth behavior
const header = document.getElementById('header');
const hero = document.getElementById('hero');
let lastScroll = 0;
let ticking = false;

const updateHeader = () => {
  const heroBottom = hero.offsetHeight * 0.5;
  const currentScroll = window.pageYOffset;

  if (currentScroll > heroBottom) {
    header.classList.add('visible');
  } else {
    header.classList.remove('visible');
  }

  lastScroll = currentScroll;
  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

// Parallax effect on hero and problem sections
const heroBackground = document.querySelector('.hero-background');
const problemBackground = document.querySelector('.problem-background');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  if (heroBackground) {
    const heroOffset = scrolled * 0.6;
    heroBackground.style.transform = `translateY(${heroOffset}px)`;
  }

  if (problemBackground) {
    const problemSection = document.querySelector('.problem');
    const problemTop = problemSection.offsetTop;
    const problemOffset = (scrolled - problemTop + window.innerHeight) * 0.6;
    problemBackground.style.transform = `translateY(${problemOffset}px)`;
  }
});

// Find Your Trade background crossfade
const tradeCards = document.querySelectorAll('.trade-card');
const tradeBackgrounds = document.querySelectorAll('.trade-bg');

tradeCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const trade = card.getAttribute('data-trade');

    tradeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    tradeBackgrounds.forEach(bg => {
      bg.classList.remove('active');
      if (bg.getAttribute('data-trade') === trade) {
        bg.classList.add('active');
      }
    });
  });

  card.addEventListener('click', () => {
    const trade = card.getAttribute('data-trade');

    tradeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    tradeBackgrounds.forEach(bg => {
      bg.classList.remove('active');
      if (bg.getAttribute('data-trade') === trade) {
        bg.classList.add('active');
      }
    });
  });
});

// Annual/monthly pricing toggle
const billingToggle = document.getElementById('billing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');
const monthlyPeriods = document.querySelectorAll('.monthly-period');
const annualPeriods = document.querySelectorAll('.annual-period');

billingToggle.addEventListener('change', (e) => {
  const isAnnual = e.target.checked;

  if (isAnnual) {
    monthlyPrices.forEach(el => el.style.display = 'none');
    annualPrices.forEach(el => el.style.display = 'inline');
    monthlyPeriods.forEach(el => el.style.display = 'none');
    annualPeriods.forEach(el => el.style.display = 'inline');
  } else {
    monthlyPrices.forEach(el => el.style.display = 'inline');
    annualPrices.forEach(el => el.style.display = 'none');
    monthlyPeriods.forEach(el => el.style.display = 'inline');
    annualPeriods.forEach(el => el.style.display = 'none');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Counter animation for social proof numbers
function animateCounter(element, target, duration = 800) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animation when social proof is visible
const socialProofObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const text = entry.target.querySelector('.social-proof-text');
      if (text && !text.dataset.animated) {
        text.dataset.animated = 'true';
      }
      socialProofObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const socialProof = document.querySelector('.social-proof');
if (socialProof) {
  socialProofObserver.observe(socialProof);
}

// Add subtle tilt effect to cards on hover
const cards = document.querySelectorAll('.pricing-card, .step, .feature-group');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
