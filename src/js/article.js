function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let inList = false;
  let inOrderedList = false;

  function closeLists() {
    if (inList) {
      output.push("</ul>");
      inList = false;
    }

    if (inOrderedList) {
      output.push("</ol>");
      inOrderedList = false;
    }
  }

  lines.forEach((line) => {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    const unorderedListMatch = line.match(/^\s*[-*]\s+(.+)$/);
    const orderedListMatch = line.match(/^\s*\d+\.\s+(.+)$/);

    if (headingMatch) {
      closeLists();
      const level = headingMatch[1].length;
      output.push(`<h${level}>${escapeHtml(headingMatch[2])}</h${level}>`);
      return;
    }

    if (unorderedListMatch) {
      if (!inList) {
        closeLists();
        output.push("<ul>");
        inList = true;
      }

      output.push(`<li>${escapeHtml(unorderedListMatch[1])}</li>`);
      return;
    }

    if (orderedListMatch) {
      if (!inOrderedList) {
        closeLists();
        output.push("<ol>");
        inOrderedList = true;
      }

      output.push(`<li>${escapeHtml(orderedListMatch[1])}</li>`);
      return;
    }

    if (line.trim() === "") {
      closeLists();
      return;
    }

    closeLists();
    output.push(`<p>${escapeHtml(line)}</p>`);
  });

  closeLists();
  return output.join("\n");
}

function getArticleId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadArticle() {
  const contentEl = document.getElementById("article-content");
  const statusEl = document.getElementById("article-status");

  if (!contentEl || !statusEl) {
    return;
  }

  const articleId = getArticleId();
  if (!articleId) {
    statusEl.textContent = "No article selected.";
    contentEl.innerHTML = '<p class="empty-state">Please return to the articles page.</p>';
    return;
  }

  try {
    const indexResponse = await fetch("content/articles/index.json");
    if (!indexResponse.ok) {
      throw new Error(`Failed to load article index (${indexResponse.status})`);
    }

    const articleIndex = await indexResponse.json();
    const article = articleIndex.find((item) => item.id === articleId);

    if (!article) {
      statusEl.textContent = "Article not found.";
      contentEl.innerHTML = '<p class="empty-state">The requested article does not exist.</p>';
      return;
    }

    const articleResponse = await fetch(`content/articles/${article.file}`);
    if (!articleResponse.ok) {
      throw new Error(`Failed to load article file (${articleResponse.status})`);
    }

    const markdown = await articleResponse.text();
    document.title = `${article.title} | Energise Nutrition`;
    statusEl.textContent = `${article.title} • ${article.date}`;
    contentEl.innerHTML = markdownToHtml(markdown);
  } catch (error) {
    statusEl.textContent = "Could not load article.";
    contentEl.innerHTML =
      '<p class="empty-state">Something went wrong loading this article.</p>';
    console.error(error);
  }
}

loadArticle();
