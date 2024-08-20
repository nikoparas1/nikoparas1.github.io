// FLOATING NAV
const floatingNavs = document.querySelectorAll(".floating-nav a");

const removeActiveClass = () => {
  floatingNavs.forEach((nav) => {
    nav.classList.remove("active");
  });
};

floatingNavs.forEach((nav) => {
  nav.addEventListener("click", () => {
    removeActiveClass();
    nav.classList.add("active");
  });
});

// RESUME
const resumeRight = document.querySelector(".resume-right");
const experienceContent = `
          <h4>Experience</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse error
            perferendis voluptatibus et architecto cum.
          </p>
          <ul>
            <li>
              <h6>June 2024 - Present</h6>
              <h5>Mobile Application Developer</h5>
              <p>SAIC</p>
            </li>
            <li>
              <h6>May 2023 - August 2023</h6>
              <h5>Software Engineering Intern</h5>
              <p>Pangiam Labs</p>
            </li>
            <li>
              <h6>June 2020 - August 2020</h6>
              <h5>Software Engineering Intern</h5>
              <p>Ascendra inc.</p>
            </li>
            <li>
              <h6>January 2021 - Present</h6>
              <h5>Server</h5>
              <p>PJ Skidoos Restaurant</p>
            </li>
          </ul>
`;
const experienceBtn = document.querySelector(".experience-btn");
experienceBtn.addEventListener("click", () => {
  resumeRight.innerHTML = experienceContent;
  resumeRight.className = "resume-right experience";
  experienceBtn.classList.add("primary");
  // remove classes from other buttons
  aboutBtn.classList.remove("primary");
  skillsBtn.classList.remove("primary");
  educationBtn.classList.remove("primary");
});
resumeRight.innerHTML = experienceContent; // set experience content as the default content for resume right when page initially loads

// education
const educationContent = `
            <h4>Education</h4>
            <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            dolores suscipit harum, nam corrupti cumque?
            </p>
            <ul>
            <li>
                <h5>Virginia Tech</h5>
                <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
                aut!
                </p>
            </li>
            <li>
                <h5>Virginia Tech</h5>
                <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
                aut!
                </p>
            </li>
            <li>
                <h5>Virginia Tech</h5>
                <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
                aut!
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
  aboutBtn.classList.remove("primary");
  skillsBtn.classList.remove("primary");
  experienceBtn.classList.remove("primary");
});
// skills
const skillsContent = `
          <h4>Skills</h4>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <ul>
            <li><img src="./assets/react.webp" alt="ReactJS logo" /></li>
            <li><img src="./assets/next.png" alt="NextJS logo" /></li>
            <li><img src="./assets/tailwind.png" alt="Tailwind logo" /></li>
            <li><img src="./assets/prisma.png" alt="Prisma logo" /></li>
            <li><img src="./assets/mongo.jpg" alt="MongoDB logo" /></li>
            <li><img src="./assets/jwt.png" alt="JWT logo" /></li>
            <li><img src="./assets/node.png" alt="NodeJS logo" /></li>
          </ul>
`;
const skillsBtn = document.querySelector(".skills-btn");
skillsBtn.addEventListener("click", () => {
  resumeRight.innerHTML = skillsContent;
  resumeRight.className = "resume-right skills";
  skillsBtn.classList.add("primary");
  // remove classes from other buttons
  aboutBtn.classList.remove("primary");
  educationBtn.classList.remove("primary");
  experienceBtn.classList.remove("primary");
});

// about
const aboutContent = `
          <h4>About me</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            debitis excepturi quibusdam.
          </p>
          <ul>
            <li>
              <h6>Name:</h6>
              <h5>Nickolas Paraskevopoulos</h5>
            </li>
            <li>
              <h6>Experience:</h6>
              <h5>6+ years (2018-2024)</h5>
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
const aboutBtn = document.querySelector(".about-btn");
aboutBtn.addEventListener("click", () => {
  resumeRight.innerHTML = aboutContent;
  resumeRight.className = "resume-right about";
  aboutBtn.classList.add("primary");
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

const removePrimaryClass = () => {
  projectCategories.forEach((category) => {
    category.classList.remove("primary");
  });
};

projectCategories.forEach((category) => {
  category.addEventListener("click", () => {
    removePrimaryClass();
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
