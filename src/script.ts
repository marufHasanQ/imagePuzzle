import {getSlicedImages} from "./getSlicedImages.js";
import {createImage, addCustomOrderProperty, shuffleArray} from "./util/util.js";

const imageInputElement: HTMLInputElement = document.querySelector('#inputImage')

imageInputElement?.addEventListener('change', fileHandler);

function fileHandler(e: Event): void {

    if (!(e.target instanceof HTMLInputElement)) {
        return;
    }

    createPreviewImage(e.target.files[0]);
    getSlicedImages(e.target.files[0], 4)
        .then(v => v.map((v, i) => {v.style.padding = '1ch'; return v;}))
        .then(v => addCustomOrderProperty(v))
        .then(v => shuffleArray(v))
        .then(ImageList => ImageList.forEach((v: Node) => {document.body.append(v)}));

}










function createPreviewImage(file: File): HTMLImageElement {
    const PREVIEW_IMAGE_ID = 'preview';
    const PREVIEW_IMAGE_SIZE = '40';


    // remove  preview of previous image if it exist 
    if (document.querySelector(`#${PREVIEW_IMAGE_ID}`)) {
        const previewImage = document.querySelector(`#${PREVIEW_IMAGE_ID}`);
        previewImage.remove();
    }
    const img = createImage(file);
    img.id = PREVIEW_IMAGE_ID;
    img.style.display = 'block';
    img.style.width = img.style.height = PREVIEW_IMAGE_SIZE + 'vmin';
    document.body.append(img);
    return img;

}


function isPng(magicString): boolean {
    return magicString === 'PNG'
}
function logger(value: any) {
    console.log(value);
    return value;
}



/*
        e.target.files[0].arrayBuffer()
            .then(v => new Uint8Array(v))
            .then(v => logger(v))
            .then(v => v.slice(1, 4))
            .then(v => new TextDecoder().decode(v))
            .then(v => isPng(v))
            .then(console.log)
*/
