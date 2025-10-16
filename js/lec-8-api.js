async function fetchMeals(letter) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await res.json();
    return data.meals ?? null;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

const resultsEl = document.getElementById("results");
const searchBtn = document.getElementById("startAdv");

searchBtn.addEventListener("click", (e) => {
  const raw = document.getElementById("leftIn").value;
  const firstLetter = (raw || "").trim().charAt(0).toLowerCase();
  searchMeals(firstLetter);
});

async function searchMeals(letter) {
  resultsEl.innerHTML = `<p>Loading…</p>`;
  const meals = await fetchMeals(letter);
  renderMeals(meals);
}

function renderMeals(meals) {
  resultsEl.innerHTML = "";
  if (!meals || meals.length === 0) {
    resultsEl.innerHTML = `<p>No meals found.</p>`;
    return;
  }

  const frag = document.createDocumentFragment();

  meals.forEach((m) => {
    const card = document.createElement("article");
    card.className = "meal-card";
    card.innerHTML = `
      <img src="${m.strMealThumb}" alt="${escapeHtml(m.strMeal)}" loading="lazy">
      <div class="meal-body">
        <h3>${escapeHtml(m.strMeal)}</h3>
        <p>${escapeHtml(m.strArea || "Unknown area")} • ${escapeHtml(m.strCategory || "Uncategorized")}</p>
        <details>
          <summary>Ingredients</summary>
          <ul class="ingredients">
            ${ingredientsList(m)}
          </ul>
        </details>
        ${m.strYoutube ? `<a href="${m.strYoutube}" target="_blank" rel="noopener">YouTube</a>` : ""}
      </div>
    `;
    frag.appendChild(card);
  });

  resultsEl.appendChild(frag);
}

function ingredientsList(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      const text = [mea && mea.trim(), ing.trim()].filter(Boolean).join(" ");
      items.push(`<li>${escapeHtml(text)}</li>`);
    }
  }
  return items.join("");
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
