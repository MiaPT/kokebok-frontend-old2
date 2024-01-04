<script lang="ts">
	import { ingredientStore } from '$lib/data';
	import { onDestroy } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let ingredientsList: Ingredient[];
	export let handleSelection: (e: CustomEvent<AutocompleteOption<string>>) => void;
	export let value: string = "";
	export let key: string;
	
	let searchTerm = value;
	$:{
		console.log(searchTerm)
	}
	let popupkey = "dataPopup-" + key

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: popupkey,
		placement: 'bottom-start'
	};
</script>

<div>
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		autocomplete="off"
		bind:value={searchTerm}
		placeholder="Search ingredient"
		use:popup={popupSettings}
	/>
	<!-- <p>{JSON.stringify(ingredientsList)}</p> -->

	<div data-popup={popupkey}>
		<Autocomplete
			class="border-surface-300-600-token border-2 rounded-container-token bg-surface-700 hover:z-50 absolute"
			bind:input={searchTerm}
			options={ingredientsList.map((i) => ({ label: i.name_no, value: i.id.toString() }))}
			on:selection={handleSelection}
		/>
	</div>
</div>
