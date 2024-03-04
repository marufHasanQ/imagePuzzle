import {drawDisOrganized} from "./drawDisOrganized.js";
import {createImage, drawOrganized, addCustomOrderProperty, assignToGLOBAL_ELEMENT, assignToGLOBAL_NEW_GAME, shuffleArray} from "./util/util.js";


console.log('fffrom script');

let global_image_file;

fetch(`https://picsum.photos/1000`)
    .then(v => v.blob())
    .then(v => {
        global_image_file = v;
        drawPuzzle(v)

    })

document.querySelector('#numberOfSlice')
    .addEventListener('change', e => drawPuzzle(global_image_file));

document.querySelector('#inputImage')
    .addEventListener('change', fileHandler);


function fileHandler(e: Event): void {


    if (!(e.target instanceof HTMLInputElement)) {
        return;
    }

    console.log('file', e.target.files[0])

    global_image_file = e.target.files[0];

    createPreviewImage(e.target.files[0]);
    drawPuzzle(e.target.files[0])

}



function drawPuzzle(blob: Blob, SLICE_NUMBER: number = 3) {

    assignToGLOBAL_NEW_GAME(true);

    document.querySelector('#organized').replaceChildren();
    document.querySelector('#disOrganized').replaceChildren();

    const SLICE_NUMBER_IN_ROOT = Number((document.querySelector('#numberOfSlice') as HTMLInputElement).value);

    drawDisOrganized(blob, SLICE_NUMBER_IN_ROOT, '#disOrganized')
        .then(v => drawOrganized(SLICE_NUMBER_IN_ROOT))

    createPreviewImage(blob);
}


function createPreviewImage(file: Blob): HTMLImageElement {
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

function logger(value: any) {
    console.log(value);
    return value;
}

