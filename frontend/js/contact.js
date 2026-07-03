/* Contact form -> shared Cloudflare Worker (site-infra/forms-worker).
 * The Worker derives `site` from the Origin, so no site field is sent.
 * `source` is "consulting" when the private-consulting option is picked,
 * otherwise "contact". See forms-worker/CONTRACT.md. */
(function () {
    var ENDPOINT = 'https://forms-worker.troysybert.workers.dev/submit';
    var form = document.getElementById('contact-form');
    if (!form) return;
    var btn = document.getElementById('contact-submit-btn');
    var status = document.getElementById('contact-status');

    function showStatus(kind, msg) {
        status.style.display = 'block';
        status.className = 'contact-status ' + kind;
        status.textContent = msg;
    }

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.style.display = 'none';

        var name = (form.querySelector('[name="name"]').value || '').trim();
        var email = (form.querySelector('[name="email"]').value || '').trim();
        if (!name || !EMAIL_RE.test(email)) {
            showStatus('error', 'Please enter your name and a valid email address.');
            return;
        }

        var interest = form.querySelector('[name="interest"]:checked');
        var source = interest && interest.value === 'consulting' ? 'consulting' : 'contact';
        var tokenEl = form.querySelector('[name="cf-turnstile-response"]');

        var payload = {
            name: name,
            email: email,
            organization: form.querySelector('[name="organization"]').value || null,
            message: form.querySelector('[name="message"]').value || null,
            source: source,
            website: form.querySelector('[name="website"]').value,
            cf_turnstile_response: tokenEl ? tokenEl.value : null
        };

        btn.disabled = true;
        btn.textContent = 'Sending...';

        fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(function (res) {
                if (!res.ok) throw new Error('request failed');
                return res.json();
            })
            .then(function (result) {
                showStatus('success', (result && result.message) || 'Thank you. I will be in touch shortly.');
                form.reset();
                if (window.turnstile) window.turnstile.reset();
            })
            .catch(function () {
                showStatus('error', 'Something went wrong. Please try again, or email TroySybert@Cortivus.com.');
            })
            .finally(function () {
                btn.disabled = false;
                btn.textContent = 'Send Message';
            });
    });
})();
