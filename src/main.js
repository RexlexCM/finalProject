// Where fetching API functions works

function searchButton() {
    var foodItem = document.getElementById("foodInput").value;
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`)
      .then((response) => response.json())
      .then((data) => {
            console.log(data)
            
        const recipeList = document.getElementById("recipeList");
        recipeList.innerHTML = '';
        
        // Allow the user to click on the list provided
        if (data.meals) {
          data.meals.forEach((meal) => {
            const listItem = document.createElement("li");
            listItem.textContent = meal.strMeal;
            listItem.addEventListener("click", () => displayRecipeDetails(meal));
            recipeList.appendChild(listItem);
          });
        } else {
          recipeList.innerHTML = "No recipes found.";
        }
      });
  }
  
  // Display the recipe details here
  function displayRecipeDetails(recipe) {
    document.getElementById("recipeName").textContent = recipe.strMeal;
  
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    document.getElementById("recipeIngredients").textContent = `Ingredients: ${ingredients.join(', ')}`;

    const recipeImage = document.getElementById("recipeImage");
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = `${recipe.strMeal} Image`;
  
    const instructionsWithLineBreaks = recipe.strInstructions.replace(/\n/g, '<br><br>');
    document.getElementById("recipeInstructions").innerHTML = `Instructions: ${instructionsWithLineBreaks}`;
  
    const recipeURL = recipe.strSource;
    const recipeURLAnchor = document.getElementById("recipeURL");
    recipeURLAnchor.textContent = "Recipe URL";
    recipeURLAnchor.href = recipeURL;
  
    // Check if there's an existing YouTube link, and remove it if it exists
    const existingYoutubeLink = document.getElementById("youtubeLink");
    if (existingYoutubeLink) {
      existingYoutubeLink.remove();
    }
  
    const youtubeURL = recipe.strYoutube;
    if (youtubeURL) {
      const youtubeURLAnchor = document.createElement("a");
      youtubeURLAnchor.id = "youtubeLink";
      youtubeURLAnchor.textContent = "YouTube Link";
      youtubeURLAnchor.href = youtubeURL;
      youtubeURLAnchor.target = "_blank";
      document.getElementById("recipeDetails").appendChild(youtubeURLAnchor);
    }
  
    document.getElementById("recipeDetails").style.display = "block";
  }