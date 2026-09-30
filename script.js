const projects = [
  {
    id: 1,
    title: "FinSense Financial Sentiment Aggregator",
    description: "Developed a financial sentiment aggregator designed to analyze data present in the web to determine market sentiment trends for specific stocks with accuracy of 89%.",
    tags: ["HTML", "CSS", "Javascript", "REST API"],
    category: "web",
    liveUrl: "https://finsense.innovationinnitiative.in/",
    repoUrl: null // Removed Source Code
  },
  {
    id: 2,
    title: "Real-Time Attendance Tracker",
    description: "Built a real-time tracker using Wi-Fi beacons and face matching for secure classroom attendance.",
    tags: ["Python", "Computer Vision", "OpenCV"],
    category: "ai",
    liveUrl: null, // Removed Live Demo
    repoUrl: "https://github.com/wwwavijitsaha13-art/Real-Time-Attendance-Tracker-using-Wi-Fi-Beacon-and-Face-Matching"
  },
  {
    id: 3,
    title: "Tensor-based Resilient Auto-encoding Protocol(T.R.A.P)",
    description: "Architected a dynamic Quantum Key Distribution framework ensuring secure cryptographic key transmission despite environmental noise or active adversarial interception.",
    tags: ["Python", "Quantum Key Distribution", "Cyber Security"],
    category: "security",
    liveUrl: null, // Removed Live Demo
    repoUrl: "https://github.com/wwwavijitsaha13-art/T.R.A.P"
  }
];

const skills = [
  { name: "Machine Learning & Deep Learning", category: "AI / ML" },
  { name: "Sequence Models & Generative AI", category: "AI / ML" },
  { name: "Cryptography & Vulnerability Testing", category: "Cyber Security" },
  { name: "HTML, CSS, Vanilla JavaScript", category: "Web Frontend" },
  { name: "Python Development", category: "Languages" },
  { name: "Human-Computer Interaction", category: "Concepts" }
];

document.addEventListener("DOMContentLoaded", () => {
  renderProjects('all');
  renderSkills();
  initProjectFilters();
  initTheme();
  initNavigation();
  initFormValidation();
});

function renderProjects(filterValue) {
  const container = document.getElementById('projects-container');
  container.innerHTML = '';
  
  const filtered = filterValue === 'all' 
    ? projects 
    : projects.filter(p => p.category === filterValue);

  if (filtered.length === 0) {
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No projects found for this category.</p>';
    return;
  }

  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Conditionally render buttons only if their respective URL exists
    const liveDemoBtn = project.liveUrl 
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.9rem; padding: 6px 12px; margin-right: 8px;">Live Demo</a>` 
      : '';
      
    const sourceCodeBtn = project.repoUrl 
      ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size: 0.9rem; padding: 6px 12px;">Source Code</a>` 
      : '';

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="project-links" style="margin-top: 15px;">
        ${liveDemoBtn}
        ${sourceCodeBtn}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  skills.forEach(skill => {
    const el = document.createElement('div');
    el.className = 'project-card'; 
    el.innerHTML = `<strong>${skill.name}</strong><br><span class="text-muted">${skill.category}</span>`;
    container.appendChild(el);
  });
}

function initProjectFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects(e.target.getAttribute('data-filter'));
    });
  });
}

function initNavigation() {
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });

  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    const backToTop = document.getElementById('back-to-top');
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let switchToTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', switchToTheme);
    localStorage.setItem('theme', switchToTheme);
  });
}

function initFormValidation() {
  const form = document.getElementById('contact-form');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');

  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
  });

  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    let firstInvalid = null;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (!isValid) {
      firstInvalid.focus();
      return;
    }

    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      document.getElementById('form-success').textContent = 'Message sent successfully!';
      form.reset();
      charCount.textContent = '0';
      btn.disabled = false;
      btn.textContent = 'Send Message';
      
      setTimeout(() => {
        document.getElementById('form-success').textContent = '';
      }, 5000);
    }, 1500);
  });
}

function validateField(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (!errorElement) return true;

  let isValid = true;
  let errorMessage = '';

  if (input.value.trim() === '') {
    isValid = false;
    errorMessage = `${input.previousElementSibling.textContent} is required.`;
  } else if (input.id === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    }
  } else if (input.id === 'name' && input.value.trim().length < 2) {
    isValid = false;
    errorMessage = 'Name must be at least 2 characters.';
  } else if (input.id === 'subject' && input.value.trim().length < 3) {
    isValid = false;
    errorMessage = 'Subject must be at least 3 characters.';
  } else if (input.id === 'message') {
    if (input.value.trim().length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters.';
    } else if (input.value.trim().length > 500) {
      isValid = false;
      errorMessage = 'Message cannot exceed 500 characters.';
    }
  }

  if (!isValid) {
    input.classList.add('invalid');
    errorElement.textContent = errorMessage;
  } else {
    input.classList.remove('invalid');
    errorElement.textContent = '';
  }

  return isValid;
}