<script context="module">
	export async function load({ params, fetch }) {
		const url = 'http://localhost:5000/list-competitions';
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		return { props: { competitions: data } };
	}
</script>

<script>
	export let competitions;
	import CompetitionCard from '../components/competition_card.svelte';
</script>

<svelte:head>
	<title>Competitions</title>
</svelte:head>

<div class="grid gap-4 md:grid-cols-4 grid-cols-1 py-4">
	{#each competitions as competition}
		<CompetitionCard {competition} />
	{/each}
</div>
