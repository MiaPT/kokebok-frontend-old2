export async function load({ fetch }) {
	const res = await fetch(`http://127.0.0.1:8000/api/recipes/recipes`);
	const data = await res.json();
	if (res.ok) {
		return {
			recipes: data
		};
	}
	return res.statusText;
}
