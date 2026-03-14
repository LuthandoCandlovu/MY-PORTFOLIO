/* CONTACT FORM - Formspree AJAX */
const contactForm = document.getElementById("contactForm");
const successDiv = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button");
    const originalContent = btn.innerHTML;
    btn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i><span>SENDING...</span>';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactForm.reset();
        contactForm.style.display = "none";
        successDiv.style.display = "block";
        setTimeout(() => {
          contactForm.style.display = "block";
          successDiv.style.display = "none";
        }, 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      alert(
        "Oops! Something went wrong. Please try again or email me directly.",
      );
    } finally {
      btn.innerHTML = originalContent;
      btn.disabled = false;
    }
  });
}
