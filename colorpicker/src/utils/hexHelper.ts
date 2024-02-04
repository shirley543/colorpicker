import Color from "../../node_modules/colorjs.io"

function convertRGBToHex(inputColor: Color) {
    const r = inputColor.srgb.r * 255;
    const g = inputColor.srgb.g * 255;
    const b = inputColor.srgb.b * 255;
    const a = inputColor.alpha;

    function convertToHexPair(value: number) {
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

export { convertRGBToHex, convertHexToRGB }