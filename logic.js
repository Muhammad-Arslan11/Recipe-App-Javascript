const searchbtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search");
const showArea = document.querySelector(".show-area");
const cardGrid = document.querySelector(".card-grid");

const fetchData = async (query) => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  try {
    let response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();

    cardGrid.innerHTML = "";

    if (data.meals && data.meals.length > 0) {
      data.meals.forEach((meal) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="card-image">
            <img src="${meal.strMealThumb}" height="265" width="271" alt="${meal.strMeal}">
          </div>
          <div class="card-desc">
            <h3>${meal.strMeal}</h3>
            <p class="text">${meal.strArea}</p>
            <p class="text">${meal.strCategory}</p>
          </div>
        `;

        const button = document.createElement("button");
        button.classList.add("view-more-btn");
        button.textContent = "View Recipe";
        card.appendChild(button);

        button.addEventListener("click", () => {
          showPopUp(meal);
        });

        cardGrid.appendChild(card);
      });
    } else {
      cardGrid.innerHTML = "<p>No meals found. Try another search.</p>";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    cardGrid.innerHTML = "<p>An error occurred. Please try again later.</p>";
  }
};

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let query = searchInput.value.trim();
  if (query) {
    fetchData(query);
  } else {
    cardGrid.innerHTML = "<p>Please enter a search term.</p>";
  }
});

const fetchIngredients = (meal) => {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  return ingredients.join("<li>");
};

const showPopUp = (meal) => {
  const recipeBox = document.createElement("div");
  recipeBox.classList.add("recipe-box");
  recipeBox.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul>
      <li>${fetchIngredients(meal)}</li>
    </ul>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
  `;

  const existingPopup = document.querySelector(".recipe-box");
  if (existingPopup) {
    existingPopup.remove();
  }

  showArea.appendChild(recipeBox);
};
