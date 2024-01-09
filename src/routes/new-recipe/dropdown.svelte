<script lang="ts">
	import { ingredientStore } from '$lib/data';
	import { onDestroy } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	export let ingredientsList: Ingredient[];
	export let handleSelection: (e: CustomEvent<AutocompleteOption<string>>) => void;
	export let value: string = '';
	export let key: string;

	let searchTerm = value;
	let popupkey = 'dataPopup-' + key;
	
	let optionList = ingredientsList.map((i) => ({ label: i.name_no, value: i.id.toString(), createNew: false })).concat([{ label: `➕ Add: ${searchTerm}`, value: searchTerm, createNew: true}])

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: popupkey,
		placement: 'bottom-start'
	};

	function ingredientFilter(): AutocompleteOption<string>[]{
		const _options = [...optionList]
		console.log("using custom filter")
		const filtered = _options.filter(o => o.label.includes(searchTerm))
		//const addIngredientOption ={ label: `12345`, value: "searchTerm", createNew: true}
		const addIngredientOption ={ label: `➕ Add: ${searchTerm}`, value: searchTerm, createNew: true}
		// return  [addIngredientOption]
		
		
		return searchTerm ? [...filtered, addIngredientOption] : filtered
	}

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
			filter={ingredientFilter}
			options={optionList}
			on:selection={handleSelection}
			/>
	</div>
</div>
