// Responsive interactions (mobile menu, header offset, and simple contact form)
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    const contactForm = document.querySelector('.contact-form');
    const header = document.getElementById('siteHeader');

    const isSmall = () => window.matchMedia('(max-width: 768px)').matches;

    // Toggle mobile navigation menu + a11y attributes
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = nav.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', String(isOpen));
            nav.setAttribute('aria-hidden', String(!isOpen));
        });

        // Close mobile nav when a link is clicked (XS/SM only)
        nav.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                if (isSmall() && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    nav.setAttribute('aria-hidden', 'true');
                }
            });
        });

        // Close mobile nav when clicking outside the header/nav area (XS/SM only)
        document.addEventListener('click', (evt) => {
            const clickedInsideHeader = header && header.contains(evt.target);
            if (!clickedInsideHeader && isSmall() && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Compute header height -> set CSS var for layout offset
    const setHeaderHeightVar = () => {
        if (!header) return;
        const h = header.offsetHeight;
        document.documentElement.style.setProperty('--header-h', `${h}px`);
    };
    setHeaderHeightVar();
    window.addEventListener('resize', setHeaderHeightVar);

    // Simple form handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name')?.value.trim() ?? '';
            const email = contactForm.querySelector('#email')?.value.trim() ?? '';
            const message = contactForm.querySelector('#message')?.value.trim() ?? '';
            console.log('New message received:', {
                name,
                email,
                message
            });
            alert('Thank you for reaching out! We will get back to you shortly.');
            contactForm.reset();
        });
    }
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbwuJ7drxbZBmz3Ww0JLLt-jlkmm_KcJX-s0oJYyKlHS32APMLn5cgpDKY7sJSOWDYFIlg/exec';
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form),   // sends name/email/message
      mode: 'no-cors'             // allows sending without CORS errors
    })
    .then(() => {
      alert('Thanks! Your message has been recorded.');
      form.reset();
    })
    .catch(() => alert('Could not submit. Please try again later.'));
  });
}