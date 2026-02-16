//You can edit ALL of the code here
function setup() {
  const root = document.getElementById("root");

  const allEpisodes = getAllEpisodes();
  

  allEpisodes.forEach((ep) => {
    const season = String(ep.season).padStart(2, "0");
    const number = String(ep.number).padStart(2, "0");
    const episodeCode = `S${season}E${number}`;

    const episodeDiv = document.createElement("div");
    episodeDiv.className = "episode";

    const imageUrl = ep.image ? ep.image.medium : "";

    episodeDiv.innerHTML = `
      <h2>${ep.name}</h2>
      <p><strong>${episodeCode}</strong></p>
      <img src="${imageUrl}" alt="${ep.name}">
      <p>${ep.summary || "No summary available."}</p>
    `;

    root.appendChild(episodeDiv);
  });

  // TVMaze credit (required for Level 100)
  const credit = document.createElement("p");
  credit.innerHTML = `
    Data originally from 
    <a href="https://tvmaze.com/" target="_blank">TVMaze.com</a>
  `;
  root.appendChild(credit);
}

window.onload = setup;
