const serviceDetails = {
  ecommerce: {
    title: "E-commerce Solutions",
    description: "We build secure and scalable e-commerce platforms tailored to your business.",
    features: [
      "Customizable storefronts",
      "Secure payment gateways",
      "Inventory management",
      "Analytics and reporting",
    ],
  },
  webapps: {
    title: "Web Applications",
    description: "Custom web applications with seamless performance and responsive UI.",
    features: [
      "Cross-browser compatibility",
      "Scalable architecture",
      "User-friendly interfaces",
      "API integrations",
    ],
  },
  crm: {
    title: "CRM Systems",
    description: "Customer Relationship Management systems to improve client engagement.",
    features: [
      "Contact management",
      "Sales tracking",
      "Automation tools",
      "Customizable dashboards",
    ],
  },
  erp: {
    title: "ERP Systems",
    description: "ERP systems to streamline and integrate core business processes.",
    features: [
      "Financial management",
      "Supply chain optimization",
      "Human resource management",
      "Real-time analytics",
    ],
  },
  mobile: {
    title: "Mobile Applications",
    description: "Native and hybrid mobile apps for Android and iOS.",
    features: [
      "Platform-specific designs",
      "Offline functionality",
      "Push notifications",
      "App store deployment",
    ],
  },
  websites: {
    title: "Websites",
    description: "Modern, responsive websites optimized for speed and SEO.",
    features: [
      "Mobile-first design",
      "Fast loading times",
      "SEO-friendly structure",
      "Custom branding",
    ],
  },
  marketing: {
    title: "Digital Marketing",
    description: "Data-driven digital marketing strategies to grow your brand.",
    features: [
      "Social media campaigns",
      "Email marketing",
      "Content creation",
      "Performance tracking",
    ],
  },
  seo: {
    title: "SEO Services",
    description: "Technical and content SEO to improve your search engine ranking.",
    features: [
      "Keyword research",
      "On-page optimization",
      "Backlink building",
      "Performance monitoring",
    ],
  },
};

function openApp(serviceKey) {
  const appWindow = document.getElementById("appWindow");
  const appTitle = document.getElementById("appTitle");
  const appContent = document.getElementById("appContent");

  const service = serviceDetails[serviceKey];
  appWindow.style.display = "flex";
  appTitle.textContent = service.title;

  // Create dynamic content
  appContent.innerHTML = `
    <p>${service.description}</p>
    <ul>
      ${service.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
  `;
}

function closeApp() {
  const appWindow = document.getElementById("appWindow");
  appWindow.style.display = "none";
}
