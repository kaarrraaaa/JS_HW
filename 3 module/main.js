import { loadEpisodeDetails } from "./episode.js";

async function loadEpisodes() {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  const episodes = data.results;
  const episodeList = document.getElementById("episode-list");

  episodeList.innerHTML = "";

  episodes.forEach((episode) => {
    const episodeElement = document.createElement("a");
    episodeElement.href = `?episode_id=${episode.episode_id}`;
    episodeElement.textContent = `Episode ${episode.episode_id}: ${episode.title}`;
    episodeElement.addEventListener("click", handleEpisodeClick);
    episodeList.appendChild(episodeElement);
  });
}

function handleEpisodeClick(event) {
  event.preventDefault();
  const linkHref = event.target.getAttribute("href");
  window.history.pushState(null, "", linkHref);
  loadEpisodeDetails();
}

document.addEventListener("DOMContentLoaded", () => {
  loadEpisodes();
  window.addEventListener("popstate", loadEpisodeDetails);
});

document.addEventListener("click", handleEpisodeClick);
