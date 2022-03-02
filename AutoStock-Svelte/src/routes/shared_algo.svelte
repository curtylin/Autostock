<script>
	const fetchUserAlgos = async () => {
		const res = await fetch('http://localhost:5000/list-algorithm');
		const data = await res.json();
		return data;
	};
</script>
