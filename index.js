// TOP NAV
const refreshLink = document.getElementById("refreshLink");
refreshLink.addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

// FLOATING NAV
const sections = document.querySelectorAll("header, section");
const navLinks = document.querySelectorAll(".floating-nav a");

const removeActiveClass = () => {
  navLinks.forEach((nav) => {
    nav.classList.remove("active");
  });
};

const addActiveClass = (id) => {
  removeActiveClass();
  const activeLink = document.querySelector(`.floating-nav a[href="#${id}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      addActiveClass(entry.target.id);
    }
  });
};

const observerOptions = {
  threshold: 0.5,
};
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

navLinks.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    event.preventDefault();
    const targetID = nav.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetID);

    targetSection.scrollIntoView({ behavior: "smooth" });

    removeActiveClass();
    nav.classList.add("active");
  });
});

// RESUME
const setResumeContent = (content, className) => {
  resumeRight.innerHTML = content;
  resumeRight.className = `resume-right ${className}`;
};

const resumeRight = document.querySelector(".resume-right");
const experienceContent = `
          <h4>Experience</h4>
          <p>
            Discover the impactful roles and projects where I've honed my technical skills and contributed to real-world solutions.
          </p>
          <ul>
            <li>
              <h6>June 2024 - Present</h6>
              <h5><span>SAIC |</span> Mobile Application Developer</h5>
              <p></p>
            </li>
            <li>
              <h6>May 2023 - August 2023</h6>
              <h5><span>Pangiam Labs |</span> Software Engineering Intern</h5>
              <p></p>
            </li>
            <li>
              <h6>June 2020 - August 2020</h6>
              <h5><span>Ascendra inc. |</span> Software Engineering Intern</h5>
              <p></p>
            </li>
          </ul>
`;

setResumeContent(experienceContent, "experience");

const experienceBtn = document.querySelector(".experience-btn");
experienceBtn.addEventListener("click", () => {
  // resumeRight.innerHTML = experienceContent;
  // resumeRight.className = "resume-right experience";
  setResumeContent(experienceContent, "experience");
  experienceBtn.classList.add("primary");
  // remove classes from other buttons
  infoBtn.classList.remove("primary");
  skillsBtn.classList.remove("primary");
  educationBtn.classList.remove("primary");
});
// resumeRight.innerHTML = experienceContent; // set experience content as the default content for resume right when page initially loads

// education
const educationContent = `
            <h4>Education</h4>
            <p>
              Learn about my academic journey and the foundational knowledge I've gained in computer science and engineering.
            </p>
            <ul>
            <li>
                <h5><span>Bachelor's of Science in Computer Science, College of Engineering</span> </h5>
                <p>
                Virginia Tech | August 2021 - May 2025
                </p>
            </li>
            <li>
                <h5><span>Master's of Engineering in Computer Science, College of Engineering</span></h5>
                <p>
                Virginia Tech | August 2025 - May 2026
                </p>
            </li>
            </ul>
`;
const educationBtn = document.querySelector(".education-btn");
educationBtn.addEventListener("click", () => {
  resumeRight.innerHTML = educationContent;
  resumeRight.className = "resume-right education";
  educationBtn.classList.add("primary");
  // remove classes from other buttons
  infoBtn.classList.remove("primary");
  skillsBtn.classList.remove("primary");
  experienceBtn.classList.remove("primary");
});

// skills
const skillsContent = `
            <h4>Skills</h4>
            <p>Explore the diverse set of technical skills and tools I’ve mastered to tackle complex challenges with precision and creativity.</p>
            <menu class="skill-categories">
              <button class="btn active" data-filter="*">All</button>
              <button class="btn" data-filter=".languages">Languages</button>
              <button class="btn" data-filter=".frameworks">Frameworks</button>
              <button class="btn" data-filter=".technologies">Technologies</button>
            </menu>
            <div class="container skills-container">
              <ul class="skills-list">
                <li class="languages"><img src="./assets/logos/c_logo.svg" alt="C logo" /></li>
                <li class="languages"><img src="./assets/logos/python_logo.svg" alt="Python logo" /></li>
                <li class="languages"><img src="./assets/logos/java_logo.svg" alt="Java logo" /></li>
                <li class="frameworks"><img src="./assets/logos/react_logo.svg" alt="React logo" /></li>
                <li class="languages"><img src="./assets/logos/kotlin_logo.svg" alt="Kotlin logo" /></li>
                <li class="technologies"><img src="./assets/logos/docker_logo.svg" alt="Docker logo" /></li>
                <li class="technologies"><img src="./assets/logos/gcloud_logo.svg" alt="Google Cloud logo" /></li>
                <li class="languages"><img src="./assets/logos/html_logo.svg" alt="HTML logo" /></li>
                <li class="languages"><img src="./assets/logos/css_logo.svg" alt="CSS logo" /></li>
                <li class="languages"><img src="./assets/logos/js_logo.svg" alt="JS logo" /></li>
                <li class="languages"><img src="./assets/logos/ts_logo.svg" alt="TS logo" /></li>
              </ul>
            </div>
`;

const skillsBtn = document.querySelector(".skills-btn");
skillsBtn.addEventListener("click", () => {
  setResumeContent(skillsContent, "skills");
  skillsBtn.classList.add("primary");
  infoBtn.classList.remove("primary");
  educationBtn.classList.remove("primary");
  experienceBtn.classList.remove("primary");

  // Skills category filtering logic
  const skillCategories = document.querySelectorAll(".skill-categories button");
  const skillsListItems = document.querySelectorAll(".skills-list li");

  skillCategories.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      // Remove 'active' class from all buttons
      skillCategories.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Show or hide skills based on the selected filter
      skillsListItems.forEach((item) => {
        if (
          filterValue === "*" ||
          item.classList.contains(filterValue.substring(1))
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Show all skills by default
  skillCategories[0].click();
});

// about
const infoContent = `
          <ul>
            <li>
              <h6>Name:</h6>
              <h5>Nickolas Paraskevopoulos</h5>
            </li>
            <li>
              <h6>Experience:</h6>
              <h5>6+ years (2018-Present)</h5>
            </li>
            <li>
              <h6>Email:</h6>
              <h5>nikoparas1@gmail.com</h5>
            </li>
            <li>
              <h6>Nationality:</h6>
              <h5>Greek/American</h5>
            </li>
            <li>
              <h6>Freelance & collabs:</h6>
              <h5>Available</h5>
            </li>
            <li>
              <h6>Languages:</h6>
              <h5>English/Greek</h5>
            </li>
            <li>
              <h6>Phone:</h6>
              <h5>(703)-835-1575</h5>
            </li>
          </ul>
`;
const infoBtn = document.querySelector(".info-btn");
infoBtn.addEventListener("click", () => {
  setResumeContent(infoContent, "info");
  // resumeRight.innerHTML = infoContent;
  // resumeRight.className = "about-body ul";
  infoBtn.classList.add("primary");
  // remove classes from other buttons
  skillsBtn.classList.remove("primary");
  educationBtn.classList.remove("primary");
  experienceBtn.classList.remove("primary");
});

// PROJECTS
const containerEl = document.querySelector(".projects-container");
let mixer = mixitup(containerEl, {
  animation: {
    enable: false,
  },
});

mixer.filter("*");

const projectCategories = document.querySelectorAll(
  ".project-categories button"
);

const removePrimaryClass = (categories) => {
  categories.forEach((category) => {
    category.classList.remove("primary");
  });
};

projectCategories.forEach((category) => {
  category.addEventListener("click", () => {
    removePrimaryClass(projectCategories);
    category.classList.add("primary");
  });
});

// THEME
const themeToggle = document.querySelector(".nav-btn");

const updateThemeIcon = () => {
  if (document.body.className == "") {
    themeToggle.innerHTML = `<i class="uil uil-moon"></i>`;
  } else {
    themeToggle.innerHTML = `<i class="uil uil-sun"></i>`;
  }
};

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");
  if (document.body.className == "") {
    window.localStorage.setItem("portfolio-theme", "");
    window.localStorage.setItem("theme-icon", "uil-moon");
  } else {
    window.localStorage.setItem("portfolio-theme", "dark-theme-variables");
    window.localStorage.setItem("theme-icon", "uil-sun");
  }
  updateThemeIcon();
});

// use theme from local storage
const bodyClass = window.localStorage.getItem("portfolio-theme");
const iconClass = window.localStorage.getItem("theme-icon");
document.body.className = bodyClass;
themeToggle.innerHTML = `<i class="uil ${iconClass || "uil-moon"}"></i>`;
