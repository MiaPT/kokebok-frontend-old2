<script lang="ts">
    export let data: { "recipe": Recipe};
    import placeholderImage from '$lib/assets/animemat.jpg';
    let recipe = data.recipe;
    console.log(recipe);
</script>

<div class="grid grid-cols-3">
    {#if recipe.hero_image}
        <img src={recipe.hero_image} alt="animemat:)"/>

    {:else}
        <img src={placeholderImage} alt="animemat:)"/>
    {/if}
    <div></div>
    <h1 class="h2">{recipe.title}</h1>
    <div></div>
    <h4 class="h4">{recipe.preamble}</h4>
    <p>{recipe.content}</p>
    {#each recipe.ingredients as ingredient}
        <p>{ingredient.name_no}</p>
    {/each}
    
</div>
