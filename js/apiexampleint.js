document.getElementById("searchBtn").addEventListener("click", searchMeal);

// Also trigger search when pressing Enter
document.getElementById("mealInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMeal();
  }
});

function renderMeals(meals) {
  const resultDiv = document.getElementById("mealResult");
  
  if (meals) {
    resultDiv.innerHTML = `
      <h2>Found ${meals.length} meal(s):</h2>
      <div class="meals-container">
        ${meals.map(meal => `
          <div class="meal-card">
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    resultDiv.innerHTML = "<p>No meals found. Try another name!</p>";
  }
}

function searchMeal() {
  const mealName = document.getElementById("mealInput").value.trim();
  const resultDiv = document.getElementById("mealResult");

  if (!mealName) {
    resultDiv.innerHTML = "<p>Please enter a meal name.</p>";
    return;
  }
  
  // fetch request
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => renderMeals(data.meals))
    .catch(error => {
      console.error("Error fetching meal:", error);
      resultDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
    });
}
