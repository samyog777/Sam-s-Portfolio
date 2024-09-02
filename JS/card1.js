import { data } from "../Data/projects.js";
console.log(data);

function createLanguageButton(language) {
  const buttonContainer = document.querySelector(".language-buttons");
  const button = document.createElement("button");
  button.classList.add("language-button");
  button.textContent = language;
  button.dataset.language = language; // Store language in data attribute

  button.addEventListener("click", () => {
    // Remove active class from all buttons
    document.querySelectorAll(".language-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the clicked button
    button.classList.add("active");

    loadProjects(language); // Load projects for the selected language
  });

  buttonContainer.appendChild(button);
}

function createProjectCard(project, link, detail, index) {
  const projectSection = document.querySelector("#project .content");

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h3 class="projectTitle">${project}</h3>
    <img src="https://via.placeholder.com/150" alt="${project} Project" class="projectImage" />
    <p class="projectDetails">${detail}</p>
    <a href="${link}" target="_blank" class="projectLink">View Project</a>
  `;

  // Retrieve color from localStorage if it exists
  const savedColor = localStorage.getItem(`projectColor-${index}`);
  if (savedColor) {
    card.style.backgroundColor = savedColor;
  }

  // Add an event listener to toggle background color on click
  card.addEventListener("click", () => {
    changeBackgroundColor(card, index);
  });

  projectSection.appendChild(card);
}

function loadProjects(selectedLanguage = null) {
  const projectSection = document.querySelector("#project .content");
  projectSection.innerHTML = ""; // Clear existing content

  data.forEach((item) => {
    // Load only the selected language or default to Java
    if (!selectedLanguage && item.language === "Java") {
      item.projects.forEach((project, index) => {
        createProjectCard(
          project,
          item.links[index],
          item.details[index],
          index
        );
      });
    } else if (selectedLanguage === item.language) {
      item.projects.forEach((project, index) => {
        createProjectCard(
          project,
          item.links[index],
          item.details[index],
          index
        );
      });
    }
  });

  // Ensure the content layout is consistent
  projectSection.style.display = "flex"; // Use flexbox for layout
  projectSection.style.flexWrap = "wrap"; // Allow wrapping
  projectSection.style.justifyContent = "center"; // Center cards
}

// Create language buttons
function initializeLanguageButtons() {
  const languages = [...new Set(data.map((item) => item.language))]; // Unique languages
  languages.forEach(createLanguageButton);

  // Set the Java button as active by default
  const javaButton = document.querySelector(
    ".language-button[data-language='Java']"
  );
  if (javaButton) {
    javaButton.classList.add("active");
  }
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to change the background color of a card
function changeBackgroundColor(card, index) {
  const currentColor = window.getComputedStyle(card).backgroundColor;
  let newColor;

  // Keep changing the color slightly to avoid big jumps
  do {
    newColor = getRandomColor();
  } while (newColor === currentColor);

  card.style.backgroundColor = newColor;

  // Save the new color to localStorage
  localStorage.setItem(`projectColor-${index}`, newColor);
}

// Function to reset the background color of all cards
function resetBackgroundColors() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.backgroundColor = ""; // Reset to default

    // Remove color from localStorage
    localStorage.removeItem(`projectColor-${index}`);
  });

  resetColorBtn.style.display = "none"; // Hide the reset button after resetting
}

// Initialize buttons and load Java projects by default
initializeLanguageButtons();
loadProjects(); // Load Java projects by default

// Handle reset button click
const resetColorBtn = document.querySelector("#resetColorBtn");
resetColorBtn.addEventListener("click", resetBackgroundColors);
