<script lang="ts">
	import ColorCodeButton from "./ColorCodeButton.svelte";
	import ColorCodeInput from "./ColorCodeInput.svelte";
	import Color from "../../../node_modules/colorjs.io"

	let color = new Color("red");
	$: sRGB = color.to("sRGB").toString();
	console.log(color)
	console.log(sRGB)

	function handleColorChange(inputColor: string) {
		color = new Color(inputColor)
	}


</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div style="
	display: flex;
	flex-direction: column;
	color: white;
">
	<div style={`
	background-color: ${color};
	height: 20px;
	width: 20px;`
	}>

	</div>
	<ColorCodeInput handleEnter={handleColorChange}/>

	<ColorCodeButton header={"HEX"} value={color.to("sRGB").toString()} />
	<ColorCodeButton header={"RGB"} value={color.to("sRGB").toString()} />
	<ColorCodeButton header={"HSL"} value={color.to("HSL").toString()} />
	<ColorCodeButton header={"HWB"} value={color.to("HWB").toString()} />

	<ColorCodeButton header={"LAB"} value={color.to("Lab").toString()} />
	<ColorCodeButton header={"LCH"} value={color.to("LCh").toString()} />

	<ColorCodeButton header={"OKLAB"} value={color.to("OKLab").toString()} />
	<ColorCodeButton header={"OKLCH"} value={color.to("OKLCh").toString()} />
</div>
