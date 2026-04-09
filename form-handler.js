// AJAX form submission for Formspree - shows inline success message
(function() {
  document.querySelectorAll('form[action*="formspree.io"]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          form.innerHTML = '<div class="form-success">' +
            '<div class="form-success-icon">' +
              '<svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>' +
            '</div>' +
            '<h3>Thank you for reaching out.</h3>' +
            '<p>We\'ve received your message and will be in touch within 24 hours.</p>' +
          '</div>';
        } else {
          btn.innerHTML = originalText;
          btn.disabled = false;
          alert('Something went wrong. Please try again or email us at info@spearheadcorpdev.com');
        }
      }).catch(function() {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Something went wrong. Please try again or email us at info@spearheadcorpdev.com');
      });
    });
  });
})();
