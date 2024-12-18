// Fetch data from config.json file
fetch("./config.json")
  .then((response) => response.json())
  .then((data) => {
    const navData = data.nav;
    const headerData = data.header;
    const aboutData = data.about;
    const resumeData = data.resume;
    const projectsData = data.projects;
    const contactData = data.contact;

    // ================== TOP NAV BAR ==================
    const brandLink = document.getElementById("brandLink");
    brandLink.href = navData.topNav.brandLink;
    brandLink.textContent = navData.topNav.brandName;

    const themeToggleButton = document.getElementById("themeToggleButton");
    const themeIcon = document.getElementById("themeIcon");

    // ================== THEME TOGGLER ==================
    // Initialize theme based on local storage
    const initializeTheme = () => {
      const bodyClass = window.localStorage.getItem("portfolio-theme") || "";
      const iconClass = window.localStorage.getItem("theme-icon") || "uil-moon";
      document.body.className = bodyClass;
      themeIcon.className = `uil ${iconClass}`;
    };

    const updateThemeIcon = () => {
      if (document.body.className == "") {
        themeIcon.className = "uil uil-moon";
      } else {
        themeIcon.className = "uil uil-sun";
      }
    };

    // Add click listener to theme toggle button
    themeToggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme-variables");

      if (document.body.className == "") {
        window.localStorage.setItem("portfolio-theme", "");
        window.localStorage.setItem("theme-icon", "uil-moon");
      } else {
        window.localStorage.setItem("portfolio-theme", "dark-theme-variables");
        window.localStorage.setItem("theme-icon", "uil-sun");
      }
      updateThemeIcon();

      const isDarkTheme = document.body.classList.contains(
        "dark-theme-variables"
      );
      const projectImages = document.querySelectorAll(".project-img img");

      projectImages.forEach((img) => {
        const lightSrc = img.getAttribute("data-light");
        const darkSrc = img.getAttribute("data-dark");
        img.src = isDarkTheme ? darkSrc : lightSrc;
      });
    });

    // Initialize theme on page load
    initializeTheme();

    // ================== FLOATING NAV BAR ==================
    const floatingNavContainer = document.getElementById(
      "floatingNavContainer"
    );
    navData.floatingNav.forEach((item, index) => {
      const anchor = document.createElement("a");
      anchor.href = item.link;
      anchor.innerHTML = `<i class="${item.icon}"></i>`;
      if (index === 0) anchor.classList.add("active"); // Set the first nav item as active
      floatingNavContainer.appendChild(anchor);
    });

    // Add event listeners for the floating nav bar links
    const navLinks = document.querySelectorAll(".floating-nav a");
    navLinks.forEach((nav) => {
      nav.addEventListener("click", (event) => {
        event.preventDefault();
        const targetID = nav.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetID);

        targetSection.scrollIntoView({ behavior: "smooth" });

        navLinks.forEach((link) => link.classList.remove("active"));
        nav.classList.add("active");
      });
    });

    // Helper functions to add and remove active class
    const removeActiveClass = () => {
      navLinks.forEach((link) => link.classList.remove("active"));
    };

    const addActiveClass = (id) => {
      const activeLink = document.querySelector(
        `.floating-nav a[href="#${id}"]`
      );
      if (activeLink) {
        removeActiveClass();
        activeLink.classList.add("active");
      }
    };

    // ================== NAVIGATION LOGIC ==================
    const sections = document.querySelectorAll("header, section");

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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
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

    // ================== HEADER SECTION ==================

    // Set profile image
    const profileImage = document.getElementById("profileImage");
    profileImage.src = headerData.profileImage;

    // Set intro text
    const introText = document.getElementById("introText");
    introText.textContent = headerData.introText;

    // Set title text
    const titleText = document.getElementById("titleText");
    titleText.innerHTML = `${headerData.title.main} <br /><span>${headerData.title.location}</span>`;

    // Set bio text
    const bioText = document.getElementById("bioText");
    bioText.textContent = headerData.bio;

    // Set CTA buttons
    const ctaButtonsContainer = document.getElementById("ctaButtonsContainer");
    headerData.ctaButtons.forEach((button) => {
      const anchor = document.createElement("a");
      anchor.href = button.link;
      anchor.textContent = button.text;
      if (button.text === "Download Resume/CV") {
        anchor.classList.add("btn", "primary");
      } else {
        anchor.classList.add("btn");
      }
      if (button.newTab) anchor.setAttribute("target", "_blank");
      ctaButtonsContainer.appendChild(anchor);
    });

    // Set social links
    const socialLinksContainer = document.getElementById(
      "socialLinksContainer"
    );
    headerData.socialLinks.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.link;
      anchor.classList.add("contact-option");
      anchor.innerHTML = `<i class="${link.icon}"></i>`;
      if (link.newTab) anchor.setAttribute("target", "_blank");
      socialLinksContainer.appendChild(anchor);
    });

    // ================== ABOUT SECTION ==================

    // Set about title
    const aboutTitle = document.getElementById("aboutTitle");
    aboutTitle.textContent = aboutData.title;

    // Set about profile image
    const aboutProfileImage = document.getElementById("aboutProfileImage");
    aboutProfileImage.src = aboutData.profileImage;

    // Set about description
    const aboutDescription = document.getElementById("aboutDescription");
    aboutDescription.textContent = aboutData.description;

    // ================== RESUME SECTION ==================

    const resumeHeader = document.querySelector("#resume h1");
    const resumeCaption = document.querySelector("#resume p");
    resumeHeader.textContent = resumeData.resumeHeader;
    resumeCaption.textContent = resumeData.resumeCaption;

    const menuContainer = document.querySelector(".resume-left menu");
    resumeData.categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("btn", category.className);
      if (category.default) button.classList.add("primary"); // Mark default button
      button.textContent = category.name;
      menuContainer.appendChild(button);
    });

    // Helper function to set resume content
    const setResumeContent = (content, className) => {
      const resumeRightContent = document.getElementById("resumeRightContent");
      resumeRightContent.innerHTML = content;
      resumeRightContent.className = `resume-right ${className}`;
    };

    // Helper function to update active button class
    const updateActiveButton = (clickedButton) => {
      const buttons = document.querySelectorAll(".resume-left button");
      buttons.forEach((btn) => btn.classList.remove("primary")); // Remove 'primary' class from all buttons
      clickedButton.classList.add("primary"); // Add 'primary' class to the clicked button
    };

    // Set Resume Content for Experience
    const setExperienceContent = (button) => {
      const experienceContent = `
    <h4>Experience</h4>
    <ul>
      ${resumeData.experience
        .map(
          (item) => `
        <li>
          <h6>${item.date}</h6>
          <h5><span>${item.company} |</span> ${item.position}</h5>
          <p>${item.description}</p>
        </li>
      `
        )
        .join("")}
    </ul>`;
      setResumeContent(experienceContent, "experience");
      updateActiveButton(button);
    };

    // Set Resume Content for Education
    const setEducationContent = (button) => {
      const educationContent = `
    <h4>Education</h4>
    <ul>
      ${resumeData.education
        .map(
          (item) => `
        <li>
          <h5><span>${item.degree},</span> ${item.institution}</h5>
          <p>${item.date}</p>
        </li>
      `
        )
        .join("")}
    </ul>`;
      setResumeContent(educationContent, "education");
      updateActiveButton(button);
    };

    // Set Resume Content for Skills with Logos
    const setSkillsContent = (button) => {
      const skillCategories = ["All", ...resumeData.skills.categories]; // Add "All" category
      const skillItems = resumeData.skills.items;
      const skillsContent = `
    <h4>Skills</h4>
    <menu class="skill-categories">
      ${skillCategories
        .map(
          (category) =>
            `<button class="btn" data-filter="${category.toLowerCase()}">${category}</button>`
        )
        .join("")}
    </menu>
    <div class="container skills-container">
      <ul class="skills-list">
        ${Object.keys(skillItems)
          .map(
            (category) => `
          ${skillItems[category]
            .map(
              (skill) => `
            <li class="${category.toLowerCase()}">
              <img src="${skill.logo}" alt="${skill.name} logo" />
            </li>
          `
            )
            .join("")}
        `
          )
          .join("")}
      </ul>
    </div>`;
      setResumeContent(skillsContent, "skills");
      updateActiveButton(button);

      // Filtering logic for the skills categories
      const skillButtons = document.querySelectorAll(
        ".skill-categories button"
      );
      const skillsListItems = document.querySelectorAll(".skills-list li");

      skillButtons.forEach((categoryButton) => {
        categoryButton.addEventListener("click", () => {
          const filterValue = categoryButton.getAttribute("data-filter");

          // Remove 'active' class from all buttons and add to the clicked one
          skillButtons.forEach((btn) => btn.classList.remove("active"));
          categoryButton.classList.add("active");

          // Filter skills based on category
          skillsListItems.forEach((item) => {
            if (filterValue === "all" || item.classList.contains(filterValue)) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
      });

      // Show all skills by default
      skillButtons[0].click();
    };

    // Set Resume Content for Info
    const setInfoContent = (button) => {
      const infoFields = Object.entries(resumeData.info); // Get key-value pairs of info data
      const infoContent = `
    <ul>
      ${infoFields
        .map(
          ([label, value]) => `
        <li>
          <h6>${label.charAt(0).toUpperCase() + label.slice(1)}</h6>
          <h5>${value}</h5>
        </li>
      `
        )
        .join("")}
    </ul>`;

      setResumeContent(infoContent, "info");
      updateActiveButton(button);
    };

    // Event listeners for resume buttons
    document
      .querySelector(".experience-btn")
      .addEventListener("click", (e) => setExperienceContent(e.target));
    document
      .querySelector(".education-btn")
      .addEventListener("click", (e) => setEducationContent(e.target));
    document
      .querySelector(".skills-btn")
      .addEventListener("click", (e) => setSkillsContent(e.target));
    document
      .querySelector(".info-btn")
      .addEventListener("click", (e) => setInfoContent(e.target));

    // Load default experience content on page load
    setExperienceContent(document.querySelector(".experience-btn"));

    // ================== PROJECTS SECTION ==================

    isDarkTheme = document.body.classList.contains("dark-theme-variables");
    const DESCRIPTION_LIMIT = 50;

    // Set project section title and description
    const projectsTitle = document.querySelector("#projects h1");
    const projectsDescription = document.querySelector("#projects p");
    projectsTitle.textContent = projectsData.title;
    projectsDescription.textContent = projectsData.description;

    // Set project categories
    const projectCategoriesContainer = document.querySelector(
      ".project-categories"
    );
    projectsData.categories.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.setAttribute("data-filter", category.filter);
      button.textContent = category.name;
      projectCategoriesContainer.appendChild(button);
    });

    // Set project list
    const projectsContainer = document.querySelector(".projects-container");
    projectsData.projectsList.forEach((project) => {
      const projectImage = isDarkTheme ? project.imageDark : project.imageLight;

      const projectElement = document.createElement("article");
      projectElement.classList.add("project", "mix", project.category);
      projectElement.setAttribute("data-order", project.order);

      projectElement.innerHTML = `
        <div class="project-img">
          <img 
            src="${projectImage}" 
            alt="${project.title}" 
            data-light="${project.imageLight}" 
            data-dark="${project.imageDark}" 
          />
        </div>
        <h5>${project.title}</h5>
        <p class="project-description">${project.description}</p>
        <div class="project-cta">
          <a href="${project.liveLink}" class="btn primary" target="_blank">
            <i class="uil uil-link-h"></i>
          </a>
          <a href="${project.githubLink}" class="btn" target="_blank">
            <i class="uil uil-github"></i>
          </a>
        </div>
      `;

      // Truncate text if it is over the limit
      const descriptionElem = projectElement.querySelector(
        ".project-description"
      );
      const fullText = project.description;

      if (fullText.length > DESCRIPTION_LIMIT) {
        const truncatedText = fullText.slice(0, DESCRIPTION_LIMIT) + "...";
        descriptionElem.textContent = truncatedText;

        // Create toggle button
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "Expand";
        toggleButton.classList.add("btn", "toggle-description-btn");
        const projectCTA = projectElement.querySelector(".project-cta");
        projectElement.insertBefore(toggleButton, projectCTA);

        // Add event listener to toggle between truncated and full text
        let isExpanded = false;
        toggleButton.addEventListener("click", () => {
          if (isExpanded) {
            descriptionElem.textContent = truncatedText;
            toggleButton.textContent = "Expand";
          } else {
            descriptionElem.textContent = fullText;
            toggleButton.textContent = "Collapse";
          }
          isExpanded = !isExpanded;
        });
      }

      projectsContainer.appendChild(projectElement);
    });

    // Initialize MixItUp filtering
    const mixer = mixitup(projectsContainer, {
      animation: {
        enable: false,
      },
    });
    mixer.filter("*");

    // ================== CONTACT SECTION ==================

    // Set contact section title
    const contactTitle = document.querySelector("#contact h1");
    contactTitle.textContent = contactData.title;

    // Set contact form placeholders
    const contactForm = document.querySelector("#contact form");
    contactForm.setAttribute("action", contactData.form.action);
    contactForm.innerHTML = `
      <input type="text" name="Name" placeholder="${contactData.form.namePlaceholder}" required />
      <input type="email" name="Email" placeholder="${contactData.form.emailPlaceholder}" required />
      <textarea rows="7" name="Message" placeholder="${contactData.form.messagePlaceholder}" required></textarea>
      <button type="submit" class="btn primary">${contactData.form.submitButton}</button>
    `;

    // Set contact options (icons and links)
    const contactOptionsContainer = document.querySelector(".contact-options");
    contactData.contactOptions.forEach((option) => {
      const anchor = document.createElement("a");
      anchor.href = option.link;
      anchor.classList.add("contact-option");
      anchor.innerHTML = `<i class="${option.icon}"></i>`;
      if (option.newTab) anchor.setAttribute("target", "_blank");
      contactOptionsContainer.appendChild(anchor);
    });

    // Handle form submission with reset
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(contactForm); // Create FormData object
      const actionUrl = contactForm.getAttribute("action"); // Get action URL from form
      const formObject = Object.fromEntries(formData); // Convert FormData to an object

      // Submit form data via Fetch API
      fetch(actionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject), // Convert form data to JSON string
      })
        .then((response) => {
          if (response.ok) {
            alert("Thank you! Your message has been sent.");
            contactForm.reset(); // Reset the form fields
          } else {
            alert("Something went wrong. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error submitting the form:", error);
          alert("An error occurred. Please try again later.");
        });
    });
  })
  .catch((error) => console.error("Error loading content:", error));
