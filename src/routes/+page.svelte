<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script>
	import { data } from '$lib/data'
</script>

<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
	{#each data as recipe}
		<!-- <a href="/" class="block card card-hover p-4">
			<header class="card-header">{recipe.title}</header>
			<section class="p-4">{recipe.content}</section>
			<footer class="card-footer">{recipe.createdAt.toLocaleDateString()}</footer>
		</a> -->
		<a class="card bg-initial card-hover overflow-hidden" href="/elements/cards">
			<header></header>
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
					<h6 class="font-bold" data-toc-ignore>By Mia</h6>
					<small>On {recipe.createdAt.toLocaleDateString()}</small>
				</div>
			</footer>
		</a>
	{/each}
</div>

<style lang="postcss">
	
</style>
