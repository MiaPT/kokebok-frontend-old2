export type Recipe = {
	title: string;
	content: string;
    createdAt: Date,
	ingredients: Ingredient[];
};

export type Ingredient = {
	name: string;
	baseIngredientID: number;
};

export const data: Recipe[] = [
	{
		title: 'fiskesuppe',
		content: 'putt fisk i supap',
        createdAt: new Date(),
		ingredients: [
			{ name: 'fisk', baseIngredientID: 1 },
			{ name: 'suppe', baseIngredientID: 2 }
		]
	},
	{
		title: 'fiskekake',
		content: 'miks fisk og kake i miksmaster',
        createdAt: new Date("2023-07-07"),
		ingredients: [
			{ name: 'fisk', baseIngredientID: 1 },
			{ name: 'kake', baseIngredientID: 3 }
		]
	}
];

