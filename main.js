const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = "";
const APP_ID = '0283c2d6';
const APP_key = 'f5c8bd95dd28d20ce9d8c97185c42314';



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();

  });

  async function fetchAPI (){
   const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=0283c2d6&app_key=f5c8bd95dd28d20ce9d8c97185c42314%09`;
   const response = await fetch(baseURL);
   const data = await response.json();
   generateHTML(data.hits);
   console.log(data);

  }
  function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
      generatedHTML +=
      `<div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-button" href="${result.recipe.url}" target "_blank">View recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
                </div>`


    })
    searchResultDiv.innerHTML = generatedHTML;
  }
 document.querySelector('.search-button').addEventListener('click', function() {
    document.querySelector('.search-result').focus();
});
