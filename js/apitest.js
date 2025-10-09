
let result;

await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
  .then(res => res.json())
  .then(data => result = data);

result.meals.forEach(meal => console.log(meal.strMeal));
