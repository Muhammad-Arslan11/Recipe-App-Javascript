
 const searchbtn = document.querySelector('.btn');
 const searchInput = document.querySelector('#search');
 const showArea  = document.querySelector(".show-area");
 const cardGrid = document.querySelector(".card-grid");



       // fetch data
 const fetchData = async (query) => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try {
    let response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    // console.log(data.meals); // This will log the parsed JSON data
 

   

    // run a foreach loop on response
     data.meals.forEach(meal => {
      // console.log(meal[0]);

      const card = document.createElement('div');
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


   
 //  --------------------- this line causes trouble ---------------------------------------------------------------
// cardGrid.appendChild(card); // append card in cardGrid
//  --------------------- this line causes trouble ---------------------------------------------------------------




 // create and add eventlistener to "View Recipe" button
  const button = document.createElement("button");
   button.classList.add("view-more-btn");
   button.textContent = "View Recipe";
   card.appendChild(button); // append the button inside card

   // event listener for "View Recipe" button
    const viewMoreBtn = document.querySelector(".view-more-btn");
    // console.log(viewMoreBtn);
    viewMoreBtn.addEventListener("click", (meal)=>{
    //  console.log("click happened")
      showPopUp(meal);
    });

    cardGrid.appendChild(card); // NOTE: because of appending at the end of loop, 'viewMoreBtn' eventlistener is not able to
     // find the button. It does'nt exitst untill this line. 

     });

  } catch (error) {
    console.error('Fetch error:', error);
    // Handle the error appropriately, such as showing an error message to the user
  }

};




searchbtn.addEventListener("click", (e)=>{
  // console.log("clicked")
   e.preventDefault();
   let query = searchInput.value.trim();
   fetchData(query);
} );


 const fetchIngridients = (meal) =>{
  console.log(meal)
 }

// function showPopUp
 const showPopUp = (meal) =>{

 // create recipe box
  const recipeBox = document.createElement('div');
  recipeBox.classList.add('recipe-box');
   
    recipeBox.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingridients:</h3>
            <ul>
                 <li>${fetchIngridients(meal)}</li>
               
            </ul>
    `;
    cardGrid.appendChild(recipeBox);
    const card = document.querySelector('.card');
    card.style.display = "block";
  
 }





 

