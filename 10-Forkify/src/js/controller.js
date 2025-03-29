/**
 * NEW API URL (instead of the one shown in the video)
 * https://forkify-api.jonas.io
 * 
 * GET recipes use this URL: "https://forkify-api.jonas.io/api/v2/recipes?search=pizza&key=110b1011-4549-4373-98fb-c879a02b2a79"
 * GET a recipe: 'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886'
 * 
 */
//! ALL IMPORTS HERE:
import * as model from './model.js' 
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

import 'core-js/stable'   // polyfilling everything else!
import 'regenerator-runtime/runtime'    // polyfilling async/await!

//! ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// if(module.hot){
//   module.hot.accept()
// }

const controlRecipes = async function() {
  
  try {
    //! 3.o getting id from window.location
    const id = window.location.hash.slice(1)
    
    //! 3.o.1 what if there is no id after '#' (basically it is "Home" page)
    if(!id) return 

    //! 2.o loading spinner
    recipeView.renderSpinner()
    
    //! 1.1 using "loadRecipe" function that was imported from 'model.js' 
    // - as this "loadRecipe" function is "asynchronous" and it returns a "promise": has to be handled with "await"
    await model.loadRecipe(id)
    
    // - "loadRecipe" does not return a value but we get access to "state.recipe" that lies inside 'model.js'
    // const recipe = model.state.recipe
    
    //! 2. Rendering The Recipe
    recipeView.render(model.state.recipe)
  }
  catch(err) {
    recipeView.renderError()
  }
}

const controlSearch = async function() {
  try{
    resultsView.renderSpinner()
    
    // 1. get search query
    const searchQuery = searchView.getQuery()
    if(!searchQuery) return;
    
    // 2. load search results
    await model.loadSearchResults(searchQuery)

    // 3. render results
    // resultsView.render(model.state.searchResults.results)
    resultsView.render(model.getSearchResultsPage())

    // 4. render initial pagination
    paginationView.render(model.state.searchResults)
  }
  catch(err){
    console.error(err)
  }
}

const controlPages = function(goToPage) {
  // 1. render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage))

  // 2. render NEW pagination btns
  paginationView.render(model.state.searchResults)
}

//! 3. listening to the 'haschange' event
//! 3.1 what if we copied the link and pasted in another tab, that is a 'load' event (to listen load event)
const init = function() {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearch)
  paginationView.addHandlerPagination(controlPages)
}
init()