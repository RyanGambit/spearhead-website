// Team bio modal handler
(function() {
  var overlay = document.querySelector('.bio-modal-overlay');
  if (!overlay) return;

  var modal = overlay.querySelector('.bio-modal');
  var closeBtn = overlay.querySelector('.bio-modal-close');
  var photoEl = overlay.querySelector('.bio-modal-photo');
  var nameEl = overlay.querySelector('.bio-modal-name');
  var titleEl = overlay.querySelector('.bio-modal-title');
  var textEl = overlay.querySelector('.bio-modal-text');

  // Open modal on team card click
  document.querySelectorAll('.about-team-card[data-bio]').forEach(function(card) {
    card.addEventListener('click', function() {
      var name = card.getAttribute('data-name');
      var title = card.getAttribute('data-title');
      var bio = card.getAttribute('data-bio');
      var photo = card.querySelector('img');
      var photoSrc = photo ? photo.src : '';

      nameEl.textContent = name;
      titleEl.textContent = title;
      textEl.innerHTML = bio.split('\n\n').map(function(p) { return '<p>' + p + '</p>'; }).join('');

      if (photoSrc) {
        photoEl.src = photoSrc;
        photoEl.style.display = 'block';
      } else {
        photoEl.style.display = 'none';
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
})();
