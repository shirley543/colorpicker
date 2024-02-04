<script lang="ts">
	import { convertHexToRGB } from "../utils/hexHelper"

	export let handleEnter: (color: string) => void;
	let inputString = ""

	function onKeyDown(event: KeyboardEvent) {
		const isEnterPressed = event.keyCode === 13;
		if (isEnterPressed) {
			// TODOs:
			// - Check for hex value
			// - Check for out-of-bounds otherValues depending on the color space
			// - Check for invalid value for alpha

			let hexRegex = /(?<colorspace>^[#]+)(?<hex>[0-9a-f]*)$/;
			let hexRegexMatch = inputString.match(hexRegex)
			let hexColorSpace = hexRegexMatch?.groups?.colorspace;
			let hexValue =  hexRegexMatch?.groups?.hex;

			let otherRegex = /(?<colorspace>^[^\(]+)\((?<otherValues>[0-9%. ]*)\)$/;
			let otherRegexMatch = inputString.match(otherRegex)
			let otherColorSpace = otherRegexMatch?.groups?.colorspace;
			let otherValues = otherRegexMatch?.groups?.otherValues;

			if (hexColorSpace !== undefined && hexValue !== undefined)
			{
				if (hexValue.length !== 8 && hexValue.length !== 6)
				{
					console.log("Error: incorrect length for hex value")
					return;
				}
			} 
			else if (otherColorSpace !== undefined && otherValues !== undefined)
			{
				const acceptedColorSpaces = ["rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch"]
				if (acceptedColorSpaces.find((element) => element === otherColorSpace) === undefined) {
					console.log("Error: invalid color space")
					return;
				}

				let regexInner = /(?<otherValues>[0-9%. ]*[^\/])(?:\/(.*))?$/;
				let matchesInner = otherValues?.match(regexInner)
				let colorChannels = matchesInner?.[1].split(/\s+/);
				let alpha = matchesInner?.[2];

				if (colorChannels?.length !== 3) {
					console.log("Error: invalid number of color channels")
					return;
				}
			}
			else
			{
				console.log("Error: invalid input")
				return;
			}

			handleEnter(inputString)
		}
	}
</script>

<div class="container">
	<input on:keydown={onKeyDown} bind:value={inputString}/>
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

	input {
		height: 54px;
		width: 100%;
		border: 3px solid #653CAD;
		border-radius: 27px;
		box-sizing: border-box;
		box-shadow: var(--color-purple-050) 0px 4px 4px;

		color: #34126F;
		font-family: 'JetBrainsMono';
		padding: 0px 20px;
		transition: box-shadow 50ms ease-in;
	}

	input:focus {
		outline: none;
		box-shadow: #34126F 0px 0px 6px;
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

</style>
