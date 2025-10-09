const mealName = "a";

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}`)
  .then(response => response.json())
  .then(data => {
    if (data.meals) {
      console.log("Meal found:", data.meals);
    } else {
      console.log("No meals found!");
    }
  })
  .catch(error => console.error("Error:", error));
