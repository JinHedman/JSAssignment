
let result;

await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
  .then(res => res.json())
  .then(data => result = data);

result.meals.forEach(meal => console.log(meal.strMeal));


let postString = "Hello Class!";
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(postString)
})
  .then(response => response.json())
  .then(data => console.log(data));
