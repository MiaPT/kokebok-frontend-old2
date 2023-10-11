<script lang="ts">
	import { onMount } from "svelte";
    export let data;
    console.log(data);

    // onMount(async () => {
    //     let recipe = await fetch(`http://127.0.0.1:8000/api/recipes/${data.id}`)
    // })

</script>