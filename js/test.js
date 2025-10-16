const button = document.getElementById('charMealButton');

// Example of a API fetch request if you need to add api key
async function fetchMeal() {
  const charIn = document.getElementById('charMeal').value;
  console.log(charIn);
  // Example of a fetch request using a api key, replace YOUR_API_KEY_HERE with your real api key
  let res = await fetch("https://api.exampczxcle.com/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer: YOUR_API_KEY_HERE"
    }
  })

  res = await res.json();
  res = await res.meals;
  console.log(res);
}

button.addEventListener('click', fetchMeal);

