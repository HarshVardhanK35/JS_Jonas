/**
 * - here "state.recipe" is manipulated here!
 * - "loadRecipe" is not a pure function hence it has the side effects of manipulating the "state.recipe" that is outside of it
 *      and there are many ways to avoid this side-effects
 * 
 * 
 * 
 */
import { async } from "regenerator-runtime"
import { API_URL, RES_PER_PAGE } from "./config.js"
import { getJSON } from "./helpers"

//! state of the recipe-container
const state = {
    recipe: {},
    searchResults: {
        query: '',
        results: [],
        page: 1,
        resPerPage: RES_PER_PAGE
    }
}
//! to load the recipe
const loadRecipe = async function(id) {
    try{
        //! 1. Loading Recipe From API
        const data = await getJSON(`${API_URL}${id}`)
        const { recipe } = data.data

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        // console.log(state.recipe)
    }
    catch(err) {
        throw err
    }
}
//! for search results
const loadSearchResults = async function(query) {
    try{
        state.searchResults.query = query
        const data = await getJSON(`${API_URL}?search=${query}`)

        state.searchResults.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        })
    }
    catch(err) {
        throw err
    }
}
//! pagination implementation starts...
const getSearchResultsPage = function(page = state.searchResults.page) {
    state.searchResults.page = page

    const start = (page - 1) * state.searchResults.resPerPage
    const end = page * state.searchResults.resPerPage

    return state.searchResults.results.slice(start, end)
}

export {state, loadRecipe, loadSearchResults, getSearchResultsPage}