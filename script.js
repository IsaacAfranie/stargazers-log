const repositoryList = document.querySelector("#repository-list");
const listStatus = document.querySelector("#list-status");
const repositoryCount = document.querySelector("#repository-count");

function formatStars(stars) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(stars);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository-card";
    item.innerHTML = `
      <a href="${repository.url}" target="_blank" rel="noreferrer">
        <div class="repository-name">${repository.owner} / ${repository.name}</div>
      </a>
      <p class="repository-description">${repository.description}</p>
      <div class="repository-meta">
        <span class="repository-language">${repository.language}</span>
        <span>${formatStars(repository.stars)} stars</span>
        <span>Starred ${formatDate(repository.starredAt)}</span>
      </div>
    `;
    repositoryList.append(item);
  });

  repositoryCount.textContent = `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"}`;
  listStatus.hidden = true;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    listStatus.textContent = "The repository list could not be loaded. Please try again later.";
    console.error(error);
  }
}

loadRepositories();