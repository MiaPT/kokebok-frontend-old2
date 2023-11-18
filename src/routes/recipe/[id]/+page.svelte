<script lang="ts">
    export let data: { "recipe": Recipe};
    let recipe = data.recipe;
    console.log(recipe);
</script>

<div>
    <h2 class="h2">{recipe.title}</h2>
    <h4 class="h4">{recipe.preamble}</h4>
    <p>{recipe.content}</p>
</div>
