// You can edit ALL of the code here

const shows = [
  { id: 82, name: "Game of Thrones" },
  { id: 431, name: "Friends" },
  { id: 169, name: "Breaking Bad" }
];

let allEpisodes = []; 

function setup() {
  createShowSelector();
  createSearchBar();
  loadShowEpisodes(shows[0].id); 
}


// Show Selector Dropdown
function createShowSelector() {
  const rootElem = document.getElementById("root");

  const select = document.createElement("select");
  select.id = "show-selector";
  select.style.marginBottom = "10px";
  select.style.padding = "5px";
  select.style.fontSize = "16px";

  shows.forEach(show => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    select.appendChild(option);
  });

  rootElem.appendChild(select);

  select.addEventListener("change", e => {
    const showId = parseInt(e.target.value);
    loadShowEpisodes(showId);
  });
}


// Search Input
function createSearchBar() {
  const rootElem = document.getElementById("root");

  const input = document.createElement("input");
  input.id = "search-input";
  input.type = "text";
  input.placeholder = "Search episodes by name or code...";
  input.style.margin = "10px 0 20px";
  input.style.padding = "5px";
  input.style.width = "100%";
  input.style.fontSize = "16px";

  rootElem.appendChild(input);

  input.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    const filtered = allEpisodes.filter(ep => {
      const code = getEpisodeCode(ep.season, ep.number).toLowerCase();
      return ep.name.toLowerCase().includes(query) || code.includes(query);
    });
    makePageForEpisodes(filtered);
  });
}


// Load Episodes from API
function loadShowEpisodes(showId) {
  const rootElem = document.getElementById("root");

  // Keep dropdown and search input
  const dropdown = document.getElementById("show-selector");
  const searchInput = document.getElementById("search-input");

  rootElem.innerHTML = ""; 
  rootElem.appendChild(dropdown);
  rootElem.appendChild(searchInput);

  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(res => res.json())
    .then(episodes => {
      allEpisodes = episodes; 
      makePageForEpisodes(episodes);
    })
    .catch(err => {
      rootElem.innerHTML += `<p>Failed to load episodes for this show.</p>`;
      console.error(err);
    });
}

// Helper: Format Episode Code
function getEpisodeCode(season, number) {
  const s = String(season).padStart(2, "0");
  const e = String(number).padStart(2, "0");
  return `S${s}E${e}`;
}


// Render Episodes
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // Remove all episode cards except dropdown & search
  const dropdown = document.getElementById("show-selector");
  const searchInput = document.getElementById("search-input");
  rootElem.innerHTML = "";
  rootElem.appendChild(dropdown);
  rootElem.appendChild(searchInput);

  episodeList.forEach(episode => {
    const episodeDiv = document.createElement("div");
    episodeDiv.className = "episode";

    const code = getEpisodeCode(episode.season, episode.number);

    episodeDiv.innerHTML = `
      <h2>${code} - ${episode.name}</h2>
      <p>Season ${episode.season}, Episode ${episode.number}</p>
      ${
        episode.image
          ? `<img src="${episode.image.medium}" alt="${episode.name}">`
          : ""
      }
      <div class="summary">
        ${episode.summary || "No summary available."}
      </div>
    `;

    rootElem.appendChild(episodeDiv);
  });

  // TVMaze attribution
  const attribution = document.createElement("footer");
  attribution.innerHTML = `
    <p>
      Data originally from
      <a href="https://www.tvmaze.com" target="_blank">TVMaze.com</a>
    </p>
  `;
  rootElem.appendChild(attribution);
}


window.onload = setup;
