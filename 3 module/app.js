const episodeList = document.getElementById('episode-list');
const episodeDetails = document.getElementById('episode-details');

function handleNavigation() {
    const url = window.location.pathname;

    if (url === '/') {
        loadEpisodes();
        episodeDetails.innerHTML = '';
    } else if (url.startsWith('/episode')) {
        const episodeId = new URLSearchParams(window.location.search).get('episode_id');
        loadEpisodeDetails(episodeId);
    }
}

window.addEventListener('popstate', handleNavigation);
window.addEventListener('load', handleNavigation);

async function loadEpisodes() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    let episodes = data.results;

    // Сортируем эпизоды по их номеру
    episodes.sort((a, b) => a.episode_id - b.episode_id);

    episodeList.innerHTML = ''; // Очищаем список перед добавлением новых элементов

    episodes.forEach(episode => {
        const episodeElement = document.createElement('a');
        episodeElement.href = `#/episode?episode_id=${episode.episode_id}`;
        episodeElement.textContent = `Episode ${episode.episode_id}: ${episode.title}`;
        episodeElement.addEventListener('click', (event) => {
            event.preventDefault();
            history.pushState(null, '', event.currentTarget.href);
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
        episodeList.appendChild(episodeElement);
    });
}

async function loadEpisodeDetails(episodeId) {
    const response = await fetch(`https://swapi.dev/api/films/${episodeId}/`);
    const episode = await response.json();

    const planetPromises = episode.planets
        ? episode.planets.map(async planetUrl => {
              const response = await fetch(planetUrl);
              return await response.json();
          })
        : [];

    const speciesPromises = episode.species
        ? episode.species.map(async speciesUrl => {
              const response = await fetch(speciesUrl);
              return await response.json();
          })
        : [];

    const [planets, species] = await Promise.all([
        Promise.all(planetPromises),
        Promise.all(speciesPromises)
    ]);

    const episodeDetailsHTML = `
        <h1>${episode.title} (Episode ${episode.episode_id})</h1>
        <p>${episode.opening_crawl}</p>
        <h2>Planets</h2>
        <ul>
            ${planets.map(planet => `<li>${planet.name}</li>`).join('')}
        </ul>
        <h2>Species</h2>
        <ul>
            ${species.map(specie => `<li>${specie.name}</li>`).join('')}
        </ul>
    `;

    episodeDetails.innerHTML = episodeDetailsHTML;
}

const stylePromises = ['style.css'].map(style => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.href = style;
        link.rel = 'stylesheet';
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
});
Promise.all(stylePromises);

handleNavigation();
