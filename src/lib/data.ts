

export type Recipe = {
    id: number,
	title: string;
	content: string;
    created_at: Date,
	ingredients: Ingredient[];
    origin_url: string;
    preamble: string;
    servings: number;
    total_time: number;
};

export type Ingredient = {
	name: string;
	baseIngredientID: number;
};

// export const data: Recipe[] = [
// 	{
// 		title: 'fiskesuppe',
// 		content: 'putt fisk i supap',
//         created_at: new Date(),
// 		ingredients: [
// 			{ name: 'fisk', baseIngredientID: 1 },
// 			{ name: 'suppe', baseIngredientID: 2 }
// 		]
// 	},
// 	{
// 		title: 'fiskekake',
// 		content: 'miks fisk og kake i miksmaster',
//         created_at: new Date("2023-07-07"),
// 		ingredients: [
// 			{ name: 'fisk', baseIngredientID: 1 },
// 			{ name: 'kake', baseIngredientID: 3 }
// 		]
// 	}
// ];

