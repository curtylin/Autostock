<script context="module">
	export async function load({ params, fetch }) {
		const id = params.id;
		const url = `http://localhost:5000/get-competition/${id}`;
		const res = await fetch(url);
		const competition = await res.json();
		return { props: { competition } };
	}
</script>

<script>
	export let competition;
</script>

<p>{competition.closeDate}</p>
<p>{competition.name}</p>
