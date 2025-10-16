document.getElementById("searchBtn").addEventListener("click", searchMeal);

// Also trigger search when pressing Enter
document.getElementById("mealInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMeal();
  }
});

function searchMeal() {
  const mealName = document.getElementById("mealInput").value.trim();
  const resultDiv = document.getElementById("mealResult");

  if (!mealName) {
    resultDiv.innerHTML = "<p>Please enter a meal name.</p>";
    return;
  }
  // fetch request with a render
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        const meal = data.meals[0];
        resultDiv.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
        `;
      } else {
        resultDiv.innerHTML = "<p>No meals found. Try another name!</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching meal:", error);
      resultDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
    });
}
