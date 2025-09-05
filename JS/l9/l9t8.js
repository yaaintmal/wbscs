// Function to apply styles to elements
function applyStyles() {
  // Get all elements by their class names
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");
  const logo = document.querySelector(".logo");
  const navList = document.querySelector(".nav-list");
  const navItems = document.querySelectorAll(".nav-item");
  const navLinks = document.querySelectorAll(".nav-item a");
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");
  const h1 = heroContent.querySelector("h1");
  const p = heroContent.querySelector("p");
  const btn = document.querySelector(".btn");
  const footer = document.querySelector(".footer");

  // applying awesome styles to the header
  header.style.backgroundColor = "#fff";
  header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  header.style.padding = "1rem 0";

  // applying awesome styles to the nav
  nav.style.display = "flex";
  nav.style.justifyContent = "space-between";
  nav.style.alignItems = "center";
  nav.style.maxWidth = "1200px";
  nav.style.margin = "0 auto";
  nav.style.padding = "0 1rem";

  // applying awesome styles to the logo
  logo.style.fontSize = "1.5rem";
  logo.style.fontWeight = "bold";
  logo.style.color = "#333";
  logo.style.textDecoration = "none";

  // applying awesome styles to the nav-list
  navList.style.display = "flex";
  navList.style.listStyle = "none";

  // applying awesome styles to the nav-items and links
  navItems.forEach((item) => {
    item.style.marginLeft = "1.5rem";
  });
  navLinks.forEach((link) => {
    link.style.textDecoration = "none";
    link.style.color = "#333";
    link.style.fontWeight = "bold";
  });

  // applying awesome styles to the hero section
  hero.style.height = "560px";
  hero.style.background =
    'url("https://images.pexels.com/photos/2907301/pexels-photo-2907301.jpeg?auto=compress&cs=tinysrgb&w=640&h=853&dpr=1") no-repeat center center/cover';
  hero.style.color = "#fff";

  // applying awesome styles to the hero-content
  heroContent.style.maxWidth = "600px";
  heroContent.style.height = "100%";
  heroContent.style.display = "flex";
  heroContent.style.flexDirection = "column";
  heroContent.style.justifyContent = "center";
  heroContent.style.alignItems = "center";
  heroContent.style.textAlign = "center";
  heroContent.style.margin = "0 auto"; // Center hero content horizontally

  // applying awesome styles to the hero h1 and p
  h1.style.fontSize = "2.5rem";
  h1.style.marginBottom = "1rem";
  p.style.fontSize = "1.2rem";
  p.style.marginBottom = "2rem";

  // applying awesome styles to the button
  btn.style.backgroundColor = "#333";
  btn.style.color = "#fff";
  btn.style.padding = "0.75rem 1.5rem";
  btn.style.textDecoration = "none";
  btn.style.borderRadius = "5px";
  btn.style.transition = "background-color 0.3s ease";

  // Add hover effect for the button
  btn.addEventListener("mouseover", () => {
    btn.style.backgroundColor = "#555";
  });
  btn.addEventListener("mouseout", () => {
    btn.style.backgroundColor = "#333";
  });

  // applying awesome styles to the footer
  footer.style.backgroundColor = "#333";
  footer.style.color = "#fff";
  footer.style.textAlign = "center";
  footer.style.padding = "1rem 0";
  footer.style.marginTop = "auto";
}

// Run the function when the DOM is loaded
