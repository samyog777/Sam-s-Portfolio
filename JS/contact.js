
// Handle navigation link and section scrolling (unchanged)
const links = document.querySelectorAll(".list");
const sections = document.querySelectorAll("section");
const currentUrl = window.location.pathname;

links.forEach((link) => {
  if (link.getAttribute("href") === currentUrl) {
    link.classList.add("active");
  }

  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

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
