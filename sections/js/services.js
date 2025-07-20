function initServices() {
  const services = document.querySelectorAll(".service");
  const folderContainer =
    document.getElementsByClassName("folder-container")[0];
  const mainPage = document.getElementById("services-main");
  const detailsPage = document.getElementById("service-details");
  const backButton = document.getElementById("back-button");
  const serviceTitle = document.getElementById("service-title");
  const serviceContent = document.getElementById("service-content");

  // Service details data
  const serviceDetails = {
    "web-dev": {
      title: "Web Development",
      content: `
        <h3>Custom Web Solutions</h3>
        <p>We create modern, responsive websites tailored to your business needs.</p>
        <h3>Technologies We Use:</h3>
        <ul>
          <li>HTML5, CSS3, JavaScript</li>
          <li>React, Vue.js, Angular</li>
          <li>Node.js, PHP, Python</li>
          <li>MySQL, PostgreSQL, MongoDB</li>
        </ul>
        <h3>Services Include:</h3>
        <ul>
          <li>Full-stack development</li>
          <li>Responsive design</li>
          <li>Performance optimization</li>
          <li>SEO-friendly structure</li>
          <li>Cross-browser compatibility</li>
        </ul>
      `,
    },
    seo: {
      title: "SEO Optimization",
      content: `
        <h3>Boost Your Search Rankings</h3>
        <p>Comprehensive SEO strategies to improve your online visibility.</p>
        <h3>Our SEO Services:</h3>
        <ul>
          <li>Keyword research and analysis</li>
          <li>On-page optimization</li>
          <li>Technical SEO audits</li>
          <li>Content strategy</li>
          <li>Link building</li>
          <li>Local SEO</li>
        </ul>
        <h3>Results You Can Expect:</h3>
        <ul>
          <li>Higher search engine rankings</li>
          <li>Increased organic traffic</li>
          <li>Better user engagement</li>
          <li>Improved conversion rates</li>
        </ul>
      `,
    },
    "app-dev": {
      title: "App Development",
      content: `
        <h3>Mobile Applications</h3>
        <p>Native and cross-platform mobile apps for iOS and Android.</p>
        <h3>Development Platforms:</h3>
        <ul>
          <li>Native iOS (Swift, Objective-C)</li>
          <li>Native Android (Java, Kotlin)</li>
          <li>React Native</li>
          <li>Flutter</li>
          <li>Xamarin</li>
        </ul>
        <h3>App Features:</h3>
        <ul>
          <li>User authentication</li>
          <li>Push notifications</li>
          <li>Offline functionality</li>
          <li>Payment integration</li>
          <li>Analytics and reporting</li>
        </ul>
      `,
    },
    "ui-ux": {
      title: "UI/UX Design",
      content: `
        <h3>User-Centered Design</h3>
        <p>Creating intuitive and engaging user experiences.</p>
        <h3>Design Process:</h3>
        <ul>
          <li>User research and personas</li>
          <li>Wireframing and prototyping</li>
          <li>Visual design and branding</li>
          <li>Usability testing</li>
          <li>Design system creation</li>
        </ul>
        <h3>Tools We Use:</h3>
        <ul>
          <li>Figma, Sketch, Adobe XD</li>
          <li>InVision, Marvel</li>
          <li>Principle, Framer</li>
          <li>Adobe Creative Suite</li>
        </ul>
      `,
    },
    hosting: {
      title: "Web Hosting",
      content: `
        <h3>Reliable Hosting Solutions</h3>
        <p>Secure, fast, and reliable web hosting services.</p>
        <h3>Hosting Features:</h3>
        <ul>
          <li>99.9% uptime guarantee</li>
          <li>SSD storage</li>
          <li>Free SSL certificates</li>
          <li>Daily backups</li>
          <li>24/7 technical support</li>
          <li>CDN integration</li>
        </ul>
        <h3>Hosting Types:</h3>
        <ul>
          <li>Shared hosting</li>
          <li>VPS hosting</li>
          <li>Dedicated servers</li>
          <li>Cloud hosting</li>
          <li>WordPress hosting</li>
        </ul>
      `,
    },
    consulting: {
      title: "IT Consulting",
      content: `
        <h3>Strategic Technology Guidance</h3>
        <p>Expert advice to help your business leverage technology effectively.</p>
        <h3>Consulting Services:</h3>
        <ul>
          <li>Digital transformation strategy</li>
          <li>System architecture design</li>
          <li>Technology stack recommendations</li>
          <li>Security assessments</li>
          <li>Performance optimization</li>
          <li>Cloud migration planning</li>
        </ul>
        <h3>Industry Expertise:</h3>
        <ul>
          <li>E-commerce</li>
          <li>Healthcare</li>
          <li>Finance</li>
          <li>Education</li>
          <li>Manufacturing</li>
        </ul>
      `,
    },
  };

  services.forEach((service) => {
    service.addEventListener("click", function () {
      const serviceType = this.dataset.service;
      const details = serviceDetails[serviceType];

      // Remove active class from all services
      services.forEach((s) => s.classList.remove("active"));

      if (details) {
        // Add active class to clicked service
        this.classList.add("active");

        // Update content
        serviceTitle.textContent = details.title;
        serviceContent.innerHTML = details.content;

        // Slide the tab menu left and details page in
        mainPage.classList.add("tab-active");
        detailsPage.classList.add("active");
        folderContainer.classList.add("slide-left");
      }
    });
  });

  // Back button functionality
  backButton.addEventListener("click", function () {
    mainPage.classList.remove("tab-active");
    folderContainer.classList.remove("slide-left");
    detailsPage.classList.remove("active");
    services.forEach((s) => s.classList.remove("active"));
  });
}

// Make it globally available
window.initServices = initServices;
