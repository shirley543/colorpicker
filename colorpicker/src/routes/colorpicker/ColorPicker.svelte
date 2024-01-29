<script lang="ts">
	import Color from "../../../node_modules/colorjs.io"

	export let handleColorPickerChange: (color: Color) => void;
	let offsetX = 0;
	let offsetY = 0;
	let saturation = 0;
	let hue = 0;
	let value = 0;
	let alpha = 0.5;

	const COLOR_AREA_WIDTH = 500;
	const COLOR_AREA_HEIGHT = 300;

	function handleClickColorArea(event: MouseEvent) {
		offsetX = event.offsetX;
		offsetY = event.offsetY;

		saturation = offsetX / COLOR_AREA_WIDTH * 100;
		value = 100 - (offsetY / COLOR_AREA_HEIGHT * 100);

		const color = new Color("hsv", [hue, saturation, value], alpha);
		handleColorPickerChange(color);
	}
</script>

<div class="container" style="--container-width: {COLOR_AREA_WIDTH}px;">
	<div class="color-area" style="--color-area-width: {COLOR_AREA_WIDTH}px;
	--color-area-height: {COLOR_AREA_HEIGHT}px;" on:click={handleClickColorArea}>
		<div class="color-area-dot" style="--offset-x: {offsetX}px; --offset-y: {offsetY}px"></div>
	</div>
	<div class="hue-slider"></div>
	<div class="alpha-slider"></div>
</div>


<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
		width: var(--container-width);
		height: auto;
	}

	.color-area {
		--picker-color-bg: red;

		position: relative;
		width: var(--color-area-width);
		height: var(--color-area-height);
		/* Saturation: from left (least saturated) to right (most saturated) */
		/* Value: from top (brightest value) to bottom (darkest value) */
		background: linear-gradient(to bottom, rgb(255 255 255 / 0%), rgb(0 0 0 / 100%)), linear-gradient(to right, rgb(255 255 255 / 100%), rgb(0 0 0 / 0%));
		background-color: var(--picker-color-bg);
	}

	.color-area-dot {
		position: absolute;
		top: calc(0% - 5px + var(--offset-y));
		left: calc(0% - 5px + var(--offset-x));
		height: 10px;
		width: 10px;
		border: 1px solid black;
		box-sizing: border-box;
		border-radius: 50%;
	}

	.hue-slider {
		width: 100%;
		height: 40px;
		background: linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0));
	}

	.alpha-slider {
		width: 100%;
		height: 40px;
		background: linear-gradient(to right, rgb(255 0 0 / 0%), rgb(255 0 0 / 100%));
	}
</style>
