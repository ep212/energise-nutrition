function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function buildSearchText(article) {
  const tags = Array.isArray(article.tags) ? article.tags.join(" ") : "";
  return `${article.title} ${article.summary} ${tags}`.toLowerCase();
}

function renderArticles(listEl, countEl, articles, query) {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? articles.filter((article) => buildSearchText(article).includes(normalizedQuery))
    : articles;

  countEl.textContent = `${filtered.length} article${filtered.length === 1 ? "" : "s"} found`;

  if (filtered.length === 0) {
    listEl.innerHTML = '<p class="empty-state">No articles matched your search.</p>';
    return;
  }

  listEl.innerHTML = filtered
    .map((article) => {
      const tags = (article.tags || [])
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");

      return `
        <article class="card article-card">
          <p class="article-meta">${formatDate(article.date)}</p>
          <h2 class="article-title">
            <a href="article.html?id=${encodeURIComponent(article.id)}">${article.title}</a>
          </h2>
          <p>${article.summary}</p>
          <div class="tag-row">${tags}</div>
        </article>
      `;
    })
    .join("");
}

async function loadArticles() {
  const listEl = document.getElementById("article-list");
  const countEl = document.getElementById("article-count");
  const searchInput = document.getElementById("article-search");

  if (!listEl || !countEl || !searchInput) {
    return;
  }

  try {
    const response = await fetch("content/articles/index.json");
    if (!response.ok) {
      throw new Error(`Failed to load articles (${response.status})`);
    }

    const articles = await response.json();
    renderArticles(listEl, countEl, articles, "");

    searchInput.addEventListener("input", (event) => {
      renderArticles(listEl, countEl, articles, event.target.value);
    });
  } catch (error) {
    listEl.innerHTML =
      '<p class="empty-state">Articles could not be loaded. Please try again later.</p>';
    countEl.textContent = "";
    console.error(error);
  }
}

loadArticles();
