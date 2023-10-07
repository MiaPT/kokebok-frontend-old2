<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang="ts">
	//import { data } from '$lib/data'
	import placeholderImage from '$lib/assets/animemat.jpg';
	import { onMount } from "svelte";
	import type { Recipe } from '$lib/data';


	let recipedata: Recipe[] = [];

	onMount(async () => {
		recipedata = await fetch("http://127.0.0.1:8000/api/recipes/recipes")
		.then(response => response.json())
		.catch(error => {
			console.log(error);
			return [];
		});
	});


</script>

<h1>Recipes</h1>
<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each recipedata as recipe}
		<!-- <a href="/" class="block card card-hover p-4">
			<header class="card-header">{recipe.title}</header>
			<section class="p-4">{recipe.content}</section>
			<footer class="card-footer">{recipe.createdAt.toLocaleDateString()}</footer>
		</a> -->
		<a class="card bg-initial card-hover overflow-hidden" href="/elements/cards">
			<header>
				<img src={placeholderImage} alt="animemat:)"/>
			</header>
			<div class="p-4 space-y-4">
				<h3 class="h3" data-toc-ignore>{recipe.title}</h3>
				<article>
					<p>
						{recipe.content}						
					</p>
				</article>
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold" data-toc-ignore>Tid: ~{recipe.total_time} minutter</h6>
					<small>On {new Date(recipe.created_at).toLocaleDateString()}</small>
				</div>
			</footer>
		</a>
	{/each}
</div>

<style lang="postcss">
	
</style>
