/* leadform.js
 * Handles the lead-capture form: client-side validation, submission to the
 * Web3Forms API, and an inline success/error state. No backend to run — the
 * whole lead pipeline (capture -> auto-reply to prospect -> notify owner)
 * happens without a manual first touch.
 */
(function () {
  "use strict";

  var form = document.getElementById("lead-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("lead-submit");
  var ENDPOINT = "https://api.web3forms.com/submit";

  // Pre-select the package when a visitor clicks a pricing button.
  var planSelect = document.getElementById("plan");
  document.querySelectorAll("[data-plan]").forEach(function (el) {
    el.addEventListener("click", function () {
      var plan = el.getAttribute("data-plan");
      if (planSelect) {
        for (var i = 0; i < planSelect.options.length; i++) {
          if (planSelect.options[i].value === plan) {
            planSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (type ? " form-status-" + type : "");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();

    if (!name || !email || !message) {
      setStatus("Please fill in your name, email, and what you need.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("That email address doesn't look right — please check it.", "error");
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
          setStatus(
            "Thanks! Your enquiry is in — check your inbox for a confirmation. We'll reply within one business day.",
            "success"
          );
        } else {
          setStatus(
            (result.json && result.json.message) ||
              "Something went wrong sending your enquiry. Please email us directly.",
            "error"
          );
        }
      })
      .catch(function () {
        setStatus(
          "Network error — please try again, or email us directly.",
          "error"
        );
      })
      .then(function () {
        submitBtn.disabled = false;
      });
  });
})();
