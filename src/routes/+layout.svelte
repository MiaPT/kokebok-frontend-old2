<script lang="ts">
	import { ingredientStore } from '$lib/data';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	onMount(async () => {
		try {
			const res = await fetch('http://127.0.0.1:8000/api/recipes/ingredients');
			const data = await res.json();
			let ingredientList: Ingredient[] = [];

			data.forEach((ing: Ingredient) => {
				let ingredient: Ingredient = { ...ing };
				ingredientList.push(ingredient);
			});

			ingredientStore.set(ingredientList);
		} catch (error) {
			console.error('error fetching ingredients:', error);
		}
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">Kokebok</strong></a>
				<a href="/new-recipe" class="px-10"><strong class="text-xl uppercase">New recipe</strong></a
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="page-footer">
			<div class="w-full max-w-7xl mx-auto p-4 py-16 md:py-24 space-y-10">
				<hr class="opacity-20" />
				<section>
					<div
						class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start"
					>
						<p class="!text-sm opacity-80">
							Source for placeholder recipe image:
							https://pngtree.com/freebackground/large-table-is-full-of-bowls-with-different-foods-in-them_3371627.html
						</p>
					</div>
				</section>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
