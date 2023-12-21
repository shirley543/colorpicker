<script lang="ts">
	export let handleEnter: (color: string) => void;
	let colorInput = ""
	function onKeyDown(event: KeyboardEvent) {
		const isEnterPressed = event.keyCode === 13;
		if (isEnterPressed) {
			handleEnter(colorInput)
		}
	}
</script>

<div class="container">
	<input on:keydown={onKeyDown} bind:value={colorInput}/>
</div>


<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
		width: 300px;
	}

	h2 {
		font-family: 'Montserrat-Bold';
		color: #34126F;
		font-size: 12px;
	}

	button {
		border-radius: 27px;
		height: 54px;
		width: 100%;
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
