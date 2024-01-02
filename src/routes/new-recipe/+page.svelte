<script lang="ts">
	import { ingredientStore } from '$lib/data';
	import { onDestroy } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';

	let allIngredients: Ingredient[] = [];
	const unsubscribe = ingredientStore.subscribe((data) => {
		allIngredients = data;
	});

	onDestroy(() => {
		unsubscribe();
	});

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom-start'
	};

	const emptyRecipeIngredient: RecipeIngredient = {
		base_ingredient: '',
		name_in_recipe: '',
		is_optional: false,
		group_name: '',
		base_amount: 0,
		unit: '',
		base_ingredient_id: 0
	};

	type KeyedRecipeIngredient = RecipeIngredient & {
		key: string
	}

	const ingredientUnits = [
		'g',
		'kg',
		'oz',
		'lb',
		'l',
		'dl',
		'cl',
		'ml',
		'cup',
		'tbsp',
		'tsp',
		'count',
		'slice',
		'cm',
		'inch',
		''
	];

	// type RecipeIngredient = {
	// name_no: string|null;
	// name_en: string|null;
	// id: number;
	// quantity: number;
	// is_ubiquitus: boolean;
	// }

	// form field values
	let language = 'no';
	let title = '';
	let description = '';
	let searchTerm = '';
	// let ubiquitus = false;

	let ingredients: KeyedRecipeIngredient[] = [];

	function addIngredient(ingredient: RecipeIngredient) {
		const key = Math.random().toString(36).substring(8)
		ingredients = [...ingredients, {...ingredient, key}];
	}

	function handleSelectedIngredient(event: CustomEvent<AutocompleteOption<string>>) {
		const { label: base_ingredient, value: base_ingredient_id } = event.detail;
		addIngredient({
			...emptyRecipeIngredient,
			name_in_recipe: base_ingredient,
			base_ingredient,
			base_ingredient_id: Number(base_ingredient_id)
		});
		console.log(event);
	}

	// $: matchingIngredients = allIngredients.filter((existingIngredient) => {
	// 	return (
	// 		existingIngredient.name_no?.includes(searchTerm) ||
	// 		existingIngredient.name_en?.includes(searchTerm)
	// 	);
	// });

	function removeIngredient(key: string) {
		ingredients = ingredients.filter(i => i.key !== key)
	}

	async function handleSubmit() {
		console.log(ingredients);
		let recipe: Recipe = {} as Recipe;
		recipe.title = title;
		recipe.content = description;

		///

		// let matchingIngredient = matchingIngredients.filter((i) => {
		// 	return language == 'no' ? i.name_no == searchTerm : i.name_en == searchTerm;
		// });

		// let ingredientId: number;

		// if (matchingIngredient.length > 0) {
		// 	ingredientId = matchingIngredient[0].id;
		// } else {
		// 	ingredientId = await createIngredient(searchTerm);
		// }

		// let recipeIngredients = [
		// 	{
		// 		base_ingredient_id: ingredientId,
		// 		name_in_recipe: searchTerm
		// 	}
		// ];

		///
		let newRecipe = {
			title: title,
			content: description,
			ingredients: ingredients
		};

		const formdata = new FormData();
		formdata.append('hero_image', '');
		formdata.append('full_recipe', JSON.stringify(newRecipe));

		const res = await fetch('http://localhost:8000/api/recipes/recipes', {
			method: 'POST',
			body: formdata
		});

		const r = await res.json();
		if (res.ok) {
			alert('Recipe created!');
		} else {
			alert('Something went wrong:(' + r);
		}
	}

	async function createIngredient(name: string) {
		let newIng: NewIngredient = {
			name_en: language == 'en' ? name : null,
			name_no: language == 'no' ? name : null,
			is_ubiquitus: false
		};
		const res = await fetch('http://localhost:8000/api/recipes/ingredients', {
			method: 'POST',
			body: JSON.stringify(newIng)
		});
		const data = await res.json();
		if (res.ok) {
			let ingredient: Ingredient = { ...data };
			ingredientStore.set([...allIngredients, ingredient]);
			return ingredient.id;
		}
		alert('Something went wrong when creating the ingredient: ' + res.statusText);
		return -1;
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="space-y-12">
		<h1 class="font-bold leading-7 text-4xl">Add Recipe🥗</h1>
		<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
			<div class="sm:col-span-full">
				<label>Title</label>
				<input bind:value={title} class="input" />

				<label>Description</label>
				<textarea bind:value={description} rows="5" class="textarea" />
			</div>

			<div class="sm:col-span-full">
				<input
					class="input autocomplete"
					type="search"
					name="autocomplete-search"
					bind:value={searchTerm}
					placeholder="Search ingredient"
					use:popup={popupSettings}
				/>

				<div data-popup="popupAutocomplete">
					<Autocomplete
						class="border-surface-300-600-token border-2 rounded-container-token bg-surface-700 hover:z-50 absolute"
						bind:input={searchTerm}
						options={allIngredients.map((i) => ({ label: i.name_no, value: i.id.toString() }))}
						on:selection={handleSelectedIngredient}
					/>
				</div>
			</div>
			<div class="sm:col-span-full">
				{#each ingredients as ingredient (ingredient.key)}
					<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9 group -z-10">
						<div class="sm:col-span-2 sm:col-start-1">
							<p>Ingredient</p>
							<div class="input-group">
								<input
									disabled
									type="text"
									placeholder="Base ingredient"
									value={ingredient.base_ingredient}
									class="relative"
								/>
							</div>
						</div>

						<div class="sm:col-span-3">
							<p>Name in recipe</p>
							<div class="input-group">
								<input
									type="text"
									placeholder="Name in recipe"
									bind:value={ingredient.name_in_recipe}
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<p>Amount</p>
							<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
								<!-- <div class="input-group-shim">(icon)</div> TODO: sick icon -->
								<input type="text" placeholder="Amount" bind:value={ingredient.base_amount} />
								<select bind:value={ingredient.unit}>
									{#each ingredientUnits as unit}
										<option value={unit}>{unit}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="sm:col-span-1">
							<div>
								<br />
								<label class="flex items-center space-x-2">
									<input type="checkbox" class="checkbox" bind:value={ingredient.is_optional} />
									<p>Optional</p>
								</label>
							</div>
						</div>

						<div class="sm:col-span-1">
							<!-- TODO: remove ingredient on click -->

							<button on:click={removeIngredient(ingredient.key)} class="group-hover:opacity-100 opacity-0 transition-opacity">❌</button>
						</div>
					</div>
				{/each}
			</div>

			<button type="submit" class="button-primary">Submit</button>
		</div>
	</div>
</form>
