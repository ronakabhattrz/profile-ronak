'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


const mediumFeedUrl = 'https://medium.com/feed/@ronakabhattrz';

// Function to fetch and display Medium blog posts
async function fetchMediumPosts() {
  try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedUrl)}`);
      const data = await response.json();

      if (data && data.items) {
          const postsContainer = document.getElementById('medium-posts-list');
          postsContainer.innerHTML = ''; // Clear previous content

          data.items.forEach(item => {
              const postElement = document.createElement('li');
              postElement.classList.add('blog-post-item');
              const thumbnail = item.thumbnail ? item.thumbnail : './assets/images/medium.jpeg';
              postElement.innerHTML = `
                  <a href="${item.link}" target="_blank">

                      <figure class="blog-banner-box">
                          <img src="${thumbnail}" alt="${item.title}" loading="lazy">
                      </figure>

                      <div class="blog-content">
                          <div class="blog-meta">
                              <p class="blog-category">Design</p>
                              <span class="dot"></span>
                              <time datetime="${item.pubDate}">${new Date(item.pubDate).toDateString()}</time>
                          </div>
                          <h3 class="h3 blog-item-title">${item.title}</h3>
                      </div>
                  </a>
              `;
              postsContainer.appendChild(postElement);
          });
      } else {
          console.error('Error fetching Medium posts:', data);
      }
  } catch (error) {
      console.error('Error fetching Medium posts:', error);
  }
}

// Call the function to fetch and display Medium posts
fetchMediumPosts();

// Loading indicator
window.addEventListener('load', () => {
  const loadingIndicator = document.querySelector('.loading-indicator');
  loadingIndicator.classList.add('hidden');
  setTimeout(() => {
    loadingIndicator.style.display = 'none';
  }, 300);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Fade-in animation with Intersection Observer
const fadeElements = document.querySelectorAll('.content-card, .service-item, .project-item, .blog-post-item');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});

// Mobile menu functionality
const navbarLinks = document.querySelectorAll('.navbar-link');
let isNavOpen = false;

function closeNavMenu() {
  if (isNavOpen) {
    isNavOpen = false;
    // Additional code for closing mobile menu if needed
  }
}

document.addEventListener('click', (e) => {
  if (isNavOpen && !e.target.closest('.navbar')) {
    closeNavMenu();
  }
});

// Active class for current section in navigation
const sections = document.querySelectorAll('article');
const navLinks = document.querySelectorAll('[data-nav-link]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === current) {
      link.classList.add('active');
    }
  });
});

// Scroll to top functionality
const scrollToTopButton = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopButton.classList.add('visible');
  } else {
    scrollToTopButton.classList.remove('visible');
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const getCurrentTheme = () => {
  let theme = localStorage.getItem('theme');
  if (!theme) {
    theme = prefersDarkScheme.matches ? 'dark' : 'light';
  }
  return theme;
};

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// Set initial theme
const currentTheme = getCurrentTheme();
setTheme(currentTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
});

// Listen for system theme changes if no preference is saved
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Contact form success message handler
const contactForm = document.querySelector("[data-form]");
const successMessage = document.querySelector(".form-success-message");
const sendNewBtn = document.querySelector(".send-new-btn");

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    if (!contactForm.checkValidity()) return;
    
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    fetch(contactForm.action, {
      method: contactForm.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        document.querySelector("[data-form-btn]").setAttribute("disabled", "");
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was a problem submitting your form. Please try again later.');
    });
  });
}

if (sendNewBtn) {
  sendNewBtn.addEventListener('click', function() {
    successMessage.style.display = 'none';
    contactForm.style.display = 'block';
  });
}

// Project modal variables and functionality
const projectItems = document.querySelectorAll(".project-item");
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalImg = document.querySelector("[data-project-modal-img]");
const projectModalClient = document.querySelector("[data-project-modal-client]");
const projectModalTech = document.querySelector("[data-project-modal-tech]");
const projectModalYear = document.querySelector("[data-project-modal-year]");
const projectModalLink = document.querySelector("[data-project-modal-link]");
const projectModalDesc = document.querySelector("[data-project-modal-description]");

// Project data
const projectsData = [
  {
    id: "hollandia-premium",
    title: "Hollandia Premium",
    client: "Hollandia",
    technologies: "HTML, CSS, JavaScript, WordPress",
    year: "2022",
    description: "A premium website for Hollandia showcasing their products and services. The project involved creating a modern, responsive design with a focus on user experience and visual appeal.",
    link: "https://hollandiapremium.nl/"
  },
  {
    id: "all-pro-ifm",
    title: "All Pro IFM",
    client: "All Pro IFM",
    technologies: "React, Node.js, Express, MongoDB",
    year: "2022",
    description: "Developed a comprehensive management platform for All Pro IFM. The system includes client management, service tracking, and reporting features.",
    link: "https://allproifm.com/"
  },
  {
    id: "jager-lodge",
    title: "Jager Lodge",
    client: "Jager Lodge",
    technologies: "HTML, CSS, JavaScript, Bootstrap",
    year: "2021",
    description: "A responsive website for a luxury lodge in Austria. The site features an online booking system, photo galleries, and detailed information about lodge facilities.",
    link: "https://jagerlodge.at/"
  },
  {
    id: "bulletproof",
    title: "Bulletproof Cyber Security",
    client: "Bulletproof",
    technologies: "React, Python, Django, PostgreSQL",
    year: "2022",
    description: "A SaaS platform for cyber security management. The project included implementing secure authentication, real-time threat monitoring, and detailed reporting.",
    link: "https://www.bulletproof.co.uk/"
  },
  {
    id: "garage-duin",
    title: "Garage Duin",
    client: "Garage Duin",
    technologies: "HTML, CSS, JavaScript, PHP",
    year: "2021",
    description: "A website for a garage business featuring service information, appointment booking, and customer reviews. The site is fully responsive and includes a custom CMS.",
    link: "https://garageduin.nl/"
  },
  {
    id: "nsoj",
    title: "NsoJ",
    client: "National School of Journalism",
    technologies: "WordPress, PHP, MySQL, JavaScript",
    year: "2020",
    description: "A comprehensive website for an educational institution. Features include course management, student portal, faculty profiles, and an online application system.",
    link: "https://www.nsoj.in/"
  },
  {
    id: "pit-stop-usa",
    title: "Pit Stop USA",
    client: "Pit Stop USA",
    technologies: "Shopify, JavaScript, Ruby on Rails",
    year: "2021",
    description: "An e-commerce platform for automotive parts and accessories. The project included product catalog management, payment processing, and order fulfillment systems.",
    link: "https://pitstopusa.com/"
  },
  {
    id: "nav-eco",
    title: "Nav Eco",
    client: "Nav Eco",
    technologies: "React, Node.js, MongoDB, AWS",
    year: "2022",
    description: "A SaaS application for environmental monitoring and reporting. Features include data visualization, automated reporting, and compliance tracking.",
    link: "https://www.nav-eco.fr/en"
  },
  {
    id: "auto-service-haarlem",
    title: "Auto Service Haarlem",
    client: "Auto Service Haarlem",
    technologies: "HTML, CSS, JavaScript, PHP",
    year: "2020",
    description: "A website for an auto service company featuring service information, online appointment booking, and a customer review system.",
    link: "https://autoservicehaarlem.nl/"
  }
];

// Toggle project modal function
const toggleProjectModal = function() {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
  document.body.classList.toggle("modal-open");
  
  // Handle body scroll lock
  if (projectModalContainer.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    // Small delay to allow the close animation to complete
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 300);
  }
};

// Add click event to all project items
projectItems.forEach((item, index) => {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    
    const projectLink = item.querySelector("a").getAttribute("href");
    const projectId = projectLink.split("/")[2]; // Extract domain name as ID
    const projectData = projectsData.find(p => p.link.includes(projectId)) || projectsData[index];
    
    // Populate modal with project data
    projectModalTitle.textContent = projectData.title;
    projectModalImg.src = item.querySelector("img").src;
    projectModalImg.alt = projectData.title;
    projectModalClient.textContent = projectData.client;
    projectModalTech.textContent = projectData.technologies;
    projectModalYear.textContent = projectData.year;
    projectModalLink.href = projectData.link;
    projectModalDesc.querySelector("p").textContent = projectData.description;
    
    toggleProjectModal();
  });
});

// Close project modal when clicking close button or overlay
if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", toggleProjectModal);
}

if (projectOverlay) {
  projectOverlay.addEventListener("click", toggleProjectModal);
}

// Close project modal when pressing Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && projectModalContainer.classList.contains("active")) {
    toggleProjectModal();
  }
});

// Counter animation for achievements section
const counters = document.querySelectorAll('.achievement-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-count'));
      let count = 0;
      const duration = 2000; // 2 seconds
      const increment = Math.ceil(target / (duration / 30)); // Update every 30ms

      const updateCount = () => {
        count += increment;
        if (count >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = count;
        }
      };

      const timer = setInterval(updateCount, 30);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

// Observe all counters
counters.forEach(counter => {
  counterObserver.observe(counter);
});