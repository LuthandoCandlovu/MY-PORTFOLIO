/// ===== DOWNLOAD CV FUNCTION =====
document.getElementById("downloadCV")?.addEventListener("click", function (e) {
  e.preventDefault();

  // Create a professional download modal
  showDownloadModal();
});

// ===== PROFESSIONAL DOWNLOAD MODAL =====
function showDownloadModal() {
  // Create modal backdrop
  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "download-modal-backdrop";
  modalBackdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 20, 40, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.className = "download-modal-content";
  modalContent.style.cssText = `
    background: var(--bg-card);
    border-radius: 12px;
    padding: 3rem;
    max-width: 500px;
    width: 90%;
    border: 1px solid var(--border-color);
    box-shadow: var(--card-glow);
    position: relative;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
  `;

  modalContent.innerHTML = `
    <button class="modal-close" style="
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.3s;
    ">&times;</button>
    
    <h3 style="margin-bottom: 1rem;">Download CV</h3>
    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Select your preferred format:</p>
    
    <div class="format-options" style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 2rem 0;
    ">
      <div class="format-option" data-format="pdf" style="
        padding: 1.5rem;
        background: rgba(10, 20, 40, 0.5);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        <i class="fas fa-file-pdf" style="
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
          color: var(--electric-blue);
        "></i>
        <h4 style="margin-bottom: 0.5rem;">PDF</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Standard Format</p>
      </div>
      
      <div class="format-option" data-format="docx" style="
        padding: 1.5rem;
        background: rgba(10, 20, 40, 0.5);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        <i class="fas fa-file-word" style="
          font-size: 2rem;
          margin-bottom: 0.5rem;
          display: block;
          color: var(--electric-blue);
        "></i>
        <h4 style="margin-bottom: 0.5rem;">Word</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary);">Editable Version</p>
      </div>
    </div>
    
    <button class="btn-download-confirm" style="
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, var(--electric-blue), var(--neon-green));
      color: var(--cyber-navy);
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    ">
      <i class="fas fa-download"></i>
      <span>Download Selected Format</span>
    </button>
    
    <div class="success-animation" style="
      display: none;
      text-align: center;
      padding: 2rem;
    ">
      <i class="fas fa-check-circle" style="
        font-size: 4rem;
        color: var(--neon-green);
        margin-bottom: 1rem;
      "></i>
      <h3 style="margin-bottom: 1rem;">Download Complete!</h3>
      <p style="color: var(--text-secondary); margin-bottom: 2rem;">Your CV has been downloaded successfully.</p>
      <button class="btn-close-success" style="
        padding: 12px 24px;
        background: transparent;
        color: var(--neon-green);
        border: 2px solid var(--neon-green);
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        Close
      </button>
    </div>
  `;

  modalBackdrop.appendChild(modalContent);
  document.body.appendChild(modalBackdrop);

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes successPop {
      0% { transform: scale(0); }
      70% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .format-option:hover {
      border-color: var(--neon-green);
      transform: translateY(-2px);
    }
    
    .format-option.selected {
      border-color: var(--electric-blue);
      background: rgba(0, 102, 255, 0.1);
    }
    
    .modal-close:hover {
      color: var(--neon-green);
    }
    
    .btn-download-confirm:hover {
      transform: translateY(-2px);
      box-shadow: var(--card-glow);
    }
    
    .btn-close-success:hover {
      background: rgba(0, 255, 136, 0.1);
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);

  // Show modal with animation
  setTimeout(() => {
    modalBackdrop.style.opacity = "1";
    modalContent.style.opacity = "1";
    modalContent.style.transform = "translateY(0)";
  }, 10);

  // Close modal
  modalContent.querySelector(".modal-close").addEventListener("click", () => {
    closeModal(modalBackdrop, modalContent);
  });

  // Close on backdrop click
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeModal(modalBackdrop, modalContent);
    }
  });

  // Format selection
  const formatOptions = modalContent.querySelectorAll(".format-option");
  let selectedFormat = "pdf";

  formatOptions[0].classList.add("selected");

  formatOptions.forEach((option) => {
    option.addEventListener("click", () => {
      formatOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      selectedFormat = option.dataset.format;
    });
  });

  // Download button
  const downloadBtn = modalContent.querySelector(".btn-download-confirm");
  const successAnimation = modalContent.querySelector(".success-animation");
  const closeSuccessBtn = modalContent.querySelector(".btn-close-success");

  downloadBtn.addEventListener("click", () => {
    // Show loading state
    const originalContent = downloadBtn.innerHTML;
    downloadBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
    downloadBtn.disabled = true;

    // Simulate download progress
    setTimeout(() => {
      // Trigger actual download
      downloadCV(selectedFormat);

      // Show success animation
      setTimeout(() => {
        modalContent.querySelector(".format-options").style.display = "none";
        downloadBtn.style.display = "none";
        successAnimation.style.display = "block";

        // Animate success icon
        const successIcon = successAnimation.querySelector("i");
        successIcon.style.animation =
          "successPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      }, 500);
    }, 1500);
  });

  // Close success
  closeSuccessBtn.addEventListener("click", () => {
    closeModal(modalBackdrop, modalContent);
  });
}

function downloadCV(format) {
  // Your actual CV file path
  const cvFilePath = "assets/Candlovu Luthando CV.pdf";

  if (format === "pdf") {
    // Download the PDF file
    const link = document.createElement("a");
    link.href = cvFilePath;
    link.download = "Luthando_Candlovu_CV.pdf";

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Downloading PDF CV:", cvFilePath);
  } else if (format === "docx") {
    // Show message for Word format
    showNotification(
      "Word format not available. Downloading PDF instead.",
      "info"
    );

    // Download PDF as fallback
    const link = document.createElement("a");
    link.href = cvFilePath;
    link.download = "Luthando_Candlovu_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function closeModal(modalBackdrop, modalContent) {
  modalContent.style.opacity = "0";
  modalContent.style.transform = "translateY(20px)";
  modalBackdrop.style.opacity = "0";

  setTimeout(() => {
    if (modalBackdrop.parentNode) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  }, 300);
}

// ===== ENHANCED CONTACT FORM HANDLING =====
document
  .querySelector(".contact-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject") || "General Inquiry";
    const message = formData.get("message");

    // Show loading animation
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Add typing animation effect
    const messageContainer = document.createElement("div");
    messageContainer.className = "typing-animation";
    messageContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    box-shadow: var(--card-glow);
    z-index: 10000;
    display: none;
  `;
    messageContainer.innerHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p style="color: var(--text-secondary); margin-top: 1rem;">Sending your message...</p>
  `;

    // Add typing dots animation
    const style = document.createElement("style");
    style.textContent = `
    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-10px); }
    }
    
    .typing-dots span {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--neon-green);
      border-radius: 50%;
      margin: 0 3px;
      animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  `;
    document.head.appendChild(style);

    document.body.appendChild(messageContainer);
    messageContainer.style.display = "block";

    // Simulate form submission with animation
    setTimeout(() => {
      // Remove typing animation
      messageContainer.style.opacity = "0";
      setTimeout(() => {
        messageContainer.parentNode?.removeChild(messageContainer);
      }, 300);

      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;

      // Show success message with professional animation
      let successMessage = "";

      switch (subject.toLowerCase()) {
        case "job opportunity":
          successMessage =
            "🎯 Job opportunity received! I'll review the details and respond within 2 hours.";
          break;
        case "freelance project":
          successMessage =
            "💼 Freelance project details received. I'll analyze requirements and send a proposal within 24 hours.";
          break;
        case "security consultation":
          successMessage =
            "🛡️ Security consultation request noted. For urgent matters, I'll call you within 30 minutes.";
          break;
        case "technical interview":
          successMessage =
            "👨‍💻 Technical interview scheduled! I'll prepare relevant materials and be ready for discussion.";
          break;
        default:
          successMessage =
            "✉️ Message received! I'll get back to you within 2 hours.";
      }

      // Show enhanced notification
      showEnhancedNotification(successMessage, "success");
      this.reset();
    }, 2000);
  });

// ===== ENHANCED NOTIFICATION SYSTEM =====
function showEnhancedNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = "enhanced-notification";

  // Set colors based on type
  let bgColor, borderColor, icon;
  switch (type) {
    case "success":
      bgColor = "rgba(0, 255, 136, 0.1)";
      borderColor = "var(--neon-green)";
      icon = "fas fa-check-circle";
      break;
    case "error":
      bgColor = "rgba(255, 50, 50, 0.1)";
      borderColor = "#ff3232";
      icon = "fas fa-exclamation-circle";
      break;
    case "warning":
      bgColor = "rgba(255, 193, 7, 0.1)";
      borderColor = "#ffc107";
      icon = "fas fa-exclamation-triangle";
      break;
    default:
      bgColor = "rgba(0, 102, 255, 0.1)";
      borderColor = "var(--electric-blue)";
      icon = "fas fa-info-circle";
  }

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    backdrop-filter: blur(10px);
    border: 1px solid ${borderColor};
    border-radius: 8px;
    padding: 1rem 1.5rem;
    max-width: 400px;
    transform: translateX(150%);
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `;

  notification.innerHTML = `
    <i class="${icon}" style="color: ${borderColor}; font-size: 1.2rem;"></i>
    <span style="color: var(--text-primary);">${message}</span>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = "translateX(150%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }, 5000);
}

// ===== ADD PROFESSIONAL ANIMATIONS TO EXISTING ELEMENTS =====
function addProfessionalAnimations() {
  // Add hover animations to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
      card.style.boxShadow = "0 20px 40px rgba(0, 102, 255, 0.3)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "";
    });
  });

  // Add click animations to buttons
  const buttons = document.querySelectorAll("button, .btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    button, .btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(rippleStyle);

  // Add scroll animations for sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    observer.observe(section);
  });
}

// Initialize professional animations
document.addEventListener("DOMContentLoaded", addProfessionalAnimations);
