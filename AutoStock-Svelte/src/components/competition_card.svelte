<script>
	export let competition;
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg">
	<a href={`/competitions/${competition.id}`}>
		<img class="w-full" src={competition.logo} alt={competition.name} />
	</a>
	<div class="px-6 py-4">
		<div class="font-bold text-xl mb-2">{competition.name}</div>
		<p class="text-gray-700 text-base">
			{competition.description}
		</p>
	</div>
	<div class="px-6 pt-4 pb-2">
		<span
			class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
			>Competitors: {competition.competitors}</span
		>
	</div>
</div>
