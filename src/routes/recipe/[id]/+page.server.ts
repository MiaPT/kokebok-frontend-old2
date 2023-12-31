export async function load({ fetch, params }) {
	const res = await fetch(`http://127.0.0.1:8000/api/recipes/recipe/${params.id}`);
	const data = await res.json();
	if (res.ok) {
		return {
			recipe: data
		};
	}
	return res.statusText;
}
