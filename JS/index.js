import "./card.js";

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".list");
  const sections = document.querySelectorAll("section");
  const resetColorBtn = document.getElementById("resetColorBtn");
  const currentUrl = window.location.pathname;

  // Set active link based on current URL
  links.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("active");
    }

    // Smooth scrolling for navigation
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = this.getAttribute("href").substring(1); // Get the target section ID
      const targetElement = document.getElementById(targetId);

      // Scroll to the target section smoothly
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Function to get the current background color as an RGB array
  function getCurrentColorArray(element) {
    const currentColor = window.getComputedStyle(element).backgroundColor;
    const rgbValues = currentColor.match(/\d+/g);
    return rgbValues.map(Number); // Convert strings to numbers
  }

  // Function to generate a slightly different color
  function getSimilarColor(currentColorArray) {
    return currentColorArray.map((value) => {
      // Adjust the color value by a small random amount between -10 and 10
      const change = Math.floor(Math.random() * 21) - 10;
      let newValue = value + change;

      // Ensure the new value is within the valid RGB range
      if (newValue < 0) newValue = 0;
      if (newValue > 255) newValue = 255;

      return newValue;
    });
  }

  // Convert RGB array to hex color
  function rgbArrayToHex(rgbArray) {
    return (
      "#" +
      rgbArray
        .map((value) => {
          const hex = value.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  // Function to change the background color of a section
  function changeBackgroundColor(section) {
    const currentColorArray = getCurrentColorArray(section);
    const newColorArray = getSimilarColor(currentColorArray);
    const newColorHex = rgbArrayToHex(newColorArray);

    section.style.backgroundColor = newColorHex;
    // Save the new color to local storage
    localStorage.setItem(`backgroundColor-${section.id}`, newColorHex);

    // Show the reset button if the color has changed from default
    resetColorBtn.style.display = "block";
  }

  // Function to reset the background color of a section
  function resetBackgroundColor(section) {
    section.style.backgroundColor = ""; // Reset to default
    localStorage.removeItem(`backgroundColor-${section.id}`); // Remove saved color
  }

  // Load saved background colors for all sections
  sections.forEach((section) => {
    const savedColor = localStorage.getItem(`backgroundColor-${section.id}`);
    if (savedColor) {
      section.style.backgroundColor = savedColor;
      // Show the reset button if the color is not the default
      resetColorBtn.style.display = "block";
    }

    // Toggle background color on section click
    section.addEventListener("click", () => {
      changeBackgroundColor(section);
    });
  });

  // Handle reset button click
  resetColorBtn.addEventListener("click", () => {
    sections.forEach((section) => {
      resetBackgroundColor(section);
    });
    // Also reset card colors
    document.querySelectorAll(".card").forEach((card) => {
      localStorage.removeItem(
        `cardColor-${card.querySelector(".projectTitle").textContent}`
      );
      card.style.backgroundColor = "";
    });
    resetColorBtn.style.display = "none"; // Hide the button after resetting
  });

  // Update active section based on scroll position
  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        pageYOffset >= sectionTop - 60 &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
        section.classList.add("active"); // Add active class
      } else {
        section.classList.remove("active"); // Remove active class
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Scroll to the About section by default on page load
  if (currentUrl.endsWith("index.html") || currentUrl === "/") {
    const aboutSection = document.getElementById("about");

    // Set the active class for About link
    links.forEach((link) => {
      if (link.getAttribute("href") === "#about") {
        link.classList.add("active");
      }
    });

    // Scroll to the About section smoothly
    aboutSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Handle form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Example: Send email using a service (you should implement this part)
    console.log("Sending email:", {
      name,
      email,
      subject,
      message,
    });

    // Show response message
    document.getElementById("response-message").innerText =
      "Your message has been sent!";
    document.getElementById("response-message").style.display = "block";

    // Clear the form
    document.getElementById("contact-form").reset();
  });

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scroll to top
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const roles = [
    "Web Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Systems Analyst",
  ];
  let currentRoleIndex = 0;
  const roleElement = document.querySelector(".dynamic-role");

  function changeRole() {
    const newRole = roles[(currentRoleIndex + 1) % roles.length];
    roleElement.classList.remove("show");
    setTimeout(() => {
      roleElement.textContent = newRole;
      roleElement.classList.add("show");
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    }, 500); // Delay to match the fade-out duration
  }

  roleElement.classList.add("show"); // Initially show the role
  setInterval(changeRole, 3000); // Change role every 3 seconds
});
