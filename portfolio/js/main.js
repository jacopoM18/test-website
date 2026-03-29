/* ============================================
   JACOPO MAIO — PORTFOLIO
   ============================================ */

// Nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Fade up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Password gate — Fandom project only
if (window.location.pathname.includes('/work/fandom.html')) {
  const PASS = 'jacopo24';
  const SESSION_KEY = 'portfolio_unlocked';

  if (!sessionStorage.getItem(SESSION_KEY)) {
    // Build overlay
    const overlay = document.createElement('div');
    overlay.id = 'pw-gate';
    overlay.innerHTML = `
      <div id="pw-gate__box">
        <div id="pw-gate__logo">Jacopo Maio</div>
        <p id="pw-gate__hint">This portfolio is password protected.</p>
        <form id="pw-gate__form">
          <input id="pw-gate__input" type="password" placeholder="Enter password" autocomplete="off" />
          <button type="submit">Unlock</button>
        </form>
        <p id="pw-gate__error">Incorrect password</p>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #pw-gate {
        position: fixed; inset: 0; z-index: 9999;
        background: #F0F2F1;
        display: flex; align-items: center; justify-content: center;
        font-family: 'Inter', system-ui, sans-serif;
      }
      #pw-gate__box {
        text-align: center;
        padding: 0 24px;
        max-width: 360px;
        width: 100%;
      }
      #pw-gate__logo {
        font-size: 16px; font-weight: 700;
        letter-spacing: -0.01em; color: #231E1D;
        margin-bottom: 32px;
      }
      #pw-gate__hint {
        font-size: 14px; color: #898073;
        margin-bottom: 20px; line-height: 1.5;
      }
      #pw-gate__form {
        display: flex; gap: 8px;
      }
      #pw-gate__input {
        flex: 1; padding: 10px 14px;
        border: 1.5px solid rgba(35,30,29,0.12);
        border-radius: 8px; font-size: 14px;
        font-family: inherit; color: #231E1D;
        background: white; outline: none;
        transition: border-color 0.2s;
      }
      #pw-gate__input:focus { border-color: #2563EB; }
      #pw-gate__form button {
        padding: 10px 18px;
        background: #2563EB; color: white;
        border: none; border-radius: 8px;
        font-size: 14px; font-weight: 500;
        font-family: inherit; cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
      }
      #pw-gate__form button:hover { background: #1D4ED8; }
      #pw-gate__error {
        font-size: 12px; color: #EF4444;
        margin-top: 10px; opacity: 0;
        transition: opacity 0.2s;
      }
      #pw-gate__error.visible { opacity: 1; }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // Focus input after render
    requestAnimationFrame(() => {
      document.getElementById('pw-gate__input').focus();
    });

    document.getElementById('pw-gate__form').addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('pw-gate__input').value;
      const err = document.getElementById('pw-gate__error');
      if (val === PASS) {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s';
        setTimeout(() => overlay.remove(), 300);
      } else {
        err.classList.add('visible');
        document.getElementById('pw-gate__input').value = '';
        document.getElementById('pw-gate__input').focus();
        setTimeout(() => err.classList.remove('visible'), 2000);
      }
    });
  }
}
