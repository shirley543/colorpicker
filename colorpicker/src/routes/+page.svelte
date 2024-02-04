<script lang="ts">
	import ColorCodeButton from "./ColorCodeButton.svelte";
	import ColorCodeInput from "./ColorCodeInput.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import Color from "../../node_modules/colorjs.io"
	import './styles.css';

	let color = new Color("pink");
	$: sRGB = color.to("sRGB").toString();

	function handleColorChange(inputColor: string) {
		color = new Color(inputColor)
	}

	function handleColorObjChange(inputColor: Color) {
		color = inputColor;
	}

	function convertRGBToHex(inputColor: Color) {
		const r = inputColor.srgb.r * 255;
		const g = inputColor.srgb.g * 255;
		const b = inputColor.srgb.b * 255;
		const a = inputColor.alpha;

		function convertToHexPair(value: Number) {
			return ('0' + value.toString(16)).slice(-2)
		}

		const hex = '#' + convertToHexPair(r) + convertToHexPair(g) + convertToHexPair(b) + convertToHexPair(a);
		return hex
	}

	function convertHexToRGB(inputHex: string) {
		// #RRGGBBAA
		// Optional AA
		const hex = inputHex.slice(1);
		const rgb = parseInt(hex, 16);
		if (hex.length === 8) {
			const r = ((rgb & 0xFF000000) >> 32) / 255;
			const g = ((rgb & 0x00FF0000) >> 16) / 255;
			const b = ((rgb & 0x0000FF00) >> 8) / 255;
			const a = ((rgb & 0x000000FF) >> 0) / 255;

			const output = new Color({ space: "sRGB", coords: [r, g, b], alpha: a });
			return output;
		} else if (hex.length === 6) {
			const r = ((rgb & 0xFF0000) >> 16) / 255;
			const g = ((rgb & 0x00FF00) >> 8) / 255;
			const b = ((rgb & 0x0000FF) >> 0) / 255;

			const output = new Color("sRGB", [r, g, b]);
			return output;
		}
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div style="
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: auto 1fr;
	grid-gap: 30px;
">
	<!-- Left panel -->
	<div style="
		display: flex;
		flex-direction: column;
		gap: 20px;
	">
		<ColorPicker handleColorPickerChange={handleColorObjChange} />
		<div style={`
			background-color: ${sRGB};
			border-radius: 4px;
			height: 300px;
			width: 100%;`
		}>
		</div>
	</div>
	<div style="
		display: flex;
		flex-direction: column;
		gap: 20px;
	">
		<ColorCodeInput handleEnter={handleColorChange}/>
	
		<ColorCodeButton header={"HEX"} value={convertRGBToHex(color)} />
		<ColorCodeButton header={"RGB"} value={color.to("sRGB").toString()} />
		<ColorCodeButton header={"HSL"} value={color.to("HSL").toString()} />
		<ColorCodeButton header={"HWB"} value={color.to("HWB").toString()} />

		<ColorCodeButton header={"LAB"} value={color.to("Lab").toString()} />
		<ColorCodeButton header={"LCH"} value={color.to("LCh").toString()} />

		<ColorCodeButton header={"OKLAB"} value={color.to("OKLab").toString()} />
		<ColorCodeButton header={"OKLCH"} value={color.to("OKLCh").toString()} />
	</div>


</div>
