<script lang="ts">

	import { ingredientStore } from "$lib/data";
	import { onDestroy } from "svelte";
  import { Autocomplete, popup } from '@skeletonlabs/skeleton';
  import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

    let allIngredients: Ingredient[] = [];
    const unsubscribe = ingredientStore.subscribe((data) => {
        allIngredients = data;
    });
    
    onDestroy(() => {
      unsubscribe();
    })

    
  let popupSettings: PopupSettings = {
    event: 'focus-click',
    target: 'popupAutocomplete',
    placement: 'bottom',
  };

  const emptyRecipeIngredient: RecipeIngredient = 
  {
    base_ingredient: "",
    name_in_recipe: "",
    is_optional: false,
    group_name: "",
    base_amount: 0,
    unit: "",
    base_ingredient_id: 0
  }

  const ingredientUnits = ["g", "kg", "oz", "lb", "l", "dl", "cl", "ml", "cup", "tbsp","tsp", "count", "slice", "cm", "inch", ""]

    // type RecipeIngredient = {
    // name_no: string|null;
	  // name_en: string|null;
    // id: number;
    // quantity: number;
	  // is_ubiquitus: boolean;
    // }


    // form field values
    let language = "no";
    let title = '';
    let description = '';
    let searchTerm = "";
    // let ubiquitus = false;

    let ingredients: RecipeIngredient[] = []

    function addIngredient(ingredient: RecipeIngredient){
      ingredients = [...ingredients, ingredient]
    }

    function handleSelectedIngredient(event: CustomEvent<AutocompleteOption<string>>){
      const {label: base_ingredient, value: base_ingredient_id} = event.detail
      addIngredient({...emptyRecipeIngredient, name_in_recipe: base_ingredient, base_ingredient, base_ingredient_id: Number(base_ingredient_id)})
      console.log(event)
    }




    $: matchingIngredients = allIngredients.filter((existingIngredient) => {
      return existingIngredient.name_no?.includes(searchTerm) || existingIngredient.name_en?.includes(searchTerm)
    })

    
    async function handleSubmit() {
      console.log(ingredients)
      let recipe: Recipe = {} as Recipe;
      recipe.title = title;
      recipe.content = description;
      
      ///

      let matchingIngredient = matchingIngredients.filter((i) => {
          return language == "no" ? i.name_no == searchTerm : i.name_en == searchTerm; 
      })


      let ingredientId: number;

      if (matchingIngredient.length > 0) {
        ingredientId = matchingIngredient[0].id;
      } else {
        ingredientId = await createIngredient(searchTerm)
        }

      let recipeIngredients = [
        {
          base_ingredient_id: ingredientId,
          name_in_recipe: searchTerm,
        }
      ]

      ///
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
      }

      else { 
        alert("Something went wrong:(" + r) 
      }

    };

    async function createIngredient(name: string){
      let newIng: NewIngredient = {
        name_en: language=="en" ? name : null,
        name_no: language=="no" ? name : null,
        is_ubiquitus: false
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
  
<form on:submit|preventDefault={handleSubmit}>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
  

  
    <input
    class="input autocomplete"
    type="search"
    name="autocomplete-search"
    bind:value={searchTerm}
    placeholder="Search..."
    use:popup={popupSettings}
  />
  <div data-popup="popupAutocomplete">
    <Autocomplete
      bind:input={searchTerm}
      options={allIngredients.map(i => ({label: i.name_no, value: i.id.toString()}))}
      on:selection={handleSelectedIngredient}
    />
  </div>

  <div>
    {#each ingredients as ingredient}
    <p>Name in recipe</p>
    <div class="input-group grid-cols-[1fr_auto]">
      <input type="text" placeholder="Name in recipe" bind:value={ingredient.name_in_recipe}  />
    </div>
    <div class="input-group grid-cols-[1fr_auto]">
      <input disabled type="text" placeholder="Base ingredient" value={ingredient.base_ingredient}  />
    </div>
    <p>Amount</p>
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
      <!-- <div class="input-group-shim">(icon)</div> TODO: sick icon --> 
      <input type="text" placeholder="Amount" bind:value={ingredient.base_amount} />
      <select bind:value={ingredient.unit}>
        {#each ingredientUnits as unit}
        <option value={unit}>{unit}</option>
        {/each}
      </select>
    </div>
    <div >
      <label class="flex items-center space-x-2">
        <input type="checkbox" class="checkbox" bind:value={ingredient.is_optional} /> 
        <p>Optional</p>
      </label>
    </div>

    
    <!-- 
    base_ingredient: "",
    name_in_recipe: "",
    is_optional: false,
    group_name: "",
    base_amount: 0,
    unit: "",
    base_ingredient_id: 0
     -->

    {/each}
  </div>


  </div>
  <div class="row">
    <div class="twelve columns">
      <button type="submit" class="button-primary">Submit</button>
    </div>
  </div>
    </div>
  </div>
</div>
</form>
  