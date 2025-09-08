const serviceDetails = {
  ecommerce: {
    title: "E-commerce Solutions",
    icon: "../../asset/images/services/icons/ecommerce.png",
    description:
      "Launch your online store with a seamless, secure, and scalable e-commerce platform. We provide everything you need to sell online and grow your business.",
    features: [
      { icon: "🛒", text: "Customizable storefronts" },
      { icon: "💳", text: "Secure payment gateways" },
      { icon: "📦", text: "Inventory management" },
      { icon: "📊", text: "Analytics & reporting" },
    ],
    cta: { text: "Get Started", link: "#" },
  },
  webapps: {
    title: "Web Applications",
    icon: "../../asset/images/services/icons/web-apps.png",
    description:
      "Build robust, scalable, and interactive web applications tailored to your business needs. Our apps are fast, secure, and user-friendly.",
    features: [
      { icon: "⚡", text: "High performance" },
      { icon: "🔗", text: "API integrations" },
      { icon: "📱", text: "Responsive UI/UX" },
      { icon: "🔒", text: "Enterprise-grade security" },
    ],
    cta: { text: "See Portfolio", link: "#" },
  },
  crm: {
    title: "CRM Systems",
    icon: "../../asset/images/services/icons/crm.png",
    description:
      "Manage your customer relationships efficiently with our custom CRM solutions. Boost engagement and streamline your sales process.",
    features: [
      { icon: "👥", text: "Contact management" },
      { icon: "📈", text: "Sales tracking" },
      { icon: "🤖", text: "Automation tools" },
      { icon: "📊", text: "Custom dashboards" },
    ],
    cta: { text: "Request Demo", link: "#" },
  },
  erp: {
    title: "ERP Systems",
    icon: "../../asset/images/services/icons/erp.png",
    description:
      "Integrate all your business processes with our powerful ERP systems. Gain real-time insights and improve operational efficiency.",
    features: [
      { icon: "💼", text: "Financial management" },
      { icon: "🚚", text: "Supply chain optimization" },
      { icon: "🧑‍💼", text: "HR management" },
      { icon: "📊", text: "Real-time analytics" },
    ],
    cta: { text: "Contact Sales", link: "#" },
  },
  mobile: {
    title: "Mobile Applications",
    icon: "../../asset/images/services/icons/mobile-app.png",
    description:
      "Reach your audience on any device with our native and cross-platform mobile apps. We deliver beautiful, high-performance apps for iOS and Android.",
    features: [
      { icon: "📱", text: "iOS & Android" },
      { icon: "🔔", text: "Push notifications" },
      { icon: "☁️", text: "Cloud sync" },
      { icon: "🛠️", text: "App store deployment" },
    ],
    cta: { text: "Start Your App", link: "#" },
  },
  websites: {
    title: "Websites",
    icon: "../../asset/images/services/icons/website.png",
    description:
      "Get a modern, responsive website that looks great on any device and ranks well on search engines. Perfect for businesses, portfolios, and more.",
    features: [
      { icon: "🌐", text: "Mobile-first design" },
      { icon: "⚡", text: "Fast loading" },
      { icon: "🔍", text: "SEO optimized" },
      { icon: "🎨", text: "Custom branding" },
    ],
    cta: { text: "View Templates", link: "#" },
  },
  marketing: {
    title: "Digital Marketing",
    icon: "../../asset/images/services/icons/marketing.png",
    description:
      "Grow your brand and reach new customers with our data-driven digital marketing strategies. We help you stand out in a crowded market.",
    features: [
      { icon: "📢", text: "Social media campaigns" },
      { icon: "✉️", text: "Email marketing" },
      { icon: "📝", text: "Content creation" },
      { icon: "📈", text: "Performance tracking" },
    ],
    cta: { text: "Boost My Brand", link: "#" },
  },
  seo: {
    title: "SEO Services",
    icon: "../../asset/images/services/icons/seo.png",
    description:
      "Improve your search engine rankings and drive more organic traffic with our comprehensive SEO services.",
    features: [
      { icon: "🔑", text: "Keyword research" },
      { icon: "🛠️", text: "On-page optimization" },
      { icon: "🔗", text: "Backlink building" },
      { icon: "📊", text: "Performance monitoring" },
    ],
    cta: { text: "Free SEO Audit", link: "#" },
  },
};

function openApp(serviceKey) {
  // Remove active class from all dock items
  document.querySelectorAll('.dock li').forEach(li => li.classList.remove('active'));
  // Add active class to the clicked dock item
  const dockItem = document.querySelector(`.dock li[onclick*="${serviceKey}"]`);
  if (dockItem) dockItem.classList.add('active');

  const appWindow = document.getElementById("appWindow");
  const appTitle = document.getElementById("appTitle");
  const appContent = document.getElementById("appContent");

  // Always ensure display is set so window can open after closing
  appWindow.style.display = "flex";

  // If already visible, close first for animation, then open after
  if (appWindow.classList.contains("visible")) {
    appWindow.classList.remove("visible");
    appWindow.classList.add("closing");
    setTimeout(() => {
      appWindow.classList.remove("closing");
      showAppContent();
    }, 220);
  } else {
    showAppContent();
  }

  function showAppContent() {
    const service = serviceDetails[serviceKey];
    appTitle.textContent = service.title;
    appContent.innerHTML = `
      <div class="service-title-row">
        <img src="${service.icon}" alt="${service.title} Icon" class="service-main-icon" />
        <span class="service-title-text">${service.title}</span>
      </div>
      <div class="service-desc">${service.description}</div>
      <ul class="features-list">
        ${service.features
          .map(
            (feature) =>
              `<li><span class="feature-icon">${feature.icon}</span>${feature.text}</li>`
          )
          .join("")}
      </ul>
      <a class="service-cta-btn" href="#">${service.cta.text}</a>
    `;

    appWindow.classList.remove("closing");
    appWindow.classList.add("visible");

    // Only make the CTA button go to contact, not window controls
    const ctaBtn = appWindow.querySelector(".service-cta-btn");
    if (ctaBtn) {
      ctaBtn.onclick = function (e) {
        e.preventDefault();
        const contactMenuItem = document.getElementById("contact-menu-item");
        if (contactMenuItem) {
          const contactLink = contactMenuItem.querySelector("a");
          if (contactLink) {
            contactLink.click();
          } else {
            contactMenuItem.click();
          }
        } else if (typeof goTo === "function") {
          goTo("contact");
        } else {
          window.location.hash = "#contact";
        }
      };
    }
  }
}

function closeApp() {
  const appWindow = document.getElementById("appWindow");
  appWindow.classList.remove("visible");
  appWindow.classList.add("closing");
  // Remove active class from all dock items
  document.querySelectorAll('.dock li').forEach(li => li.classList.remove('active'));
  setTimeout(() => {
    appWindow.classList.remove("closing");
    appWindow.style.display = ""; // Reset to default so openApp can set it again
  }, 220);
}

// Initialize services section (called from main.js after loading)
function initServices() {
  openApp('ecommerce');
}