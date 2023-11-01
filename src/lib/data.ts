

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

