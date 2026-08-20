const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

function closeMenu() {
  nav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    closeMenu();

    if (href === '#home' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname + window.location.search);
      return;
    }

    const headerHeight = header?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', href);
  });
});

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 18);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });
sections.forEach((section) => activeObserver.observe(section));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;
const canTilt = finePointer && !reduceMotion;

if (canTilt) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${y * -6}deg) rotateY(${x * 7}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => {
    if (!glow) return;
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = '1';
  }, { passive: true });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

const shapeButtons = [...document.querySelectorAll('[data-shape]')];
const finishButtons = [...document.querySelectorAll('[data-finish]')];
const labHand = document.querySelector('#lab-hand');
const shapeName = document.querySelector('#shape-name');
const finishName = document.querySelector('#finish-name');

const shapeLabels = {
  almond: 'Almond',
  coffin: 'Coffin',
  square: 'Square',
  stiletto: 'Stiletto'
};
const finishLabels = {
  pink: 'Pink Chrome',
  lime: 'Electric Lime',
  black: 'Black Chrome',
  purple: 'Purple Aura'
};

function setShape(shape) {
  if (!labHand) return;
  Object.keys(shapeLabels).forEach((key) => labHand.classList.remove(`shape-${key}`));
  labHand.classList.add(`shape-${shape}`);
  shapeButtons.forEach((button) => button.classList.toggle('active', button.dataset.shape === shape));
  if (shapeName) shapeName.textContent = shapeLabels[shape] || shape;
}

function setFinish(finish) {
  if (!labHand) return;
  Object.keys(finishLabels).forEach((key) => labHand.classList.remove(`finish-${key}`));
  labHand.classList.add(`finish-${finish}`);
  finishButtons.forEach((button) => button.classList.toggle('active', button.dataset.finish === finish));
  if (finishName) finishName.textContent = finishLabels[finish] || finish;
}

shapeButtons.forEach((button) => button.addEventListener('click', () => setShape(button.dataset.shape)));
finishButtons.forEach((button) => button.addEventListener('click', () => setFinish(button.dataset.finish)));

document.querySelector('#interest-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  if (note) {
    note.textContent = 'Looks good — this preview form is ready to be connected to the academy email before launch.';
    note.classList.add('success');
  }
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
