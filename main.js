document.addEventListener("DOMContentLoaded", () => {

  /* ------------------------------
     ✅ MOBILE MENU
  ------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    // Open/close menu when tapping hamburger
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    // Close menu when tapping any link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }


  /* ------------------------------
     🇬🇧 CHANGE PASSWORD — ENGLISH
  ------------------------------ */

  // Desktop EN
  const changePasswordBtnDesktop = document.getElementById("change-password-btn-desktop");

  if (changePasswordBtnDesktop) {
    changePasswordBtnDesktop.addEventListener("click", () => {
      window.location.href = "change-password.html";
    });
  }

  // Mobile EN
  const changePasswordBtnMobile = document.getElementById("change-password-btn-mobile");

  if (changePasswordBtnMobile) {
    changePasswordBtnMobile.addEventListener("click", () => {
      window.location.href = "change-password.html";

      if (hamburger && mobileMenu) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  }


  /* ------------------------------
     🇩🇪 CHANGE PASSWORD — GERMAN
  ------------------------------ */

  // Desktop DE
  const changePasswordBtnDesktopDE = document.getElementById("change-password-btn-desktop-de");

  if (changePasswordBtnDesktopDE) {
    changePasswordBtnDesktopDE.addEventListener("click", () => {
      window.location.href = "change-password-de.html";
    });
  }

  // Mobile DE
  const changePasswordBtnMobileDE = document.getElementById("change-password-btn-mobile-de");

  if (changePasswordBtnMobileDE) {
    changePasswordBtnMobileDE.addEventListener("click", () => {
      window.location.href = "change-password-de.html";

      if (hamburger && mobileMenu) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  }


  /* ------------------------------
     ✅ FAQ ACCORDION
  ------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      item.classList.toggle('open');

      if (item.classList.contains('open')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });


  /* ------------------------------
     ✅ CHANGE PASSWORD FORM
  ------------------------------ */
  const form = document.getElementById("change-password-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const message = document.getElementById("password-message");

      if (newPassword !== confirmPassword) {
        message.textContent = "New passwords do not match.";
        message.style.color = "red";
        return;
      }

      const response = await fetch("/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const result = await response.json();

      if (result.success) {
        message.textContent = "Password updated successfully.";
        message.style.color = "green";
      } else {
        message.textContent = result.error || "Error updating password.";
        message.style.color = "red";
      }
    });
  }

});