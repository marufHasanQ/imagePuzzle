function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createImage(file: Blob) {

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.addEventListener("load", () => {
        URL.revokeObjectURL(url);
    });
    return img;

}
function addCustomOrderProperty(arrayOfObject: object[]) {
    return arrayOfObject.map((v, i) => {(v as any).customOrderProperty = i; return v;});
}

export {addCustomOrderProperty, createImage, shuffleArray}
