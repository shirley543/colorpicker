<script lang="ts">
	import ColorCodeButton from "./ColorCodeButton.svelte";
	import ColorCodeInput from "./ColorCodeInput.svelte";
	import ColorPicker from "./ColorPicker.svelte";
	import Color from "../../node_modules/colorjs.io"
	import { convertRGBToHex } from "../utils/hexHelper"
	import './styles.css';

	let color = new Color("pink");
	$: sRGB = color.to("sRGB").toString();

	function handleColorChange(inputColor: string) {
		color = new Color(inputColor)
	}

	function handleColorObjChange(inputColor: Color) {
		color = inputColor;
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
