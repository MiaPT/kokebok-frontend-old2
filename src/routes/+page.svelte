<script lang="ts">
	import placeholderImage from '$lib/assets/animemat.jpg';
	import type { Recipe } from '$lib/data';
	export let data: {"recipes": Recipe[]};
	let recipes = data.recipes;

</script>

<h1>Recipes</h1>
<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each recipes as recipe}
		<a class="card bg-initial card-hover overflow-hidden" href="/recipe/{recipe.id}">
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
