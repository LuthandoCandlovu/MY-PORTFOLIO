// ===== MAIN PORTFOLIO JAVASCRIPT =====

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initPortfolio();
});

function initPortfolio() {
  initTypingEffect();
  initThemeToggle();
  initScrollAnimations();
  initSkillAnimations();
  initCounterAnimations();
  initSmoothScrolling();
  initBackToTop();
  initParticleNetwork();
  initMatrixRain();
  initFloatingCode();
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  if (!typedTextSpan || !cursorSpan) return;

  const textArray = [
    "Cybersecurity Specialist",
    "AI/ML Developer",
    "Full-Stack Developer",
    "Problem Solver",
    "Tech Innovator",
    "Security Researcher",
  ];

  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;

  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0;
      }
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Start the typing effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme or prefer color scheme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    updateThemeIcon("dark");
  }

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");

          // If it's a counter element, initialize counting
          if (entry.target.querySelector(".stat-number")) {
            const counters = entry.target.querySelectorAll(".stat-number");
            counters.forEach((counter) => {
              if (!counter.classList.contains("animated")) {
                animateCounter(counter);
                counter.classList.add("animated");
              }
            });
          }

          // If it's a skill bar, animate it
          if (entry.target.querySelector(".skill-progress")) {
            const skillBars = entry.target.querySelectorAll(".skill-progress");
            skillBars.forEach((bar) => {
              if (!bar.classList.contains("animated")) {
                const width = bar.getAttribute("data-width");
                setTimeout(() => {
                  bar.style.width = width + "%";
                }, 200);
                bar.classList.add("animated");
              }
            });
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    if (!counter.classList.contains("animated")) {
      // Set initial value to 0
      counter.textContent = "0";
    }
  });
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-count"));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      counter.textContent =
        target + (counter.getAttribute("data-count").includes("+") ? "+" : "");
      clearInterval(timer);
    } else {
      counter.textContent =
        Math.floor(current) +
        (counter.getAttribute("data-count").includes("+") ? "+" : "");
    }
  }, 16);
}

// ===== SKILL BAR ANIMATIONS =====
function initSkillAnimations() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    // Set initial width to 0
    bar.style.width = "0%";
  });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });

  // Update active link on scroll
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    updateActiveNavLink("#" + current);
  });
}

function updateActiveNavLink(targetId) {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === targetId) {
      link.classList.add("active");
    }
  });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
  backToTop.className = "back-to-top";
  document.body.appendChild(backToTop);

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
}

// ===== PARTICLE NETWORK =====
function initParticleNetwork() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const particleNetwork = document.querySelector(".particle-network");

  if (!particleNetwork) return;

  particleNetwork.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 50;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      size: Math.random() * 2 + 1,
      color: `rgba(37, 99, 235, ${Math.random() * 0.5 + 0.1})`,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off walls
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Draw connections
      particles.forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 - distance / 750})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animateParticles);
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animateParticles();
}

// ===== MATRIX RAIN =====
function initMatrixRain() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const matrixRain = document.querySelector(".matrix-rain");

  if (!matrixRain) return;

  matrixRain.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "01010101010101010101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charArray = chars.split("");
  const rainDrops = [];

  const fontSize = 14;
  const columns = canvas.width / fontSize;

  for (let x = 0; x < columns; x++) {
    rainDrops[x] = (Math.random() * canvas.height) / fontSize;
  }

  function draw() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  setInterval(draw, 35);
}

// ===== FLOATING CODE =====
function initFloatingCode() {
  const codeBackground = document.querySelector(".code-background");

  if (!codeBackground) return;

  const codeSnippets = [
    "function createMagic() {",
    "const innovation = new Ideas();",
    "return innovation.build();",
    "}",
    "class Developer {",
    "constructor(passion, skills) {",
    "this.passion = passion;",
    "this.skills = skills;",
    "}",
    "createAmazingThings() {",
    'return "Awesome Portfolio";',
    "}",
    "}",
    "// Luthando Candlovu",
    "// Computer Science Student",
    "// Future Innovator",
    "const cybersecurity = new Security();",
    "cybersecurity.protect();",
    "AI.learn().predict().solve();",
  ];

  codeSnippets.forEach((snippet, index) => {
    const codeElement = document.createElement("div");
    codeElement.className = "code-snippet";
    codeElement.textContent = snippet;
    codeElement.style.left = Math.random() * 80 + "%";
    codeElement.style.top = Math.random() * 80 + "%";
    codeElement.style.fontSize = Math.random() * 8 + 10 + "px";
    codeElement.style.opacity = Math.random() * 0.3 + 0.1;
    codeBackground.appendChild(codeElement);

    // Animate code snippets
    gsap.to(codeElement, {
      y: "+=100",
      rotation: Math.random() * 10 - 5,
      duration: Math.random() * 10 + 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 5,
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// ===== DOWNLOAD CV FUNCTION =====
document.getElementById("downloadCV")?.addEventListener("click", function (e) {
  e.preventDefault();

  // Create a simple PDF download simulation
  const link = document.createElement("a");
  link.href = "#"; // Replace with actual CV file path
  link.download = "Luthando_Candlovu_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show success message
  showNotification("CV download started!", "success");
});

// ===== CONTACT FORM HANDLING =====
document
  .querySelector(".contact-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simulate form submission
    setTimeout(() => {
      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      this.reset();
    }, 1000);
  });

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success" ? "check" : "info"
            }-circle"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// ===== PROJECT FILTERING =====
function filterProjects(category) {
  const projects = document.querySelectorAll(".project-card");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Update active filter button
  filterButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-filter") === category) {
      btn.classList.add("active");
    }
  });

  // Filter projects
  projects.forEach((project) => {
    if (
      category === "all" ||
      project.getAttribute("data-category") === category
    ) {
      project.style.display = "block";
      setTimeout(() => {
        project.style.opacity = "1";
        project.style.transform = "translateY(0)";
      }, 200);
    } else {
      project.style.opacity = "0";
      project.style.transform = "translateY(20px)";
      setTimeout(() => {
        project.style.display = "none";
      }, 300);
    }
  });
}

// ===== SCROLL TO SECTION =====
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// ===== INITIALIZE GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap
  .timeline()
  .from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  })
  .from(
    ".hero-subtitle",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.5"
  )
  .from(
    ".hero-description",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.5"
  )
  .from(
    ".hero-buttons",
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.5"
  )
  .from(
    ".social-links-hero a",
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out",
    },
    "-=0.3"
  );

// Section animations
gsap.utils.toArray("section").forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

console.log("🚀 Portfolio initialized successfully!");
