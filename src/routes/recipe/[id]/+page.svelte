<script lang="ts">
	import type { Recipe } from "$lib/data";

    export let data: { "recipe": Recipe};
    let recipe = data.recipe;
    console.log(recipe);
</script>