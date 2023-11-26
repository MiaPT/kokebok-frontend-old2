<script lang="ts">

	import { ingredientStore } from "$lib/data";
	import { onDestroy } from "svelte";

    let allIngredients: Ingredient[] = [];
    const unsubscribe = ingredientStore.subscribe((data) => {
        allIngredients = data;
    });
    
    onDestroy(() => {
      unsubscribe();
    })

    type NewIngredient = {
    name_no: string;
	  name_en: string;
	  is_ubiquitus: boolean;
    }


    // form field values
    let language = "no";
    let title = '';
    let description = '';
    let ingredient = "";
    let ubiquitus = false;

    $: matchingIngredients = allIngredients.filter((existingIngredient) => {
      return existingIngredient.name_no?.includes(ingredient) || existingIngredient.name_en?.includes(ingredient)
    })

    
    async function handleSubmit() {
      let recipe: Recipe = {} as Recipe;
      recipe.title = title;
      recipe.content = description;

      let matchingIngredient = matchingIngredients.filter((i) => {
          return language == "no" ? i.name_no == ingredient : i.name_en == ingredient; 
      })

      let ingredientId: number;

      if (matchingIngredient.length > 0) {
        ingredientId = matchingIngredient[0].id;
      } else {
        ingredientId = await createIngredient(ingredient)
        }

      let recipeIngredients = [
        {
          base_ingredient_id: ingredientId,
          name_in_recipe: ingredient,
        }
      ]

      let newRecipe = {
        title: title,
        content: description,
        ingredients: recipeIngredients,
      }

      const formdata = new FormData()
      formdata.append("hero_image", "")
      formdata.append("full_recipe", JSON.stringify(newRecipe))

      const res = await fetch("http://localhost:8000/api/recipes/recipes", {
        method: "POST",
        body: formdata
      })


      const r = await res.json()
      if (res.ok){
        alert("Recipe created!")
        console.log(r)
      }

      else { 
        alert("Something went wrong:(") 
        console.log(r)
      }

    };

    async function createIngredient(name: string){
      let newIng: NewIngredient = {
        name_en: language=="en" ? name : "",
        name_no: language=="no" ? name : "",
        is_ubiquitus: ubiquitus
      }
      const res = await fetch("http://localhost:8000/api/recipes/ingredients", {
        method: "POST",
        body: JSON.stringify(newIng)
      })
      const data = await res.json()
      if (res.ok){
          let ingredient: Ingredient = {...data}
          ingredientStore.set([...allIngredients, ingredient])
          return ingredient.id;
      }
      alert("Something went wrong when creating the ingredient: " + res.statusText)
      return -1
    }
    

  </script>
  
  <div class="container">
    
    <form on:submit|preventDefault={handleSubmit}>
      <div class="row">
        <div>
          <label >Title</label>
          <input bind:value={title} class="u-full-width text-black" />
        </div>
        <div class="six columns">
          <label>Description</label>
          <input  bind:value={description} class="u-full-width text-black" />
        </div>
      </div>
      <div class="row">
        <div class="twelve columns">
          <label>Ingredients</label>
          <input bind:value={ingredient} class="u-full-width text-black" />
          <label for="ubiquitus" class="checkbox-label">
            <input bind:value={ubiquitus} type="checkbox" id="ubiquitus" class="checkbox-input" />
            Ubiquitus
          </label>
        </div>
        <ul>
          {#each matchingIngredients as mi}
            <li>{mi.name_no} / {mi.name_en}</li>
          {/each}
        </ul>
      </div>
      <div class="row">
        <div class="twelve columns">
          <button type="submit" class="button-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
  