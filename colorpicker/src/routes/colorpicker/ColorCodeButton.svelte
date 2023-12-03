<script lang="ts">
	export let header = "";
	export let value = "";

	const copyContent = async() => {
		try {
			await navigator.clipboard.writeText(value);
		}
		catch (err) {
			console.error(err);
		}
	}
</script>

<div>
	<h2>{header}</h2>
	<button on:click={() => (copyContent())}>
		{value}
	</button>
</div>


<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	h2 {
		font-family: 'Montserrat-Bold';
		color: #34126F;
		font-size: 12px;
	}

	button {
		border-radius: 27px;
		height: 54px;
		width: 300px;
		background-color: #F8F5FC;
		color: #34126F;

		padding: 0;
		border: none;
		transition: box-shadow ease-in-out 300ms;

		font-family: 'JetBrainsMono';
	}

	button:hover {
		box-shadow: 0px 5px 5px #EAE2F8;
	}
</style>
