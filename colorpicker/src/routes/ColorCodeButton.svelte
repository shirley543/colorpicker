<script lang="ts">
	import { fade } from 'svelte/transition';

	export let header = "";
	export let value = "";
	let isTooltipVisible = false;

	function handleClick() {
		isTooltipVisible = true;
		copyContent();
		setTimeout(() => {
    		isTooltipVisible = false;
  		}, 1000);
	}

	const copyContent = async() => {
		try {
			await navigator.clipboard.writeText(value);
		}
		catch (err) {
			console.error(err);
		}
	}
</script>

<div class="container">
	<h2>{header}</h2>
	<button on:click={() => (handleClick())}>
		{value}
	</button>
	{#if isTooltipVisible}
	<div transition:fade={{ delay: 0, duration: 100 }} class="tooltip">
		Copied
	</div>
	{/if}
</div>


<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
		width: 400px;
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
		box-shadow: 0px 5px 5px var(--color-purple-050);
	}

	.tooltip {
		visibility: visible;
		position: absolute;
		background-color: #34126F;
		color: white;
		box-sizing: border-box;
        font-size: 12px;

        border-radius: 5px;
        padding: 5px 10px;
        position: absolute;
		justify-self: center;
		align-self: center;
		top: 0px;
	}

	.tooltip:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #34126F transparent transparent transparent;
	}
</style>
