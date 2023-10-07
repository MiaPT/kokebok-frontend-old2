<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Kokebok</strong>
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
					<div class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start">
						<p class="!text-sm opacity-80">Source for placeholder recipe image: https://pngtree.com/freebackground/large-table-is-full-of-bowls-with-different-foods-in-them_3371627.html</p>
					</div>
				</section>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
