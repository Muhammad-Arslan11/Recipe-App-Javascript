
 const searchbtn = document.querySelector('.btn');
 const searchInput = document.querySelector('#search');
 



 const fetchData = async (query) => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try {
    let response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    console.log(data.meals); // This will log the parsed JSON data
 

    let cardGrid = document.querySelector(".card-grid");

    // run a foreach loop on response
     data.meals.forEach(meal => {
      console.log(meal[0]);
      // create a div
      const card = document.createElement('div');
    card.classList.add('card');
     
    
    card.innerHTML = `
    <div class="card-image">
        <img src="${meal.strMealThumb}" height="265" width="271" alt="${meal.strMeal}">
    </div>
    <div class="card-desc">
        <h3>${meal.strMeal}</h3>
        <p class="text">${meal.strArea}</p>
        <p class="text">${meal.strCategory}</p>
    </div>
    <button class="btn">view more</button>
`;
   cardGrid.appendChild(card);
     });

  } catch (error) {
    console.error('Fetch error:', error);
    // Handle the error appropriately, such as showing an error message to the user
  }


 
 

  

  
};


searchbtn.addEventListener("click", (e)=>{
  console.log("clicked")
   e.preventDefault();
   let query = searchInput.value.trim();
   fetchData(query);
} );





 

