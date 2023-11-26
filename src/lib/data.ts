import { writable } from 'svelte/store';

export const ingredientStore = writable<Ingredient[]>([]);