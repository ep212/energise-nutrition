# Energise Nutrition

Starter framework for a nutrition and health website built with plain HTML, CSS, and JavaScript.

## Project Structure

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
└── README.md
```

## What's Included

- Responsive page layout with semantic sections
- Accessible header navigation with mobile menu toggle
- Reusable CSS design tokens (colors, spacing, shadows, radius)
- Scroll reveal animation using `IntersectionObserver`
- Small JavaScript utility example: daily water intake estimator

## Run Locally

Because this is a static site, you can run it with any local server.

Option 1 (Python):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Option 2:

- Open `index.html` directly in your browser
- Or use the VS Code Live Server extension

## Next Steps

- Add pages: `about.html`, `blog.html`, `recipes.html`
- Connect forms to a backend API
- Add a content model for articles, recipes, and meal plans


