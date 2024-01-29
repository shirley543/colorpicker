<script lang="ts">
	import Color from "../../../node_modules/colorjs.io"

	export let handleColorPickerChange: (color: Color) => void;
	let offsetX = 0;
	let offsetY = 0;

	let hue = 0;
	let saturation = 0;
	let value = 0;
	let alpha = 0.5;

	let isDragged = false;
	let clientX = 0;
	let clientY = 0;

	const COLOR_AREA_WIDTH = 500;
	const COLOR_AREA_HEIGHT = 300;

	function updateSaturationValue() {
		saturation = offsetX / COLOR_AREA_WIDTH * 100;
		value = 100 - (offsetY / COLOR_AREA_HEIGHT * 100);
		const color = new Color("hsv", [hue, saturation, value], alpha);
		handleColorPickerChange(color);
	}

	function updateClientXY(event: MouseEvent) {
		clientX = event.clientX;
		clientY = event.clientY;
	}

	function handleClickColorArea(event: MouseEvent) {
		offsetX = event.offsetX;
		offsetY = event.offsetY;
		updateSaturationValue();
		updateClientXY(event);
	}

	function handleMouseDown(event: MouseEvent) {
		isDragged = true;
		updateClientXY(event);
	}

	function handleMouseUp(event: MouseEvent) {
		isDragged = false;
		updateClientXY(event);
	}

	function handleMoveColorArea(event: MouseEvent) {
		if (isDragged) {
			offsetX = offsetX + (event.clientX - clientX)
			offsetY = offsetY + (event.clientY - clientY)
			offsetX = Math.min(Math.max(offsetX, 0), COLOR_AREA_WIDTH)
			offsetY = Math.min(Math.max(offsetY, 0), COLOR_AREA_HEIGHT)

			updateSaturationValue();
			updateClientXY(event);
		}
	}
</script>

<div class="container" style="--container-width: {COLOR_AREA_WIDTH}px;">
	<div class="color-area" style="--color-area-width: {COLOR_AREA_WIDTH}px;
	--color-area-height: {COLOR_AREA_HEIGHT}px;" on:click={handleClickColorArea} on:mouseup={handleMouseUp} on:mousedown={handleMouseDown} on:mousemove={handleMoveColorArea} on:mouseleave={handleMouseUp}>
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
		outline: 1px solid white;
		box-sizing: border-box;
		border-radius: 50%;

		pointer-events: none;
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
