
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/', (request, response) => {
    response.send( recipes.map( ({id, title, image, prepTime, difficulty}) => {
        return {id, title, image, prepTime, difficulty}
    } ) )
})

router.get('/recipe/:id', (request, response) => {
    const {id} = request.params
    response.send( recipes.find((obj) => {
        return obj.id.toString() === id
    }) )
})

router.post('/recipe/add', (request, response) => {
    const {title, image, description, ingredients, instructions, prepTime, difficulty} = request.body
    // No duplicate recipe titles allowed (not a requirement for the test but...)
    const found = recipes.find(recipe => recipe.title === title)
    if (found) return response.send( { message: `recipe already exists (try changing the title of your recipe)`, recipe: found} )

    // update the recipes array
    const newRecipe = {id: recipes.length+1, title, image, description, ingredients, instructions, prepTime, difficulty}
    recipes.push(newRecipe)
    response.send({message: 'recipe added', recipe: newRecipe})
})

module.exports = router