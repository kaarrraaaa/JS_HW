export async function loadEpisodeDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const episodeId = urlParams.get("episode_id");

  const episodeIdToNumber = {
    1: 4,
    2: 5,
    3: 6,
    4: 1,
    5: 2,
    6: 3,
  };

  const episodeNumber = episodeIdToNumber[episodeId];

  const response = await fetch(`https://swapi.dev/api/films/${episodeNumber}/`);
  const episode = await response.json();

  const planetPromises = episode.planets.map(async (planetUrl) => {
    const response = await fetch(planetUrl);
    return await response.json();
  });

  const speciesPromises = episode.species.map(async (speciesUrl) => {
    const response = await fetch(speciesUrl);
    return await response.json();
  });

  const [planets, species] = await Promise.all([
    Promise.all(planetPromises),
    Promise.all(speciesPromises),
  ]);

  const episodeDetails = `
        <h1>${episode.title} (Episode ${episode.episode_id})</h1>
        <p>${episode.opening_crawl}</p>
        <h2>Planets</h2>
        <ul>
            ${planets.map((planet) => `<li>${planet.name}</li>`).join("")}
        </ul>
        <h2>Species</h2>
        <ul>
            ${species.map((specie) => `<li>${specie.name}</li>`).join("")}
        </ul>
    `;

  const detailsContainer = document.getElementById("episode-details");
  const episodeList = document.getElementById("episode-list");
  const headingContainer = document.getElementById("heading-container");

  detailsContainer.innerHTML = "";
  episodeList.innerHTML = "";
  headingContainer.innerHTML = "";

  const backButton = document.createElement("button");
  backButton.textContent = "Back to Home";
  backButton.addEventListener("click", () => {
    window.location.href = "/";
  });

  detailsContainer.innerHTML = episodeDetails;
  detailsContainer.appendChild(backButton);
}
