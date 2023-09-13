// Liste des noms de couleur CSS disponibles
const cssColors = [
    "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue",
    "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk",
    "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta",
    "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray",
    "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite",
    "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew",
    "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon",
    "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGreen", "LightPink", "LightSalmon",
    "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen",
    "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue",
    "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin",
    "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
    "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple",
    "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver",
    "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise",
    "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
];

// Fonction pour choisir une couleur aléatoire dans la liste
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * cssColors.length);
    return cssColors[randomIndex];
}

// Fonction pour obtenir la couleur complémentaire
function getComplementaryColor(colorName) {
    // Créez un élément HTML pour obtenir la style computed
    const colorElement = document.createElement("div");
    colorElement.style.color = colorName;
    document.body.appendChild(colorElement);
    
    // Obtenez la couleur au format RGB
    const computedColor = getComputedStyle(colorElement).color;
    document.body.removeChild(colorElement);
    
    // Obtenez les composantes RVB
    const rgbColor = computedColor.match(/\d+/g);
    const r = parseInt(rgbColor[0]);
    const g = parseInt(rgbColor[1]);
    const b = parseInt(rgbColor[2]);
    
    // Calculez les composantes inversées pour la couleur complémentaire
    const invertedR = 255 - r;
    const invertedG = 255 - g;
    const invertedB = 255 - b;
    
    // Retournez la couleur complémentaire au format RGB
    return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
}

// Fonction pour ajuster la luminosité de la couleur
function setBrightness(color, brightnessFactor) {
    const rgbColor = hexToRgb(color);
    const adjustedColor = `rgb(${Math.min(255, rgbColor.r * brightnessFactor)}, ${Math.min(255, rgbColor.g * brightnessFactor)}, ${Math.min(255, rgbColor.b * brightnessFactor)})`;
    return rgbToHex(adjustedColor);
}

// Fonction pour convertir le code hexadécimal en RGB
function hexToRgb(hex) {
    hex = hex.slice(1); // Supprimer le caractère #
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Fonction pour convertir RGB en hexadécimal
function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// Appliquer des couleurs aléatoires aux quatre parties
const boxes = document.querySelectorAll(".col");
const texts = document.querySelectorAll(".color-text");

boxes.forEach((box, index) => {
    const randomColor = getRandomColor();
    box.style.backgroundColor = randomColor;
    const complementaryColor = getComplementaryColor(randomColor);
    const adjustedComplementaryColor = setBrightness(complementaryColor, 0.6); // Vous pouvez ajuster la luminosité ici
    texts[index].textContent = randomColor;
    texts[index].style.color = complementaryColor//adjustedComplementaryColor;
});
