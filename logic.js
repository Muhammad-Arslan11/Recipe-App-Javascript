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
   
    // hide overflow of cardGrid
//  cardGrid.style.overflow = "hidden";
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

        // here is the appropriate place to add hide instructions logic
              // get instructions bar
              const instructions = document.getElementById('instructions'); 
             // remove instructions bar if search is valid
             instructions.style.visibility = 'hidden';

        button.addEventListener("click", () => {
          showPopUp(meal);
        });

        
        cardGrid.appendChild(card);
        showArea.appendChild(cardGrid);

        // if(cardGrid){
        //   cardGrid.classList.add("glass-effect"); // add some styles
        //   // cardGrid.style.overflow = "visible";
        //   }
        
      });
    }
    
    else {
      instructions.textContent = "No meals found. Try another search.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    instructions.innerHTML = "An error occurred. Please try again later.";
  }
};

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let query = searchInput.value.trim();
  if (query) {
    fetchData(query);
  } else {
    instructions.innerHTML = "Please enter a search term.";
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
   <button class="recipe-box-btn"><i class="fa-sharp fa-solid fa-xmark"></i></button>
    <div class="ingredients-container">
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul>
      <li>${fetchIngredients(meal)}</li>
    </ul>
    </div>
   
  `;
 
      //  WARNING: this is won't work!!!!
      //  const recipeBoxBtn = document.querySelector(".recipe-box-btn");
      //  recipeBoxBtn.addEventListener("click", ()=>{
      //   removeRecipeBox(recipeBox);
      //  });
      //NOTE: Here, the recipeBoxBtn won't work because the element on which the listener is attached to has yet to
      // be injected or appended into the parent element. The child element has been appended at line 109. 
   
 

  const existingPopup = document.querySelector(".recipe-box");
  if (existingPopup) {
    existingPopup.remove();
  }

  showArea.appendChild(recipeBox);

    // this is not working!!!!
    const recipeBoxBtn = document.querySelector(".recipe-box-btn");
    recipeBoxBtn.addEventListener("click", ()=>{
      if(recipeBox){
        recipeBox.remove();
      }
    });
 
};

