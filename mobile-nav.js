// Mobile Navigation Toggle
(function() {
  var toggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.nav-mobile-menu');

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', function() {
    var isOpen = mobileMenu.classList.toggle('nav-mobile-open');
    toggle.classList.toggle('nav-toggle-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('nav-toggle-open');
      mobileMenu.classList.remove('nav-mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggle.classList.remove('nav-toggle-open');
      mobileMenu.classList.remove('nav-mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
