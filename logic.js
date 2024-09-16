
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
    console.log(data); // This will log the parsed JSON data
    return data; // Optionally return the data if you need to use it outside the function
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

// fuction to generate meal cards
 const generateCards = ()=>{
  let cardGrid = document.querySelector(".card-grid");
    cardGrid.innerHTML =  `
    <div class="card">
             <div class="card-image"></div>
             <img src="" alt="">
             <div class="card-desc">
                 <h2>name</h2>
                 <p>dish desc</p>
                 <p>category</p>
             </div>
             <button>view more</button>
         </div>
 `
  return cardGrid;
}
 generateCards();



 

