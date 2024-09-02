import experienceData from "../Data/experienceData.js";

function createExperienceCard(experience) {
  const experienceSection = document.querySelector(
    "#experience .experience-content"
  );

  const card = document.createElement("div");
  card.classList.add("experience-card");

  card.innerHTML = `
        <h3 class="company">${experience.company}</h3>
        <h4 class="position">${experience.position}</h4>
        <p class="duration">${experience.duration}</p>
        <p class="description">${experience.description}</p>
    `;

  experienceSection.appendChild(card);
}

function loadExperience() {
  experienceData.forEach(createExperienceCard);
}

// Load experience data on DOM content loaded
document.addEventListener("DOMContentLoaded", loadExperience);

