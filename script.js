document.documentElement.classList.add('has-js');

function setupCareerCard() {
  const card = document.querySelector('.career-card');
  const title = card?.querySelector(':scope > strong');
  if (!card || !title) return;

  // Build each word as its own line so it can be measured independently.
  title.innerHTML = '<span>LEARN.</span><span>CREATE.</span><em>SUCCEED.</em>';

  Object.assign(card.style, {
    padding: '36px 30px',
    right: '8px'
  });

  Object.assign(title.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2px',
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    lineHeight: '1',
    letterSpacing: '0'
  });

  const lines = [...title.children];
  lines.forEach((line) => {
    Object.assign(line.style, {
      display: 'block',
      width: 'max-content',
      maxWidth: 'none',
      whiteSpace: 'nowrap',
      fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Narrow", sans-serif',
      fontStyle: 'normal',
      fontWeight: '900',
      lineHeight: '.88',
      letterSpacing: '-.015em'
    });
  });

  const bottle = document.querySelector('.polish-bottle');
  if (bottle) {
    bottle.style.right = '-18px';
    bottle.style.top = '20px';
    bottle.style.transform = 'rotate(9deg) scale(.76)';
    bottle.style.transformOrigin = 'top right';
  }

  function fitCareerWords() {
    const computed = getComputedStyle(card);
    const innerWidth = card.clientWidth
      - parseFloat(computed.paddingLeft || 0)
      - parseFloat(computed.paddingRight || 0);

    // Reserve a little extra room on LEARN for the bottle overlapping the top-right.
    const availableWidths = [Math.max(120, innerWidth - 56), innerWidth, innerWidth];
    const startingSizes = [82, 76, 68];

    lines.forEach((line, index) => {
      let size = startingSizes[index];
      const minSize = 24;
      line.style.fontSize = `${size}px`;

      while (line.getBoundingClientRect().width > availableWidths[index] && size > minSize) {
        size -= 1;
        line.style.fontSize = `${size}px`;
      }
    });
  }

  requestAnimationFrame(fitCareerWords);
  window.addEventListener('resize', fitCareerWords, { passive: true });
  if ('ResizeObserver' in window) {
    new ResizeObserver(fitCareerWords).observe(card);
  }
}

setupCareerCard();

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

function closeMenu() {
  nav?.classList.remove('is-open');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav?.classList.toggle('is-open', !isOpen);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    closeMenu();

    const headerHeight = header?.offsetHeight || 0;
    const destination = href === '#home'
      ? 0
      : target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

    window.scrollTo({ top: destination, behavior: 'smooth' });
    history.replaceState(null, '', href === '#home' ? window.location.pathname : href);
  });
});

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -35px' });

  reveals.forEach((element) => revealObserver.observe(element));
}

const pageSections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });

  pageSections.forEach((section) => sectionObserver.observe(section));
}

const finishLabels = {
  blue: 'Carolina Blue',
  lime: 'Electric Lime',
  graphite: 'Graphite',
  chrome: 'Chrome'
};

const finishButtons = [...document.querySelectorAll('[data-finish]')];
const nailStage = document.querySelector('#nail-stage');
const finishName = document.querySelector('#finish-name');

finishButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const finish = button.dataset.finish;
    if (!finish || !nailStage) return;

    Object.keys(finishLabels).forEach((key) => nailStage.classList.remove(`finish-${key}`));
    nailStage.classList.add(`finish-${finish}`);

    finishButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    if (finishName) finishName.textContent = finishLabels[finish] || finish;
  });
});

document.querySelector('#interest-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  if (!note) return;
  note.textContent = 'Your information looks ready. Form delivery will be connected before launch.';
  note.classList.add('is-success');
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
