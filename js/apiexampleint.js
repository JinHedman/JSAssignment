document.getElementById("searchBtn").addEventListener("click", searchMeal);

// Also trigger search when pressing Enter
document.getElementById("mealInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMeal();
  }
});

// Add filter event listener
document.getElementById("categoryFilter").addEventListener("change", filterByCategory);

function renderMeals(meals) {
  const resultDiv = document.getElementById("mealResult");
  
  if (meals) {
    resultDiv.innerHTML = `
      <h2>Found ${meals.length} meal(s):</h2>
      <div class="meals-container">
        ${meals.map(meal => `
          <div class="meal-card" onclick="showMealDetails('${meal.idMeal}')">
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Click for details</strong></p>
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

// Store meals data for modal access and filtering
let currentMeals = [];
let allMeals = [];

function renderMeals(meals, filtered = false) {
  const resultDiv = document.getElementById("mealResult");
  currentMeals = meals; // Store meals for modal access
  
  if (!filtered) {
    allMeals = meals; // Store all meals for filtering
    populateCategoryFilter(meals);
  }
  
  if (meals && meals.length > 0) {
    const countText = filtered ? `${meals.length} of ${allMeals.length} meal(s)` : `${meals.length} meal(s)`;
    resultDiv.innerHTML = `
      <h2>Found ${countText}:</h2>
      <div class="meals-container">
        ${meals.map(meal => `
          <div class="meal-card" onclick="showMealDetails('${meal.idMeal}')">
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Area:</strong> ${meal.strArea}</p>
            <p><strong>Click for details</strong></p>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    resultDiv.innerHTML = "<p>No meals found. Try another name!</p>";
  }
}

function populateCategoryFilter(meals) {
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Get unique categories
  const categories = [...new Set(meals.map(meal => meal.strCategory))].sort();
  
  // Clear existing options (except "All Categories")
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  
  // Add category options
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterByCategory() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  
  if (!selectedCategory) {
    // Show all meals
    renderMeals(allMeals, true);
  } else {
    // Filter meals by category
    const filteredMeals = allMeals.filter(meal => meal.strCategory === selectedCategory);
    renderMeals(filteredMeals, true);
  }
}

function showMealDetails(mealId) {
  const meal = currentMeals.find(m => m.idMeal === mealId);
  if (!meal) return;

  const modal = document.getElementById("mealModal");
  const modalContent = document.getElementById("modalContent");
  
  // Get ingredients list
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  // Create YouTube embed URL
  let youtubeEmbed = '';
  if (meal.strYoutube) {
    const videoId = meal.strYoutube.split('v=')[1];
    if (videoId) {
      youtubeEmbed = `
        <div class="youtube-section">
          <h3>Video Tutorial</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
        </div>
      `;
    }
  }

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${meal.strMeal}</h2>
      <p><strong>${meal.strCategory}</strong> • ${meal.strArea}</p>
    </div>
    <div class="modal-body">
      <div class="modal-image">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      </div>
      <div class="modal-content">
        <div class="ingredients-section">
          <h3>Ingredients</h3>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
        <div class="instructions-section">
          <h3>Instructions</h3>
          <p>${meal.strInstructions.replace(/\r\n/g, '<br>')}</p>
        </div>
        ${youtubeEmbed}
      </div>
    </div>
  `;
  
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("mealModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("mealModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
