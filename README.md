# Energise Nutrition

Starter framework for a nutrition and health website built with plain HTML, CSS, and JavaScript.

## Project Structure

```text
.
├── public/
│   ├── index.html
│   ├── articles.html
│   ├── article.html
│   └── content/
│       └── articles/
│           ├── index.json
│           └── *.md
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── articles.js
│       └── article.js
└── README.md
```

## What's Included

- Responsive page layout with semantic sections
- Accessible header navigation with mobile menu toggle
- Reusable CSS design tokens (colors, spacing, shadows, radius)
- Scroll reveal animation using `IntersectionObserver`
- Small JavaScript utility example: daily water intake estimator
- Dedicated Articles page with search
- Article content stored in separate Markdown files

## Run Locally

Because this is a static site, you can run it with any local server.

Option 1 (Python):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/public/`.

Option 2:

- Open `public/index.html` directly in your browser
- Or use the VS Code Live Server extension

## Next Steps

- Add pages: `about.html`, `blog.html`, `recipes.html`
- Connect forms to a backend API
- Add a content model for articles, recipes, and meal plans

## Adding A New Article

1. Create a new Markdown file in `public/content/articles/`.
2. Add an entry to `public/content/articles/index.json` with these fields:
	- `id` (unique slug, used in URL)
	- `title`
	- `summary`
	- `tags` (array of keywords)
	- `date` (YYYY-MM-DD)
	- `file` (Markdown filename)
3. Open `http://localhost:8000/public/articles.html` and verify it appears.

Search on the Articles page matches title, summary, and tags from `index.json`.


