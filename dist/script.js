import { drawDisOrganized } from "./drawDisOrganized.js";
import { createImage, drawOrganized, assignToGLOBAL_ELEMENT, assignToGLOBAL_NEW_GAME } from "./util/util.js";
console.log('fffrom script');
let global_image_file;
fetch(`https://picsum.photos/1000`)
    .then(v => v.blob())
    .then(v => {
    const SLICE_NUMBER_IN_ROOT = Number(document.querySelector('#numberOfSlice').value);
    global_image_file = v;
    drawBackgroundImage(v);
    drawPuzzle(v, SLICE_NUMBER_IN_ROOT);
    createPreviewImage(v);
});
document.querySelector('#numberOfSlice')
    .addEventListener('change', e => drawPuzzle(global_image_file, e.target.valueAsNumber));
document.querySelector('#inputImage')
    .addEventListener('change', fileHandler);
function fileHandler(e) {
    if (!(e.target instanceof HTMLInputElement)) {
        return;
    }
    global_image_file = e.target.files[0];
    drawBackgroundImage(e.target.files[0]);
    const SLICE_NUMBER_IN_ROOT = Number(document.querySelector('#numberOfSlice').value);
    drawPuzzle(e.target.files[0], SLICE_NUMBER_IN_ROOT);
    createPreviewImage(e.target.files[0]);
}
function drawPuzzle(blob, SLICE_NUMBER_IN_ROOT = 3) {
    // remove any previous puzzle
    document.querySelector('#organized').replaceChildren();
    document.querySelector('#disOrganized').replaceChildren();
    // reinitialize that this is a game
    assignToGLOBAL_NEW_GAME(true);
    assignToGLOBAL_ELEMENT(null);
    document.querySelectorAll('.grid')
        .forEach(v => v.style.gridTemplateColumns = `repeat(${SLICE_NUMBER_IN_ROOT}, auto)`);
    drawDisOrganized(blob, SLICE_NUMBER_IN_ROOT, '#disOrganized')
        .then(_ => drawOrganized(SLICE_NUMBER_IN_ROOT));
}
function drawBackgroundImage(image) {
    const url = URL.createObjectURL(image);
    document.documentElement.style.backgroundImage = 'url(' + url + ')';
    document.body.addEventListener('load', e => URL.revokeObjectURL(url));
}
function createPreviewImage(file) {
    const PREVIEW_IMAGE_ID = 'preview';
    const DIALOG_ID = 'imageDialog';
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
    document.querySelector(`#${DIALOG_ID}`).append(img);
    return img;
}
