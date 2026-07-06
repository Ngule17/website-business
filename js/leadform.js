/* leadform.js
 * Handles both lead-capture forms (homeowner quote requests and pro signups):
 * client-side validation, submission to the Web3Forms API, and an inline
 * success/error state. No backend to run — the whole lead pipeline
 * (capture -> auto-reply -> owner notification) works on static hosting.
 */
(function () {
  "use strict";

  var ENDPOINT = "https://api.web3forms.com/submit";

  // Service cards pre-select the matching service in the homeowner form.
  var serviceSelect = document.getElementById("service");
  document.querySelectorAll("[data-service]").forEach(function (el) {
    el.addEventListener("click", function () {
      var service = el.getAttribute("data-service");
      if (!serviceSelect) return;
      for (var i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value === service) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    });
  });

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function wireForm(form, statusEl, successMessage) {
    function setStatus(message, type) {
      statusEl.textContent = message;
      statusEl.className = "form-status" + (type ? " form-status-" + type : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var missing = Array.prototype.filter.call(
        form.querySelectorAll("[required]"),
        function (field) { return !field.value.trim(); }
      );
      if (missing.length) {
        setStatus("Please fill in the fields marked with * before sending.", "error");
        missing[0].focus();
        return;
      }
      var email = form.querySelector('input[type="email"]');
      if (email && !isValidEmail(email.value.trim())) {
        setStatus("That email address doesn't look right — please check it.", "error");
        email.focus();
        return;
      }

      var accessKey = form.access_key.value;
      if (!accessKey || accessKey.indexOf("YOUR-") === 0) {
        setStatus(
          "This form isn't connected yet. Add your free Web3Forms access key to enable it (see README).",
          "error"
        );
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      setStatus("Sending…", "pending");

      var data = Object.fromEntries(new FormData(form).entries());

      fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          return res.json().then(function (json) {
            return { ok: res.ok, json: json };
          });
        })
        .then(function (result) {
          if (result.ok && result.json.success) {
            form.reset();
            setStatus(successMessage, "success");
          } else {
            setStatus(
              (result.json && result.json.message) ||
                "Something went wrong sending your request. Please try again.",
              "error"
            );
          }
        })
        .catch(function () {
          setStatus("Network error — please try again in a moment.", "error");
        })
        .then(function () {
          submitBtn.disabled = false;
        });
    });
  }

  var leadForm = document.getElementById("lead-form");
  if (leadForm) {
    wireForm(
      leadForm,
      document.getElementById("lead-status"),
      "Thanks! Your request is in — check your inbox for a confirmation. A local pro will be in touch within one business day."
    );
  }

  var proForm = document.getElementById("pro-form");
  if (proForm) {
    wireForm(
      proForm,
      document.getElementById("pro-status"),
      "You're on the list! We'll email you current per-lead pricing for your area within one business day."
    );
  }
})();
