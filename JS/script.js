document.addEventListener("DOMContentLoaded", function () {
  // Function to load content based on section
  function loadContent(section) {
    const content = document.getElementById("content");
    switch (section) {
      case "about":
        content.innerHTML = `
          <h1>Welcome to My Portfolio!</h1>
          <div class="photos">
            <img src="path/to/profile-image.jpg" alt="Profile" class="profileImage">
          </div>
          <h1>Hey, My name is Samyog</h1>
          <p>I'm a passionate developer with a love for creating dynamic web applications.</p>
          <h2>Skills</h2>
          <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>Node.js</li>
            <li>CSS</li>
            <li>HTML</li>
          </ul>
          <h2>Projects</h2>
          <ul>
            <li><a href="#">Portfolio Website</a> - A personal portfolio to showcase my work.</li>
            <li><a href="#">E-commerce App</a> - A full-stack application for online shopping.</li>
            <li><a href="#">Blog Platform</a> - A platform for sharing articles and insights.</li>
          </ul>
          <h2>Hobbies</h2>
          <p>When I'm not coding, I enjoy hiking, photography, and exploring new technologies.</p>
          <h2>Contact Me</h2>
          <p>Feel free to reach out via <a href="mailto:samyog@example.com">email</a> or connect with me on <a href="#">LinkedIn</a>.</p>
        `;
        break;
      case "project":
        content.innerHTML = `
          <h1>Projects</h1>
          <p>Project content goes here.</p>
        `;
        break;
      case "experience":
        content.innerHTML = `
          <h1>Experience</h1>
          <p>Experience content goes here.</p>
        `;
        break;
      default:
        content.innerHTML = "<h1>Page Not Found</h1>";
    }
  }

  // Event listeners for navigation links
  document.getElementById("navAbout").addEventListener("click", function () {
    loadContent("about");
    setActiveNav("navAbout");
  });

  document.getElementById("navProject").addEventListener("click", function () {
    loadContent("project");
    setActiveNav("navProject");
  });

  document
    .getElementById("navExperience")
    .addEventListener("click", function () {
      loadContent("experience");
      setActiveNav("navExperience");
    });

  // Function to set active navigation link
  function setActiveNav(id) {
    const navLinks = document.querySelectorAll("#navBar a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
  }

  // Load the default content
  loadContent("about");
  setActiveNav("navAbout");
});

// JavaScript to add 'visible' class to sections on scroll
const sections = document.querySelectorAll(".Sections section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});

// JavaScript for scroll-to-top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
};

scrollToTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});
