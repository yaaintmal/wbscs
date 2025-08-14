let start = 0;

// user info variables
let title = "Full Stack Developer";

let username = "Mal Alatete";
let email = "lM5Y0@example.com";
let phone = "+237 696 696 696";
let introduction =
  "An enthusiastic and driven professional with a 20-year background in sales, project management, and technical documentation, transitioning into full-stack web and app development. Leveraging a unique blend of experience in B2B and B2C environments, including technical project work in fiber optic infrastructure, I am adept at problem-solving, client communication, and managing complex projects from conception to completion. I am now applying these skills to build dynamic and user-centric applications using modern web technologies. I am a quick and dedicated learner, eager to contribute to a collaborative development team.";

// not defined yet
let summary = title;

// document infos
let document_title = `Resumee of ${username}`;

let contactbox = `
    <ul>
        <li><a href="mailto:${email}">Mail Contact</a></li>
        <li><a href="tel:${phone}">Phone Contact</a></li>
    </ul>
`;

let skill_interests = `
    <h2>Skills and Interests</h2>
    <ul>
        <li>Sports</li>
        <li>Technics</li>
        <li>Music</li>
    </ul>
`;

let exp = `
    <h2>Experience</h2>
    <ul>
        <li>Planung und Erstellung von LWL-Verbindungen im Glasfasernetz, Antragserstellung, Implementation einer teil-automatisierten Antragsverarbeitung<h3>Planer/ Monteur Glasfaser</h3><p>2024 - 2024: Stadtwerke Soest - SOEST</p></li>    
        <li>Gewinnung des Großkunden AKOM im nahgelegenen Ausland, Anpassung Frachtlogik und Implementation eines neuen Frachtrechners, Koordinierung interner Ressourcen<h3>Key Account Manager DE/ INT</h3><p>2021 - 2024: STUTE Nahrungsmittelwerke - PADERBORN</p></li>
        <li>Erstellung von Prüfdokumentation zur Rezertifizierung bei benannten Stellen, Erstellung von Testreporten für Betriebsmittel nach normatier Vorgabe im Bereich ATEX/ IECEX<h3>Sachverständiger ATEX/ IECEC</h3><p>2021 - 2016: Sachverständigenbüro Uphagen - MEPPEN</p></li>
    </ul>
`;

let edu = `
    <h2>Education</h2>
    <ul>
        <li>Planung und Erstellung von LWL-Verbindungen im Glasfasernetz, Antragserstellung, Implementation einer teil-automatisierten Antragsverarbeitung<h3>Planer/ Monteur Glasfaser</h3><p>2024 - 2024: Stadtwerke Soest - SOEST</p></li>    
        <li>Gewinnung des Großkunden AKOM im nahgelegenen Ausland, Anpassung Frachtlogik und Implementation eines neuen Frachtrechners, Koordinierung interner Ressourcen<h3>Key Account Manager DE/ INT</h3><p>2021 - 2024: STUTE Nahrungsmittelwerke - PADERBORN</p></li>
        <li>Erstellung von Prüfdokumentation zur Rezertifizierung bei benannten Stellen, Erstellung von Testreporten für Betriebsmittel nach normatier Vorgabe im Bereich ATEX/ IECEX<h3>Sachverständiger ATEX/ IECEC</h3><p>2021 - 2016: Sachverständigenbüro Uphagen - MEPPEN</p></li>
    </ul>
`;

const titleEl = document.getElementById("document_title");
titleEl.innerText = document_title;

// constructing resume like it was asked in chapter 2
let resume = `
    <img src="./user_img.jpg" alt="profile picture" width="300" height="300">
    <h1>${username}</h1>
    ${contactbox}
    <h2>${summary}</h2><p>${introduction}</p>
    ${exp}
    ${edu}
    ${skill_interests}
`;

const resumeEl = document.getElementById("resume");
resumeEl.innerHTML = resume;
